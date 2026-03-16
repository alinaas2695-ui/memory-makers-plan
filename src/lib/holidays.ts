import { HebrewCalendar, flags } from "@hebcal/core";

export interface Holiday {
  name: string;
  month: number; // 0-indexed JS month
  day: number;
}

// Fixed international holidays (same date every year)
const FIXED_HOLIDAYS: Holiday[] = [
  { name: "שנה חדשה", month: 0, day: 1 },        // Jan 1
  { name: "יום האהבה", month: 1, day: 14 },       // Feb 14
  { name: "יום האישה הבינלאומי", month: 2, day: 8 }, // Mar 8
  { name: "ליל כל הקדושים", month: 9, day: 31 },  // Oct 31
];

// Father's Day = 3rd Sunday of June
function getFathersDayDate(year: number): Holiday {
  let sundays = 0;
  for (let day = 1; day <= 30; day++) {
    if (new Date(year, 5, day).getDay() === 0) {
      sundays++;
      if (sundays === 3) return { name: "יום האב", month: 5, day };
    }
  }
  return { name: "יום האב", month: 5, day: 15 };
}

// Key Jewish holidays to include (flag bitmask values)
const JEWISH_HOLIDAY_FLAGS =
  flags.CHAG |
  flags.ROSH_CHODESH |
  flags.MINOR_FAST |
  flags.SPECIAL_SHABBAT |
  flags.MODERN_HOLIDAY |
  flags.YOM_TOV_ENDS |
  flags.LIGHT_CANDLES_TZEIS;

// Hebrew names map for common holidays (fallback to render('he'))
const HEBREW_NAME_OVERRIDES: Record<string, string> = {
  "Rosh Hashana": "ראש השנה",
  "Rosh Hashana II": "ראש השנה ב׳",
  "Yom Kippur": "יום כיפור",
  "Sukkot I": "סוכות",
  "Shmini Atzeret": "שמחת תורה",
  "Simchat Torah": "שמחת תורה",
  "Chanukah: 1 Candle": "חנוכה",
  "Chanukah: 8 Candles": "חנוכה (סוף)",
  "Purim": "פורים",
  "Pesach I": "פסח",
  "Pesach VII": "פסח (סוף)",
  "Shavuot": "שבועות",
  "Tish'a B'Av": "תשעה באב",
  "Tu BiShvat": 'ט"ו בשבט',
  "Lag BaOmer": 'ל"ג בעומר',
  "Yom HaShoah": "יום השואה",
  "Yom HaZikaron": "יום הזיכרון",
  "Yom HaAtzma'ut": "יום העצמאות",
  "Yom Yerushalayim": "יום ירושלים",
};

function getJewishHolidays(year: number): Holiday[] {
  const events = HebrewCalendar.calendar({
    year,
    isHebrewYear: false,
    il: true,        // Israel mode (different holiday lengths)
    mask: JEWISH_HOLIDAY_FLAGS,
  });

  const seen = new Set<string>();
  const result: Holiday[] = [];

  for (const ev of events) {
    const desc = ev.getDesc();
    // Filter to only well-known holidays we have names for
    const hebrewName = HEBREW_NAME_OVERRIDES[desc];
    if (!hebrewName) continue;

    // Deduplicate (e.g. Simchat Torah + Shmini Atzeret same day)
    if (seen.has(hebrewName)) continue;
    seen.add(hebrewName);

    const gregDate = ev.getDate().greg();
    result.push({
      name: hebrewName,
      month: gregDate.getMonth(),   // 0-indexed
      day: gregDate.getDate(),
    });
  }

  return result;
}

// Main cache so we don't recompute on every render
const cache: Record<number, Holiday[]> = {};

export function getHolidaysForYear(year: number): Holiday[] {
  if (cache[year]) return cache[year];

  const holidays: Holiday[] = [
    ...FIXED_HOLIDAYS,
    getFathersDayDate(year),
    ...getJewishHolidays(year),
  ];

  // Sort by month then day
  holidays.sort((a, b) => a.month - b.month || a.day - b.day);

  cache[year] = holidays;
  return holidays;
}

export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  return getHolidaysForYear(year).filter((h) => h.month === month);
}
