export type Chapter = {
  id: string;
  title: string;
  body: string;
};

export const noteBodies: Record<string, Chapter[]> = {
  "the-build-was-never-only-the-system": [
    {
      id: "the-two-jobs",
      title: "The two jobs",
      body: "Building the product and owning the problem were treated as separate work. I stopped seeing them that way. The person who can make the system should stay with the problem it is for.",
    },
    {
      id: "what-designers-were-missing",
      title: "What designers were missing",
      body: "They were not short of tools. They were short of a system they could trust while they were still in the work. Search lived in one place. The file lived in another. The agent did not know either.",
    },
    {
      id: "what-the-four-years-became",
      title: "What the four years became",
      body: "A library people could search. A way to turn a screen into a system without leaving Figma. Then a workspace where the agent already knew the product it was designing for. Each one started as a compromise and had to become more capable once people stayed.",
    },
    {
      id: "not-a-generic-harness",
      title: "Not a generic harness",
      body: "A model in a chat box was the easy version. It cannot remember the thread, use a team's own tools, or hold up once people are on it. That was the engineering. The basics still had to be clear. Speed was not a reason to ship the first compromise and leave it there.",
    },
  ],
};

export function chaptersFor(slug: string) {
  return noteBodies[slug] ?? [];
}
