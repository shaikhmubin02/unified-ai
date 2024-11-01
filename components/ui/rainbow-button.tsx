import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-10 animate-rainbow cursor-pointer items-center justify-center rounded-full border-0 bg-[length:200%] px-6 py-2 text-sm font-medium text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50",

        // before styles (glow effect)
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#059669,#10b981,#34d399,#6ee7b7,#34d399)] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // background gradient
        "bg-[linear-gradient(#0e1011,#0e1011),linear-gradient(#0e1011_50%,rgba(14,16,17,0.6)_80%,rgba(14,16,17,0)),linear-gradient(90deg,#059669,#10b981,#34d399,#6ee7b7,#34d399)]",

        // hover state
        "hover:scale-105 transition-transform duration-200",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
