"use client";

import {
  SiTypescript,
  SiPython,
  SiSvelte,
  SiNextdotjs,
  SiNestjs,
  SiFigma,
  SiRedis,
  SiDocker,
  SiPostgresql,
  SiLangchain,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Dock, DockIcon } from "@/components/ui/dock";

type StackItem = {
  name: string;
  color: string;
  Icon: IconType;
};

const STACK: StackItem[] = [
  { name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
  { name: "Python", color: "#3776AB", Icon: SiPython },
  { name: "SvelteKit", color: "#FF3E00", Icon: SiSvelte },
  { name: "Next.js", color: "#111111", Icon: SiNextdotjs },
  { name: "NestJS", color: "#E0234E", Icon: SiNestjs },
  { name: "Figma Dev", color: "#F24E1E", Icon: SiFigma },
  { name: "PostgreSQL", color: "#4169E1", Icon: SiPostgresql },
  { name: "Redis", color: "#DC382D", Icon: SiRedis },
  { name: "AWS", color: "#FF9900", Icon: FaAws },
  { name: "Docker", color: "#2496ED", Icon: SiDocker },
  { name: "LangGraph", color: "#1C3C3C", Icon: SiLangchain },
];

export function StackLogos() {
  return (
    <div className="mt-8 flex w-full justify-center overflow-x-auto px-2 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Dock iconSize={52} iconMagnification={76} iconDistance={140}>
        {STACK.map((item) => (
          <DockIcon
            key={item.name}
            icon={item.Icon}
            color={item.color}
            label={item.name}
          />
        ))}
      </Dock>
    </div>
  );
}
