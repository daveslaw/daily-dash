import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl";
}

export function GlassCard({ children, className, dir }: GlassCardProps) {
  return (
    <div
      dir={dir}
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {children}
    </div>
  );
}
