import { DailyCalendarInfo } from "@/lib/hebrew-calendar";
import { RefreshCw } from "lucide-react";

interface Props {
  info: DailyCalendarInfo;
}

export function DashboardHeader({ info }: Props) {
  return (
    <header className="relative z-10 px-6 pt-8 pb-6 flex flex-col items-center gap-2 text-center">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {info.isRoshChodesh && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            ראש חודש
          </span>
        )}
        {info.festivalName && !info.isRoshChodesh && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300">
            {info.festivalName}
          </span>
        )}
        {info.festivalName && info.isRoshChodesh && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300">
            {info.festivalName}
          </span>
        )}
      </div>

      <h1 className="text-3xl font-light text-white tracking-wide" dir="rtl">
        {info.hebrewDate}
      </h1>
      <p className="text-white/50 text-sm">{info.gregorianDate}</p>

      {info.omerDay && (
        <p className="text-indigo-300 text-xs tracking-widest uppercase mt-1">
          Day {info.omerDay} of the Omer
        </p>
      )}
    </header>
  );
}
