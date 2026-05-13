import { GlassCard } from "@/components/glass-card";
import { BookOpen, ExternalLink } from "lucide-react";

interface Props {
  data: { hebrewDate: string; gregorianDate: string; url: string } | null;
  error?: string;
}

export function HayomYomCard({ data, error }: Props) {
  return (
    <GlassCard className="p-6 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2 text-indigo-300">
        <BookOpen size={16} />
        <span className="text-xs font-medium uppercase tracking-widest">Hayom Yom</span>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {error || !data ? (
        <p className="text-white/40 text-sm italic">Could not load today&apos;s Hayom Yom.</p>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-center gap-2">
            <p className="text-white/50 text-xs">{data.gregorianDate}</p>
            <p className="text-white font-medium text-lg" dir="rtl">{data.hebrewDate}</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Click below to read today&apos;s Hayom Yom on Chabad.org
            </p>
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded-lg border border-indigo-400/30 bg-indigo-400/10 w-fit mt-auto"
          >
            Open Hayom Yom <ExternalLink size={11} />
          </a>
        </>
      )}
    </GlassCard>
  );
}
