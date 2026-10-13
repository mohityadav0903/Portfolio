export const profile = {
  firstName: "Mohit",
  lastName: "Yadav",
  brandName: "Y.Mohit",
  name: "Mohit Yadav",
  role: "Product engineer",
  tags: ["Founding Engineer", "AI Products (B2B & SaaS)"],
  location: "Bengaluru, India",
  email: "elitemohityadav@gmail.com",
  calUrl: "https://cal.com/mohityadav0903/quick-connect",
  intro:
    "Building the product and owning the problem used to be two jobs. They don't have to be.",
  stack: [
    "TypeScript",
    "Python",
    "SvelteKit",
    "Next.js",
    "NestJS",
    "Figma Dev",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "LangGraph",
  ],
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/mohityadav0903",
    linkedin: "https://www.linkedin.com/in/mohit-yadav-28a921209",
  },
};

export const about = `I build AI-native products end to end — from early prototypes to platforms used at scale. My work spans agentic design tools, Figma plugins, vector search, realtime multiplayer, and the microservices stack behind them.

Before that, full-stack and realtime systems across WebRTC, healthcare, and community platforms — including one I founded and grew to thousands of members. I care about shipping fast, clean architecture, and products people actually use.`;

export type Work = {
  title: string;
  category: string;
  year: string;
  description: string;
  href?: string;
  image?: string;
  marketingImage?: string;
  imageFit?: "contain" | "fill";
  video?: string;
  gradient: string;
  glow: string;
};

export const lede =
  "For the last four years I have stayed with both. The problem people actually had, and the system that had to hold once they were using it.";

export const works: Work[] = [
  {
    title: "Figr AI",
    category: "Agentic Design Platform",
    year: "2024",
    description:
      "A design workspace product teams use to go from an idea to a real prototype. The platform reached 350K+ people.",
    href: "https://figr.design",
    image: "/work/figr-ai-share.webp",
    marketingImage: "/work/figr-ai-marketing.png",
    gradient: "from-[#ede9fe] via-[#ddd6fe] to-[#c4b5fd]",
    glow: "rgba(255,255,255,0.45)",
  },
  {
    title: "Figr Identity",
    category: "Design Systems · Figma",
    year: "2024",
    description:
      "Turned any screen into a design system inside Figma. 150K+ people used it without leaving the file.",
    href: "https://www.figma.com/community/plugin/1350743748296105581/figr-identity-generate-design-systems-with-ai",
    video: "/work/identity-full.mp4",
    image: "/work/identity.png",
    gradient: "from-[#ffedd5] via-[#fed7aa] to-[#fdba74]",
    glow: "rgba(255,255,255,0.4)",
  },
  {
    title: "Flash",
    category: "Design Library · Search",
    year: "2023",
    description:
      "A design library designers could actually search. 200K+ people, and the product that unlocked the first funding.",
    href: "https://flash.figr.design",
    image: "/work/flash-share.png",
    imageFit: "contain",
    gradient: "from-[#dbeafe] via-[#c8e6a0] to-[#b8d890]",
    glow: "rgba(255,255,255,0.5)",
  },
  {
    title: "WebACP",
    category: "Open Source · Agent Protocols",
    year: "2025",
    description:
      "A way to run coding agents from the web. Persistent threads and your own tools, not a generic chat harness.",
    href: "https://github.com/mohityadav0903/webAcp",
    image: "/work/webacp-share.png",
    gradient: "from-[#d1fae5] via-[#a7f3d0] to-[#6ee7b7]",
    glow: "rgba(255,255,255,0.4)",
  },
];

export type NoteChip = "Product" | "Craft" | "Systems";

export type Note = {
  slug: string;
  title: string;
  description: string;
  chip: NoteChip;
  date: string;
  dateISO: string;
};

export const notes: Note[] = [
  {
    slug: "the-project-had-to-outlive-the-machine",
    title: "The project had to outlive the machine",
    description:
      "A cloud agent needs a real machine. The person using it should not have to wait for that machine to be born again.",
    chip: "Product",
    date: "2026.10",
    dateISO: "2026-10-01",
  },
];

export type PlaygroundItem = {
  title: string;
  description: string;
  href: string;
};

export const playground: PlaygroundItem[] = [
  {
    title: "WebACP",
    description: "Open-source ACP/MCP SDK for the web",
    href: "https://github.com/mohityadav0903/webAcp",
  },
  {
    title: "GitHub",
    description: "Side experiments, tools, and OSS",
    href: "https://github.com/mohityadav0903",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
};

export const experiences: Experience[] = [
  {
    company: "Figr",
    role: "Founding Engineer",
    period: "2023 — Present",
    summary:
      "Founding engineer owning system design across an 8-service AI platform — agent orchestration, realtime collaboration, and the infra underneath.",
    highlights: [
      "Architected microservices platform (gRPC gateway, HTTP/2 connection pool at 1000+ req/s) for a multimodal design agent used in production.",
      "Built Redis Streams orchestration for AI runs — Python XADD producers, Node XRANGE catch-up → XREAD BLOCK live tail so reconnects and multiplayer never miss partial streams.",
      "Designed agent filesystem sync — EFS/NFS + S3 VirtualMount with git-versioned workspaces; cut post-write visibility from ~60s to ~1s vs S3-only paths.",
      "Streaming pipelines end-to-end: LangGraph agents → Redis Streams → Socket.IO fan-out; GridFS-backed checkpointing for long enterprise threads.",
      "Bidirectional Figma sync, MCP connectors, vector search, and file-analysis engines feeding the agent context layer.",
      "Shipped to 350K+ users; SOC2, GDPR, SSO, multi-region deploys; led eng through fundraising diligence.",
    ],
  },
  {
    company: "Web Wizards",
    role: "Web Developer",
    period: "2022 — 2023",
    summary:
      "Built an enterprise WebRTC meeting platform with sub-200ms latency, plus full-stack work across multiple client products.",
  },
  {
    company: "FertilityNext",
    role: "Software Engineer",
    period: "2022",
    summary:
      "HIPAA-aware appointment platform with a PostgreSQL transactional booking engine for conflict-safe scheduling.",
  },
  {
    company: "Algoders Community",
    role: "Founder",
    period: "2021 — 2024",
    summary:
      "Founded a coding community for beginners; mentored 3K+ students and built the platform with live quizzes and leaderboards.",
  },
];

export const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "Work", href: "/work" },
  { label: "Notes", href: "/notes" },
];
