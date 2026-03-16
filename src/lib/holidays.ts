interface Holiday {
  name: string;
  month: number;
  day: number;
}

const holidays2025: Holiday[] = [
  { name: "ט\"ו בשבט", month: 1, day: 13 },
  { name: "פורים", month: 2, day: 14 },
  { name: "פסח", month: 3, day: 13 },
  { name: "פסח (סוף)", month: 3, day: 19 },
  { name: "יום השואה", month: 3, day: 24 },
  { name: "יום הזיכרון", month: 4, day: 1 },
  { name: "יום העצמאות", month: 4, day: 2 },
  { name: "ל\"ג בעומר", month: 4, day: 16 },
  { name: "יום ירושלים", month: 5, day: 2 },
  { name: "שבועות", month: 5, day: 2 },
  { name: "תשעה באב", month: 7, day: 3 },
  { name: "ראש השנה", month: 8, day: 23 },
  { name: "ראש השנה ב׳", month: 8, day: 24 },
  { name: "יום כיפור", month: 9, day: 2 },
  { name: "סוכות", month: 9, day: 7 },
  { name: "שמחת תורה", month: 9, day: 14 },
  { name: "חנוכה", month: 11, day: 15 },
  { name: "חנוכה (סוף)", month: 11, day: 22 },
];

const holidays2026: Holiday[] = [
  { name: "ט\"ו בשבט", month: 1, day: 2 },
  { name: "פורים", month: 2, day: 3 },
  { name: "פסח", month: 3, day: 2 },
  { name: "פסח (סוף)", month: 3, day: 8 },
  { name: "יום השואה", month: 3, day: 13 },
  { name: "יום הזיכרון", month: 3, day: 20 },
  { name: "יום העצמאות", month: 3, day: 21 },
  { name: "ל\"ג בעומר", month: 4, day: 5 },
  { name: "יום ירושלים", month: 4, day: 22 },
  { name: "שבועות", month: 4, day: 22 },
  { name: "תשעה באב", month: 6, day: 23 },
  { name: "ראש השנה", month: 8, day: 12 },
  { name: "ראש השנה ב׳", month: 8, day: 13 },
  { name: "יום כיפור", month: 8, day: 21 },
  { name: "סוכות", month: 8, day: 26 },
  { name: "שמחת תורה", month: 9, day: 3 },
  { name: "חנוכה", month: 11, day: 5 },
  { name: "חנוכה (סוף)", month: 11, day: 12 },
];

export function getHolidaysForYear(year: number): Holiday[] {
  if (year === 2025) return holidays2025;
  if (year === 2026) return holidays2026;
  return holidays2025;
}

export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  return getHolidaysForYear(year).filter(h => h.month === month);
}
