import { GlassCard } from "@/components/glass-card";
import { Star } from "lucide-react";

interface Props {
  data: string | null;
  error?: string;
}

export function YahrtzeitCard({ data, error }: Props) {
  return (
    <GlassCard className="p-6 flex flex-col gap-3 h-full" dir="rtl">
      <div className="flex items-center gap-2 text-indigo-300">
        <Star size={16} />
        <span className="text-xs font-medium uppercase tracking-widest" dir="ltr">Yahrtzeits</span>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {error ? (
        <p className="text-white/40 text-sm italic" dir="ltr">Could not load today&apos;s yahrtzeits.</p>
      ) : (
        <p className="text-white/85 text-sm leading-relaxed flex-1 whitespace-pre-line">{data}</p>
      )}
    </GlassCard>
  );
}
