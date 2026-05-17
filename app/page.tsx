import { AnimatedBackground } from "@/components/animated-background";
import { DashboardHeader } from "@/components/dashboard-header";
import { ReloadButton } from "@/components/reload-button";
import { HayomYomCard } from "@/components/cards/hayom-yom-card";
import { YahrtzeitCard } from "@/components/cards/yahrtzeits-card";
import { PnineiHalachaCard } from "@/components/cards/pninei-halacha-card";
import { OmerCard } from "@/components/cards/omer-card";
import { getDailyCalendarInfo } from "@/lib/hebrew-calendar";
import { resolveOmerVideo } from "@/lib/omer-video";
import { fetchPnineiHalacha } from "@/lib/pninei-halacha";

export default async function Home() {
  const calendarInfo = getDailyCalendarInfo(new Date());

  const omerVideo = calendarInfo.omerDay
    ? resolveOmerVideo(calendarInfo.omerDay)
    : null;

  const pnineiResult = await fetchPnineiHalacha();

  const hayomYomData = {
    hebrewDate: calendarInfo.hebrewDate,
    gregorianDate: calendarInfo.gregorianDate,
    url: "https://www.chabad.org/dailystudy/hayomyom.asp",
  };

  const pnineiData = "data" in pnineiResult ? pnineiResult.data : null;
  const pnineiError = "error" in pnineiResult ? pnineiResult.error : undefined;

  const showOmer = !!omerVideo;

  return (
    <>
      <AnimatedBackground />
      <ReloadButton />

      <div className="relative z-10 min-h-screen flex flex-col">
        <DashboardHeader info={calendarInfo} />

        <main className="flex-1 px-4 pb-8 max-w-5xl mx-auto w-full">
          {showOmer ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HayomYomCard data={hayomYomData} error={undefined} />
              <YahrtzeitCard />
              <PnineiHalachaCard data={pnineiData} error={pnineiError} />
              <OmerCard data={omerVideo} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HayomYomCard data={hayomYomData} error={undefined} />
                <YahrtzeitCard />
              </div>
              <div className="max-w-xl mx-auto w-full">
                <PnineiHalachaCard data={pnineiData} error={pnineiError} />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
