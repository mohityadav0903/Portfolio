"use client";

import React, { useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  disableMagnification?: boolean;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 52;
const DEFAULT_MAGNIFICATION = 76;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto flex h-[84px] w-max max-w-full items-end justify-center gap-2.5 rounded-2xl border border-border/50 bg-surface px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = false,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement<DockIconProps>(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(
          dockVariants({ className }),
          direction === "top" && "items-start",
          direction === "middle" && "items-center",
          direction === "bottom" && "items-end"
        )}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  icon: IconType;
  color: string;
  label?: string;
  size?: number;
  magnification?: number;
  disableMagnification?: boolean;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
}

const DockIcon = ({
  icon: Icon,
  color,
  label,
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);
  const iconPx = Math.round(size * 0.56);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const targetScale = disableMagnification ? 1 : magnification / size;

  const scaleTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, targetScale, 1]
  );

  const scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });

  return (
    <motion.div
      ref={ref}
      title={label}
      style={{ width: size, height: size, scale, originY: 1 }}
      className={cn(
        "flex shrink-0 cursor-default items-center justify-center rounded-full bg-surface shadow-[0_2px_14px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06]",
        className
      )}
    >
      <Icon size={iconPx} color={color} aria-hidden />
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
