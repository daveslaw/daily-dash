import { AnimatedBackground } from "@/components/animated-background";
import { DashboardHeader } from "@/components/dashboard-header";
import { ReloadButton } from "@/components/reload-button";
import { HayomYomCard } from "@/components/cards/hayom-yom-card";
import { YahrtzeitCard } from "@/components/cards/yahrtzeits-card";
import { PnineiHalachaCard } from "@/components/cards/pninei-halacha-card";
import { OmerCard } from "@/components/cards/omer-card";
import { getDailyCalendarInfo } from "@/lib/hebrew-calendar";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const calendarInfo = getDailyCalendarInfo(new Date());

  const [hayomYom, yahrtzeits, pninei, omer] = await Promise.all([
    fetchJson<{ data?: { hebrewDate: string; gregorianDate: string; url: string }; error?: string }>(`${baseUrl}/api/hayom-yom`),
    fetchJson<{ data?: string; error?: string }>(`${baseUrl}/api/yahrtzeits`),
    fetchJson<{ data?: { title: string; excerpt: string; url: string }; error?: string }>(`${baseUrl}/api/pninei-halacha`),
    fetchJson<{ data?: { dayNumber: number; url: string } | null }>(`${baseUrl}/api/omer`),
  ]);

  const showOmer = !!omer.data;

  return (
    <>
      <AnimatedBackground />
      <ReloadButton />

      <div className="relative z-10 min-h-screen flex flex-col">
        <DashboardHeader info={calendarInfo} />

        <main className="flex-1 px-4 pb-8 max-w-5xl mx-auto w-full">
          {showOmer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HayomYomCard data={hayomYom.data ?? null} error={hayomYom.error} />
              <YahrtzeitCard data={yahrtzeits.data ?? null} error={yahrtzeits.error} />
              <PnineiHalachaCard data={pninei.data ?? null} error={pninei.error} />
              <OmerCard data={omer.data ?? null} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HayomYomCard data={hayomYom.data ?? null} error={hayomYom.error} />
                <YahrtzeitCard data={yahrtzeits.data ?? null} error={yahrtzeits.error} />
              </div>
              <div className="max-w-xl mx-auto w-full">
                <PnineiHalachaCard data={pninei.data ?? null} error={pninei.error} />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
