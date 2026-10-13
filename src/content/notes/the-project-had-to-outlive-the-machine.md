## A cloud agent still needs a machine

Cloud agents are ordinary now. [OpenAI Dots](https://openai.com/index/introducing-dots/) each get a cloud computer and keep working after you leave. [Grok](https://x.ai/grok) and [Grok Bot](https://docs.x.ai/grok-bot/overview) keep a browser, a filesystem, and a terminal on a computer that stays up. A [Cursor cloud agent](https://cursor.com/docs/cloud-agent) runs in an isolated VM with the repo and the dependencies already there. [Claude Code in the cloud](https://code.claude.com/docs/en/claude-code-on-the-web) clones the repository into one and keeps the session after the laptop is closed.

If you are building one, the model is not the hard part. The **machine** is. Claude Code on a laptop already has a folder. A cloud agent needs one too, and it has to still be there in the morning, with the packages still installed.

## The problem is a prototype

A designer asks for a prototype. A pricing page, in a project they already have, that they can open again tomorrow.

A **workspace** is the team. A **project** is one product inside it. The prototype is files in that project.

```text
acme/                          workspace
  website/                     project
    package.json
    app/
      page.tsx                 the pricing page
    components/
      Hero.tsx
    node_modules/              the preview will not run without this
```

```diagram
file-tree
```

The agent has to see that tree the way you see a folder on your laptop. `page.tsx` is the page. `node_modules` is what makes the preview build. If the packages are missing, there is no screen. There is a wait, then an error, then another wait.

## Solution discovery

A sandbox looks like the answer. [E2B](https://docs.e2b.dev/faq/sandbox-lifetime), a [Vercel Sandbox](https://vercel.com/docs/sandbox/concepts/snapshots), a few others do the same thing. Upload the project, let the agent write the page, take the result back.

They asked for a pricing page they could click. A sandbox gives them a **session**. [E2B's default](https://docs.e2b.dev/faq/sandbox-lifetime) is to kill the machine when the timeout ends, and `node_modules` goes with it. You can pause instead, and a paused sandbox can sit there. The running time is still capped. Coming back is a resume, not a folder that was already open.

[Vercel keeps a snapshot](https://vercel.com/docs/sandbox/concepts/snapshots) when a persistent session stops, so the files can come back. The [session itself still ends](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence). Each prototype is its own sandbox. That sandbox has a hard timeout, and it costs money while it is up. Vercel spins it up, watches the timeout, and carries the bill inside the product. The next session still boots from that picture and starts its own clock. The snapshot makes the next boot faster. The machine still stopped.

Copying the tree out between visits keeps the prototype. The tree is huge, mostly packages. They sit there while it moves. Then that copy has to be versioned, or the next visit loads the wrong one. Now there is a second product in front of the page they asked for.

```diagram
session-loop
```

```typescript
async function runTurn(projectId: string, task: string) {
  const snapshot = await loadProject(projectId)
  const sandbox = await createSandbox()
  await sandbox.upload(snapshot)
  await sandbox.run(task)
  await saveProject(projectId, await sandbox.download())
}
```

I almost shipped this. Every turn pays for the pack and the unpack. The person on the other side is designing. They opened the project to see a page, and the machine made them wait.

A snapshot is a tidier system and the same wait. Copying to storage keeps the files and makes the wait longer. Either way the machine is in front of the page.

They ask for the page. They see the page. They leave. They come back and the page is where they left it, packages already installed. They should not have to learn how long a sandbox is allowed to live. The sandbox can go. The project should not notice.

## Warm machines are a bill

I could hide the cold start. Keep a pool of sandboxes already awake, packages already installed, so the first click is instant.

Those machines cost money while nobody is using them. A deploy throws the pool away. The next person gets a cold machine, unless I pay to warm it again after every release. I would be paying so the timeout stays hidden for a few more minutes. They still hit the boot. Just less often.

## A machine that never turns off

The other idea was one VM that stays on. The disk stays. The packages stay where the last install left them. `acme/website/node_modules` is a folder, and tomorrow it is the same folder.

Then workspaces. Two teams, two projects, one disk. `acme/website` and `northwind/docs` can see each other, or I spend the year walling them off on that disk. One VM per workspace brings the bill back.

We deploy continuously. A release replaces the disk those packages were on. The project files can sit on a shared disk, S3 Files. The packages were on the machine I just shipped over, so they are gone.

```diagram
machine-disk
```

The prototype has to stay. The machine does not.

## The cache has to survive a new machine

We deploy continuously, so the machine is new all the time. [Docker](https://docs.docker.com/) and [Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/) are how that machine gets replaced. The pod serving the next prototype can be a minute old. If the packages are not already on it, the person waits for an install every time we ship.

The lockfile already says what `website` needs. Those packages have to be in the image before the pod starts.

pnpm, Bun, and Deno can all keep a global cache and follow a **lockfile**. I tried them on the filesystem this jail actually uses.

The cache is not a folder next to the project. It is mounted into the jail as an **overlay** at `/tmp/.deno`. The project writes into its own upper layer. The shared cache underneath is the same for every machine. A hardlink cannot cross that boundary. It becomes a copy, and that copy is what every install costs.

[pnpm](https://pnpm.io/settings/node-modules#packageimportmethod) keeps one store and hardlinks each package into `node_modules`. On this filesystem the hardlink is a copy. There is a workaround. Force a flat `node_modules` with [`node-linker=hoisted`](https://pnpm.io/npmrc#node-linker) and let the tools walk that. The tools that needed the store's own layout then miss the packages they were resolving. I needed both layouts. A preview resolves through a store. **Private packages** have to be files a build can walk.

[Bun](https://bun.com/docs/pm/cli/install) is fast on a laptop because it hardlinks out of its global cache the same way. On this filesystem that does not hold. It also never gave me both layouts.

I can pay for disk. I cannot put a cold install in front of someone who asked for a page, on a machine I am about to replace.

```diagram
deno-cache
```

[**Deno**](https://docs.deno.com/runtime/packages/) does both layouts from one cache directory, `DENO_DIR`.

A preview leaves the linker on its default. TypeScript, Tailwind, and esbuild resolve through the `.deno` store.

```bash
deno install --quiet
```

The other layout is for **private packages**. `@acme/ui` is one of ours. We share it inside the company and do not publish it to npm. It has to be a real file in `node_modules`. The store keeps the real files behind symlinks, and [that walk does not follow them](https://docs.deno.com/runtime/fundamentals/node/). So this install is hoisted.

```bash
deno install --node-modules-linker=hoisted --quiet
```

```diagram
private-tree
```

We fill `DENO_DIR` from the lockfile while the image is built, before anyone is waiting on that machine. Each project sees that directory through its own overlay. It can add a package to its own view. It cannot wipe the cache for everyone else. One project did that, once, when the upper layer was shared. The upper layer is per project now.

Packages from public npm [wait a day](https://docs.deno.com/runtime/reference/deno_json/) before an install will take them. Private packages install from our own registry as soon as they are published. If a lockfile names a tarball outside those registries, the install stops and nothing is fetched.

A new pod comes up with the cache already warm. The pricing page is still `app/page.tsx`.

## The person using it is not maintaining a machine

Claude Code, Cursor, and Codex on a laptop already feel normal. The folder is there. The toolchain is there. You do not wait for a computer to be created.

A cloud agent has to feel like that when someone is generating a prototype. They come back tomorrow, the project is where they left it, and the packages are already there. The machine under it might be a different one. They should not have to know.
