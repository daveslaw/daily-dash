import { HDate, HebrewCalendar, months } from "@hebcal/core";

export type DailyCalendarInfo = {
  gregorianDate: string;
  hebrewDate: string;
  festivalName: string | null;
  isRoshChodesh: boolean;
  omerDay: number | null;
};

function computeOmerDay(hdate: HDate): number | null {
  const year = hdate.getFullYear();
  const nisan15 = new HDate(15, months.NISAN, year);
  const diff = hdate.abs() - nisan15.abs();
  return diff >= 1 && diff <= 49 ? diff : null;
}

function getFestivalName(hdate: HDate): string | null {
  const events = HebrewCalendar.getHolidaysOnDate(hdate, false);
  if (!events || events.length === 0) return null;
  return events[0].render("en");
}

function isRoshChodesh(hdate: HDate): boolean {
  const events = HebrewCalendar.getHolidaysOnDate(hdate, false);
  if (!events) return false;
  return events.some((e) => e.render("en").startsWith("Rosh Chodesh"));
}

export function getDailyCalendarInfo(date: Date): DailyCalendarInfo {
  const hdate = new HDate(date);

  const gregFormatted = date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const festivalName = getFestivalName(hdate);

  return {
    gregorianDate: gregFormatted,
    hebrewDate: hdate.render("en"),
    festivalName,
    isRoshChodesh: isRoshChodesh(hdate),
    omerDay: computeOmerDay(hdate),
  };
}
