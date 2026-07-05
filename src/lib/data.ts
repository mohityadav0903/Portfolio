export const profile = {
  firstName: "Mohit",
  lastName: "Yadav",
  brandName: "Y.Mohit",
  name: "Mohit Yadav",
  role: "Founding Engineer",
  tags: ["Founding Engineer", "AI Products (B2B & SaaS)"],
  location: "Bengaluru, India",
  email: "elitemohityadav@gmail.com",
  calUrl: "https://cal.com/mohityadav0903/15min",
  intro:
    "I build AI products from zero to scale — agentic design tools, multimodal systems, and the realtime platforms that make them work in production. Shipped to 350K+ users, with system design across microservices, streaming pipelines, vector search, and infra built to hold up in prod.",
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

export const works: Work[] = [
  {
    title: "WebACP",
    category: "Open Source · Agent Protocols",
    year: "2025",
    description:
      "A TypeScript SDK bringing the Agent Client Protocol (ACP) and MCP to the web — embed and drive coding agents from any app, with persistent threads, server/local tool routing, and a path toward multi-CLI orchestration.",
    href: "https://github.com/mohityadav0903/webAcp",
    image: "/work/webacp-share.png",
    gradient: "from-[#d1fae5] via-[#a7f3d0] to-[#6ee7b7]",
    glow: "rgba(255,255,255,0.4)",
  },
  {
    title: "Figr AI",
    category: "Agentic Design Platform",
    year: "2024",
    description:
      "Building an AI-native workspace for product teams — a multimodal design agent for ideation, flows, screen variations, and prototyping, grounded in the team's design system and product context. Realtime multiplayer, streaming agent runs, and a full microservices platform behind it.",
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
      "An AI design-system generator inside Figma that turns any UI into full token systems using Claude vision and component vector search — helping teams organize, generate, and apply design systems without leaving their workflow. Shipped to 150K+ users.",
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
      "Shipped from scratch in 7 days as the sole engineer — a design library with AI-powered search and recommendations (FAISS, GPT-4) over thousands of real app patterns. Grew to 200K+ users and became the product that unlocked our first funding.",
    href: "https://flash.figr.design",
    image: "/work/flash-share.png",
    imageFit: "contain",
    gradient: "from-[#dbeafe] via-[#c8e6a0] to-[#b8d890]",
    glow: "rgba(255,255,255,0.5)",
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
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Playground", href: "#playground" },
  { label: "LinkedIn", href: profile.socials.linkedin, external: true },
];
