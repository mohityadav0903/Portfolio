import type { ReactNode } from "react";

/** Centered editorial column with dotted side rails. */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="frame-outer">
      <div className="frame-inner relative mx-auto bg-surface">
        <span className="frame-rail frame-rail-left" aria-hidden />
        <span className="frame-rail frame-rail-right" aria-hidden />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/** Standard horizontal section divider inside the frame. */
export function FrameSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`frame-section border-dots-b ${className}`}>
      {children}
    </section>
  );
}

/** Inner padding for frame sections. */
export function FramePad({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`frame-pad ${className}`}>
      {children}
    </div>
  );
}
