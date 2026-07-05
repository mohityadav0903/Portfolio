import type { Metadata } from "next";
import { PageFrame, FrameSection } from "@/components/PageFrame";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Playground } from "@/components/Playground";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <PageFrame>
      <Nav />
      <main>
        <FrameSection>
          <Hero />
        </FrameSection>
        <FrameSection>
          <Work />
        </FrameSection>
        <FrameSection>
          <About />
        </FrameSection>
        <FrameSection>
          <Experience />
        </FrameSection>
        <FrameSection>
          <Playground />
        </FrameSection>
        <FrameSection className="border-b-0 no-border-dots">
          <Footer />
        </FrameSection>
      </main>
    </PageFrame>
  );
}
