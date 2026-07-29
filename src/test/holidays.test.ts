import { describe, it, expect } from "vitest";
import { getHolidaysForYear } from "../lib/holidays";

describe("Holiday eves support", () => {
  it("includes all requested holiday eves for 2026", () => {
    const holidays = getHolidaysForYear(2026);
    const eveNames = [
      "ערב ראש השנה",
      "ערב יום כיפור",
      "ערב סוכות",
      "ערב שמיני עצרת ושמחת תורה",
      "ערב פסח",
      "ערב שביעי של פסח",
      "ערב שבועות",
    ];

    const evesIn2026 = holidays.filter((h) => eveNames.includes(h.name));
    console.log("Holiday Eves found in 2026:", JSON.stringify(evesIn2026, null, 2));

    const names = holidays.map((h) => h.name);
    for (const eve of eveNames) {
      expect(names).toContain(eve);
    }

    const erevPesach = holidays.find((h) => h.name === "ערב פסח");
    expect(erevPesach).toBeDefined();
    // 2026 Erev Pesach is April 1, 2026 (month 3 in 0-indexed JS month)
    expect(erevPesach).toEqual({ name: "ערב פסח", month: 3, day: 1 });
  });
});
