import { describe, it, expect } from "vitest";
import { getHolidaysForYear } from "../lib/holidays";

describe("Holiday eves support", () => {
  it("includes all requested holiday eves for a given year", () => {
    const holidays = getHolidaysForYear(2026);
    const names = holidays.map((h) => h.name);

    expect(names).toContain("ערב ראש השנה");
    expect(names).toContain("ערב יום כיפור");
    expect(names).toContain("ערב סוכות");
    expect(names).toContain("ערב שמיני עצרת ושמחת תורה");
    expect(names).toContain("ערב פסח");
    expect(names).toContain("ערב שביעי של פסח");
    expect(names).toContain("ערב שבועות");
  });
});
