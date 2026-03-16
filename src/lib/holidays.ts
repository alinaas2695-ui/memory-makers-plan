// Israeli/Jewish holidays with approximate Gregorian dates for 2025-2026
// These are fixed approximations; for production, use a Hebrew calendar library

interface Holiday {
  name: string;
  month: number; // 0-indexed
  day: number;
}

// Major Israeli/Jewish holidays mapped to approximate 2025 Gregorian dates
const holidays2025: Holiday[] = [
  { name: "Tu BiShvat", month: 1, day: 13 },
  { name: "Purim", month: 2, day: 14 },
  { name: "Pesach", month: 3, day: 13 },
  { name: "Pesach (End)", month: 3, day: 19 },
  { name: "Yom HaShoah", month: 3, day: 24 },
  { name: "Yom HaZikaron", month: 4, day: 1 },
  { name: "Yom HaAtzmaut", month: 4, day: 2 },
  { name: "Lag BaOmer", month: 4, day: 16 },
  { name: "Yom Yerushalayim", month: 5, day: 2 },
  { name: "Shavuot", month: 5, day: 2 },
  { name: "Tisha B'Av", month: 7, day: 3 },
  { name: "Rosh Hashanah", month: 8, day: 23 },
  { name: "Rosh Hashanah II", month: 8, day: 24 },
  { name: "Yom Kippur", month: 9, day: 2 },
  { name: "Sukkot", month: 9, day: 7 },
  { name: "Simchat Torah", month: 9, day: 14 },
  { name: "Hanukkah", month: 11, day: 15 },
  { name: "Hanukkah (End)", month: 11, day: 22 },
];

const holidays2026: Holiday[] = [
  { name: "Tu BiShvat", month: 1, day: 2 },
  { name: "Purim", month: 2, day: 3 },
  { name: "Pesach", month: 3, day: 2 },
  { name: "Pesach (End)", month: 3, day: 8 },
  { name: "Yom HaShoah", month: 3, day: 13 },
  { name: "Yom HaZikaron", month: 3, day: 20 },
  { name: "Yom HaAtzmaut", month: 3, day: 21 },
  { name: "Lag BaOmer", month: 4, day: 5 },
  { name: "Yom Yerushalayim", month: 4, day: 22 },
  { name: "Shavuot", month: 4, day: 22 },
  { name: "Tisha B'Av", month: 6, day: 23 },
  { name: "Rosh Hashanah", month: 8, day: 12 },
  { name: "Rosh Hashanah II", month: 8, day: 13 },
  { name: "Yom Kippur", month: 8, day: 21 },
  { name: "Sukkot", month: 8, day: 26 },
  { name: "Simchat Torah", month: 9, day: 3 },
  { name: "Hanukkah", month: 11, day: 5 },
  { name: "Hanukkah (End)", month: 11, day: 12 },
];

export function getHolidaysForYear(year: number): Holiday[] {
  if (year === 2025) return holidays2025;
  if (year === 2026) return holidays2026;
  // Fallback to 2025 dates as approximation
  return holidays2025;
}

export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  return getHolidaysForYear(year).filter(h => h.month === month);
}
