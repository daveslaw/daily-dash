import { describe, it, expect } from "vitest";
import { resolveOmerVideo } from "./omer-video";

describe("resolveOmerVideo", () => {
  it("returns the correct YouTube URL for day 40", () => {
    const result = resolveOmerVideo(40);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("https://youtube.com/live/YLNmOQR7Ti0?feature=share");
    expect(result!.dayNumber).toBe(40);
  });

  it("returns a result for day 1", () => {
    const result = resolveOmerVideo(1);
    expect(result).not.toBeNull();
    expect(result!.dayNumber).toBe(1);
    expect(result!.url).toBe("https://youtu.be/7uOOLhky2jU");
  });

  it("returns a result for day 49", () => {
    const result = resolveOmerVideo(49);
    expect(result).not.toBeNull();
    expect(result!.dayNumber).toBe(49);
    expect(result!.url).toBe("https://youtube.com/live/lqHeV01Ilo8?feature=share");
  });

  it("returns null for day 0", () => {
    expect(resolveOmerVideo(0)).toBeNull();
  });

  it("returns null for day 50", () => {
    expect(resolveOmerVideo(50)).toBeNull();
  });

  it("all 49 days have non-empty URLs", () => {
    for (let day = 1; day <= 49; day++) {
      const result = resolveOmerVideo(day);
      expect(result, `day ${day} should have a URL`).not.toBeNull();
      expect(result!.url, `day ${day} URL should be non-empty`).toBeTruthy();
    }
  });
});
