"use client";

import Script from "next/script";
import { GlassCard } from "@/components/glass-card";
import { Star } from "lucide-react";

export function YahrtzeitCard() {
  return (
    <GlassCard className="p-6 flex flex-col gap-3 h-full overflow-hidden">
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
      <div className="flex items-center gap-2 text-indigo-300">
        <Star size={16} />
        <span className="text-xs font-medium uppercase tracking-widest">Yahrtzeits</span>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="flex-1 overflow-auto rounded-lg">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-tweet-limit="3"
          data-chrome="noheader nofooter noborders transparent"
          href="https://twitter.com/Yahrtzeits"
        >
          Loading yahrtzeits…
        </a>
      </div>
    </GlassCard>
  );
}
