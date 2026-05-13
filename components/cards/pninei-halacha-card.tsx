import { GlassCard } from "@/components/glass-card";
import { ExternalLink, ScrollText } from "lucide-react";

interface Props {
  data: { title: string; excerpt: string; url: string } | null;
  error?: string;
}

export function PnineiHalachaCard({ data, error }: Props) {
  return (
    <GlassCard className="p-6 flex flex-col gap-3 h-full" dir="rtl">
      <div className="flex items-center gap-2 text-indigo-300">
        <ScrollText size={16} />
        <span className="text-xs font-medium uppercase tracking-widest" dir="ltr">פניני הלכה</span>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {error || !data ? (
        <p className="text-white/40 text-sm italic" dir="ltr">Could not load today&apos;s Pninei Halacha.</p>
      ) : (
        <>
          <h3 className="text-white font-medium text-sm">{data.title}</h3>
          <p className="text-white/75 text-sm leading-relaxed flex-1">{data.excerpt}</p>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-auto px-3 py-1.5 rounded-lg border border-indigo-400/30 bg-indigo-400/10 w-fit"
          >
            קרא עוד <ExternalLink size={11} />
          </a>
        </>
      )}
    </GlassCard>
  );
}
