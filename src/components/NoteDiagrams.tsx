import type { HTMLAttributes, ReactNode } from "react";

function Marker({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 8 8" markerWidth="7" markerHeight="7" refX="7" refY="4" orient="auto">
      <path d="M0 0.5 L7 4 L0 7.5 Z" fill="var(--chapter)" />
    </marker>
  );
}

function Flow({ d, marker }: { d: string; marker: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--chapter)"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="diagram-flow"
      markerEnd={`url(#${marker})`}
    />
  );
}

function Card({
  x,
  y,
  w,
  h,
  kicker,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  kicker: string;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="var(--card)" stroke="var(--line)" />
      <text x={x + 16} y={y + 26} fill="var(--ink-tertiary)" fontSize="11">
        {kicker}
      </text>
      <text x={x + 16} y={y + 48} fill="currentColor" fontSize="15">
        {label}
      </text>
    </g>
  );
}

function FileTreeDiagram({ uid }: { uid: string }) {
  const marker = `${uid}-arrow`;
  const rows = [
    { y: 72, label: "package.json", indent: 0 },
    { y: 110, label: "app/", indent: 0 },
    { y: 148, label: "page.tsx", indent: 22 },
    { y: 186, label: "components/", indent: 0 },
    { y: 224, label: "Hero.tsx", indent: 22 },
  ];

  return (
    <svg viewBox="0 0 720 340" role="img" aria-label="Workspace acme, project website, and the files a prototype is written into">
      <Marker id={marker} />
      <Card x={24} y={28} w={230} h={78} kicker="workspace" label="acme" />
      <Card x={24} y={150} w={230} h={78} kicker="project" label="website" />
      <Flow d="M139 106 V150" marker={marker} />
      <Flow d="M254 189 H312" marker={marker} />
      <rect x="312" y="24" width="384" height="292" rx="16" fill="var(--well)" stroke="var(--line)" />
      <text x="332" y="48" fill="var(--ink-tertiary)" fontSize="11">
        website/
      </text>
      <path d="M348 64 V268" fill="none" stroke="var(--line)" strokeWidth="1.25" />
      {rows.map((row) => (
        <g key={row.label}>
          <path d={`M348 ${row.y} H${368 + row.indent}`} fill="none" stroke="var(--line)" strokeWidth="1.25" />
          <text x={376 + row.indent} y={row.y + 4} fill="currentColor" fontSize="14">
            {row.label}
          </text>
        </g>
      ))}
      <rect x="332" y="248" width="344" height="32" rx="8" fill="color-mix(in srgb, var(--chapter) 28%, var(--card))" />
      <path d="M348 264 H368" fill="none" stroke="var(--chapter)" strokeWidth="1.25" />
      <text x="376" y="269" fill="currentColor" fontSize="14">
        node_modules/
      </text>
    </svg>
  );
}

function PrivateTreeDiagram() {
  const rows = [
    { y: 64, label: "/opt/deno-cache", note: "DENO_DIR, in the image" },
    { y: 104, label: "/tmp/.deno", note: "this project's overlay" },
    { y: 144, label: "website/deno.lock", note: "" },
    { y: 184, label: "website/node_modules/", note: "" },
    { y: 264, label: "website/app/page.tsx", note: "the pricing page" },
  ];

  return (
    <svg viewBox="0 0 720 320" role="img" aria-label="The cache, the overlay, and a private package inside node_modules">
      <rect x="24" y="24" width="672" height="272" rx="16" fill="var(--well)" stroke="var(--line)" />
      <path d="M56 48 V292" fill="none" stroke="var(--line)" strokeWidth="1.25" />
      {rows.map((row) => (
        <g key={row.label}>
          <path d={`M56 ${row.y} H84`} fill="none" stroke="var(--line)" strokeWidth="1.25" />
          <text x="96" y={row.y + 4} fill="currentColor" fontSize="14">
            {row.label}
          </text>
          {row.note ? (
            <text x="360" y={row.y + 4} fill="var(--ink-tertiary)" fontSize="12">
              {row.note}
            </text>
          ) : null}
        </g>
      ))}
      <rect x="72" y="208" width="600" height="36" rx="8" fill="color-mix(in srgb, var(--chapter) 28%, var(--card))" />
      <path d="M56 226 H124" fill="none" stroke="var(--chapter)" strokeWidth="1.25" />
      <text x="136" y="231" fill="currentColor" fontSize="14">
        @acme/ui
      </text>
      <text x="360" y="231" fill="currentColor" fontSize="12">
        private, not published to npm
      </text>
    </svg>
  );
}

function SessionLoopDiagram({ uid }: { uid: string }) {
  const marker = `${uid}-arrow`;
  return (
    <svg viewBox="0 0 720 430" role="img" aria-label="A loop of boot, install, and a session that ends, with a copy to persistent storage">
      <Marker id={marker} />
      <Card x={36} y={24} w={210} h={72} kicker="what they asked for" label="a pricing page" />
      <Card x={474} y={24} w={210} h={72} kicker="machine" label="boot a sandbox" />
      <Card x={474} y={156} w={210} h={72} kicker="packages" label="install" />
      <Card x={36} y={156} w={210} h={72} kicker="the clock" label="session ends" />
      <Flow d="M246 60 H474" marker={marker} />
      <Flow d="M579 96 V156" marker={marker} />
      <Flow d="M474 192 H246" marker={marker} />
      <Flow d="M141 156 V96" marker={marker} />
      <path d="M210 308 V388 C210 406 510 406 510 388 V308" fill="var(--card)" stroke="var(--line)" />
      <ellipse cx="360" cy="388" rx="150" ry="16" fill="var(--card)" stroke="var(--line)" />
      <ellipse cx="360" cy="308" rx="150" ry="16" fill="var(--well)" stroke="var(--line)" />
      <text x="292" y="346" fill="var(--ink-tertiary)" fontSize="11">
        persistent storage
      </text>
      <text x="262" y="370" fill="currentColor" fontSize="14">
        copy the project out and back
      </text>
      <Flow d="M141 228 V348 H210" marker={marker} />
      <Flow d="M510 348 H579 V228" marker={marker} />
      <text x="148" y="268" fill="var(--ink-tertiary)" fontSize="11">
        copy out
      </text>
      <text x="500" y="268" fill="var(--ink-tertiary)" fontSize="11">
        copy back
      </text>
    </svg>
  );
}

function MachineDiskDiagram({ uid }: { uid: string }) {
  const marker = `${uid}-arrow`;
  return (
    <svg viewBox="0 0 720 400" role="img" aria-label="A machine a deploy replaces, and a shared disk that keeps the project files">
      <Marker id={marker} />
      <path
        d="M78 70 V28 H24 V340 H78"
        fill="none"
        stroke="var(--chapter)"
        strokeWidth="1.75"
        className="diagram-flow"
        markerEnd={`url(#${marker})`}
      />
      <text x="28" y="20" fill="var(--ink-tertiary)" fontSize="11">
        deploy
      </text>
      <rect x="78" y="28" width="280" height="320" rx="18" fill="var(--well)" stroke="var(--line)" />
      <text x="98" y="54" fill="var(--ink-tertiary)" fontSize="11">
        machine
      </text>
      <rect x="98" y="70" width="108" height="72" rx="8" fill="var(--card)" stroke="var(--line)" />
      <rect x="108" y="80" width="88" height="42" rx="4" fill="var(--surface)" stroke="var(--line)" />
      <circle cx="152" cy="130" r="4" fill="var(--chapter)" />
      <text x="220" y="98" fill="currentColor" fontSize="14">
        workspace acme
      </text>
      <text x="220" y="122" fill="currentColor" fontSize="14">
        project website
      </text>
      <rect x="98" y="162" width="240" height="58" rx="10" fill="color-mix(in srgb, var(--chapter) 28%, var(--card))" />
      <text x="114" y="186" fill="currentColor" fontSize="14">
        node_modules
      </text>
      <text x="114" y="206" fill="var(--ink-secondary)" fontSize="12">
        dies with this machine
      </text>
      <text x="98" y="258" fill="currentColor" fontSize="14">
        app/page.tsx
      </text>
      <text x="98" y="284" fill="currentColor" fontSize="14">
        components/Hero.tsx
      </text>
      <text x="98" y="318" fill="var(--ink-secondary)" fontSize="12">
        on the machine disk
      </text>
      <rect x="408" y="28" width="284" height="320" rx="18" fill="var(--card)" stroke="var(--line)" />
      <ellipse cx="550" cy="78" rx="96" ry="18" fill="var(--well)" stroke="var(--line)" />
      <path d="M454 78 V132 C454 150 646 150 646 132 V78" fill="var(--well)" stroke="var(--line)" />
      <ellipse cx="550" cy="132" rx="96" ry="18" fill="var(--card)" stroke="var(--line)" />
      <text x="428" y="178" fill="var(--ink-tertiary)" fontSize="11">
        shared disk
      </text>
      <text x="428" y="210" fill="currentColor" fontSize="14">
        website/app/page.tsx
      </text>
      <text x="428" y="236" fill="currentColor" fontSize="14">
        website/components/Hero.tsx
      </text>
      <text x="428" y="262" fill="currentColor" fontSize="14">
        website/package.json
      </text>
      <text x="428" y="300" fill="var(--ink-secondary)" fontSize="12">
        the prototype stays here
      </text>
      <Flow d="M358 268 H408" marker={marker} />
    </svg>
  );
}

function CacheDiagram({ uid }: { uid: string }) {
  const marker = `${uid}-arrow`;
  return (
    <svg viewBox="0 0 720 420" role="img" aria-label="A package cache in the image, and a private overlay for each project">
      <Marker id={marker} />
      <path
        d="M600 78 H688 V360 H32 V78 H120"
        fill="none"
        stroke="var(--chapter)"
        strokeWidth="1.75"
        className="diagram-flow"
        markerEnd={`url(#${marker})`}
      />
      <text x="250" y="392" fill="var(--ink-tertiary)" fontSize="12">
        a new machine joins the same cache
      </text>
      <rect x="120" y="28" width="480" height="100" rx="16" fill="var(--card)" stroke="var(--line)" />
      <text x="140" y="54" fill="var(--ink-tertiary)" fontSize="11">
        image
      </text>
      <text x="140" y="78" fill="currentColor" fontSize="16">
        DENO_DIR
      </text>
      <rect x="300" y="58" width="84" height="28" rx="8" fill="var(--well)" stroke="var(--line)" />
      <rect x="394" y="58" width="84" height="28" rx="8" fill="var(--well)" stroke="var(--line)" />
      <rect x="488" y="58" width="84" height="28" rx="8" fill="var(--well)" stroke="var(--line)" />
      <text x="312" y="76" fill="var(--ink-secondary)" fontSize="11">
        react
      </text>
      <text x="406" y="76" fill="var(--ink-secondary)" fontSize="11">
        typescript
      </text>
      <text x="508" y="76" fill="var(--ink-secondary)" fontSize="11">
        tailwind
      </text>
      <text x="140" y="108" fill="var(--ink-secondary)" fontSize="12">
        filled from deno.lock before boot
      </text>
      <rect x="70" y="196" width="250" height="130" rx="14" fill="var(--card)" stroke="var(--line)" />
      <rect x="400" y="196" width="250" height="130" rx="14" fill="var(--card)" stroke="var(--line)" />
      <text x="86" y="224" fill="var(--ink-tertiary)" fontSize="11">
        project website
      </text>
      <text x="416" y="224" fill="var(--ink-tertiary)" fontSize="11">
        project docs
      </text>
      <text x="86" y="252" fill="currentColor" fontSize="14">
        /tmp/.deno
      </text>
      <text x="416" y="252" fill="currentColor" fontSize="14">
        /tmp/.deno
      </text>
      <text x="86" y="278" fill="var(--ink-secondary)" fontSize="12">
        its own overlay
      </text>
      <text x="416" y="278" fill="var(--ink-secondary)" fontSize="12">
        its own overlay
      </text>
      <text x="86" y="304" fill="currentColor" fontSize="13">
        node_modules
      </text>
      <text x="416" y="304" fill="currentColor" fontSize="13">
        node_modules
      </text>
      <Flow d="M250 128 V196" marker={marker} />
      <Flow d="M470 128 V196" marker={marker} />
    </svg>
  );
}

const diagrams: Record<string, { title: string; caption: string; draw: (uid: string) => ReactNode }> = {
  "file-tree": {
    title: "Workspace, project, files",
    caption: "A prototype is files in a project. The packages sit in that same tree.",
    draw: (uid) => <FileTreeDiagram uid={uid} />,
  },
  "session-loop": {
    title: "The sandbox loop",
    caption: "They asked for a page. The system boots, installs, ends, and copies.",
    draw: (uid) => <SessionLoopDiagram uid={uid} />,
  },
  "machine-disk": {
    title: "Machine and shared disk",
    caption: "A deploy replaces the machine. The prototype stays on the shared disk.",
    draw: (uid) => <MachineDiskDiagram uid={uid} />,
  },
  "deno-cache": {
    title: "A cache that outlives the machine",
    caption: "The image carries the packages. Each project writes only its own overlay.",
    draw: (uid) => <CacheDiagram uid={uid} />,
  },
  "private-tree": {
    title: "Where the private package lands",
    caption: "Deno keeps the cache. @acme/ui is a file in the project, and it is not on npm.",
    draw: () => <PrivateTreeDiagram />,
  },
};

const diagramScript = `
(() => {
  if (window.__noteDiagrams) return;
  window.__noteDiagrams = true;
  const clamp = (value) => Math.min(2.5, Math.max(0.6, Math.round(value * 100) / 100));
  const paint = (canvas) => {
    const zoom = Number(canvas.dataset.zoom || 1);
    const x = Number(canvas.dataset.x || 0);
    const y = Number(canvas.dataset.y || 0);
    canvas.style.transform = "translate(" + x + "px, " + y + "px) scale(" + zoom + ")";
    const label = canvas.closest("dialog")?.querySelector("[data-zoom-label]");
    if (label) label.textContent = Math.round(zoom * 100) + "%";
  };
  const reset = (dialog) => {
    const canvas = dialog.querySelector(".diagram-canvas-large");
    if (!canvas) return;
    canvas.dataset.zoom = "1";
    canvas.dataset.x = "0";
    canvas.dataset.y = "0";
    paint(canvas);
  };
  let drag = null;
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-zoom]");
    if (button) {
      const dialog = button.closest("dialog");
      const canvas = dialog?.querySelector(".diagram-canvas-large");
      if (!dialog || !canvas) return;
      if (button.dataset.zoom === "close") {
        dialog.close();
        return;
      }
      let zoom = Number(canvas.dataset.zoom || 1);
      if (button.dataset.zoom === "in") zoom = clamp(zoom + 0.25);
      if (button.dataset.zoom === "out") zoom = clamp(zoom - 0.25);
      if (button.dataset.zoom === "fit") {
        zoom = 1;
        canvas.dataset.x = "0";
        canvas.dataset.y = "0";
      }
      canvas.dataset.zoom = String(zoom);
      paint(canvas);
      return;
    }
    if (event.target instanceof HTMLDialogElement) event.target.close();
  });
  document.addEventListener("close", (event) => {
    if (event.target instanceof HTMLDialogElement) reset(event.target);
  }, true);
  document.addEventListener("pointerdown", (event) => {
    const stage = event.target.closest(".diagram-stage");
    if (!stage || !stage.closest("dialog")?.open) return;
    const canvas = stage.querySelector(".diagram-canvas-large");
    if (!canvas) return;
    drag = {
      canvas,
      x: event.clientX,
      y: event.clientY,
      px: Number(canvas.dataset.x || 0),
      py: Number(canvas.dataset.y || 0),
    };
    stage.setPointerCapture(event.pointerId);
  });
  document.addEventListener("pointermove", (event) => {
    if (!drag) return;
    drag.canvas.dataset.x = String(drag.px + event.clientX - drag.x);
    drag.canvas.dataset.y = String(drag.py + event.clientY - drag.y);
    paint(drag.canvas);
  });
  document.addEventListener("pointerup", () => {
    drag = null;
  });
  document.addEventListener("pointercancel", () => {
    drag = null;
  });
  document.addEventListener("wheel", (event) => {
    const stage = event.target.closest?.(".diagram-stage");
    if (!stage || !stage.closest("dialog")?.open) return;
    const canvas = stage.querySelector(".diagram-canvas-large");
    if (!canvas) return;
    event.preventDefault();
    canvas.dataset.zoom = String(clamp(Number(canvas.dataset.zoom || 1) + (event.deltaY < 0 ? 0.08 : -0.08)));
    paint(canvas);
  }, { passive: false });
})();
`;

export function NoteDiagram({ id }: { id: string }) {
  const diagram = diagrams[id];
  if (!diagram) return null;
  const dialogId = `diagram-${id}`;

  return (
    <figure className="note-diagram">
      <button
        type="button"
        className="note-diagram-open"
        {...({ command: "show-modal", commandfor: dialogId } as HTMLAttributes<HTMLButtonElement>)}
        aria-label={`Open diagram: ${diagram.title}`}
      >
        <span className="diagram-canvas">{diagram.draw(`${id}-card`)}</span>
        <span className="note-diagram-hint">Open</span>
      </button>
      <figcaption>{diagram.caption}</figcaption>
      <dialog id={dialogId} className="note-diagram-modal" aria-label={diagram.title}>
        <div className="note-diagram-toolbar">
          <p>{diagram.title}</p>
          <div className="note-diagram-controls">
            <button type="button" data-zoom="out" aria-label="Zoom out">
              −
            </button>
            <span data-zoom-label>100%</span>
            <button type="button" data-zoom="in" aria-label="Zoom in">
              +
            </button>
            <button type="button" data-zoom="fit">
              Fit
            </button>
            <button type="button" data-zoom="close">
              Close
            </button>
          </div>
        </div>
        <div className="diagram-stage">
          <div className="diagram-canvas diagram-canvas-large">{diagram.draw(`${id}-modal`)}</div>
        </div>
      </dialog>
      <script dangerouslySetInnerHTML={{ __html: diagramScript }} />
    </figure>
  );
}
