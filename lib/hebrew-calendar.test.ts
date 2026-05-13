import { describe, it, expect } from "vitest";
import { getDailyCalendarInfo } from "./hebrew-calendar";

describe("getDailyCalendarInfo", () => {
  it("returns omer day 41 for 13 May 2026 (26 Iyar 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 4, 13));
    expect(result.omerDay).toBe(41);
  });

  it("returns omer day 1 for 3 Apr 2026 (16 Nisan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 3, 3));
    expect(result.omerDay).toBe(1);
  });

  it("returns omer day 49 for 21 May 2026 (5 Sivan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 4, 21));
    expect(result.omerDay).toBe(49);
  });

  it("returns null omer day before the Omer (2 Apr 2026 = 15 Nisan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 3, 2));
    expect(result.omerDay).toBeNull();
  });

  it("returns null omer day on Shavuot (22 May 2026 = 6 Sivan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 4, 22));
    expect(result.omerDay).toBeNull();
  });

  it("sets isRoshChodesh true on Rosh Chodesh Sivan (17 May 2026 = 1 Sivan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 4, 17));
    expect(result.isRoshChodesh).toBe(true);
  });

  it("sets festivalName to Shavuot on 22 May 2026 (6 Sivan 5786)", () => {
    const result = getDailyCalendarInfo(new Date(2026, 4, 22));
    expect(result.festivalName).toMatch(/Shavuot/i);
  });

  it("returns null festivalName, false isRoshChodesh, and null omerDay on a plain weekday", () => {
    // 10 Cheshvan 5786 = 9 Nov 2025
    const result = getDailyCalendarInfo(new Date(2025, 10, 9));
    expect(result.festivalName).toBeNull();
    expect(result.isRoshChodesh).toBe(false);
    expect(result.omerDay).toBeNull();
  });
});
