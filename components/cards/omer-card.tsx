import { GlassCard } from "@/components/glass-card";

interface Props {
  data: { dayNumber: number; url: string } | null;
}

function youtubeEmbedUrl(url: string): string {
  // Handle youtu.be/ID and youtube.com/live/ID and youtube.com/watch?v=ID
  const liveMatch = url.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
  if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
}

export function OmerCard({ data }: Props) {
  if (!data) return null;

  return (
    <GlassCard className="p-6 flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-indigo-300">
          Sefirat HaOmer
        </span>
        <span className="text-xs text-white/50 border border-white/10 px-2 py-0.5 rounded-full">
          Day {data.dayNumber}
        </span>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex-1 rounded-xl overflow-hidden bg-black/30 min-h-48">
        <iframe
          src={youtubeEmbedUrl(data.url)}
          title={`Sefirat HaOmer Day ${data.dayNumber}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full min-h-48"
        />
      </div>
    </GlassCard>
  );
}
