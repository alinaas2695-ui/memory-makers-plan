import { Person, CalendarEvent } from "@/lib/types";
import { getHolidaysForMonth } from "@/lib/holidays";

interface MonthViewProps {
  year: number;
  month: number;
  people: Person[];
}

const MONTH_NAMES_HE = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר",
];

function getEventsForMonth(year: number, month: number, people: Person[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  const holidays = getHolidaysForMonth(year, month);
  for (const h of holidays) {
    events.push({
      date: new Date(year, h.month, h.day),
      day: h.day,
      month: h.month,
      title: h.name,
      type: "holiday",
    });
  }

  for (const person of people) {
    const bd = new Date(person.birthday);
    if (bd.getMonth() === month) {
      const age = year - bd.getFullYear();
      events.push({
        date: new Date(year, month, bd.getDate()),
        day: bd.getDate(),
        month,
        title: `${person.name} ${person.lastName}`,
        subtitle: `יום הולדת (${age})`,
        type: "birthday",
      });
    }

    const sw = new Date(person.startedWorking);
    if (sw.getMonth() === month && sw.getFullYear() !== year) {
      const years = year - sw.getFullYear();
      events.push({
        date: new Date(year, month, sw.getDate()),
        day: sw.getDate(),
        month,
        title: `${person.name} ${person.lastName}`,
        subtitle: `${years} שנ${years > 1 ? "ים" : "ה"} עבודה`,
        type: "anniversary",
      });
    }
  }

  events.sort((a, b) => a.day - b.day);
  return events;
}

const borderColorMap = {
  holiday: "border-t-holiday",
  birthday: "border-t-birthday",
  anniversary: "border-t-anniversary",
};

const bgColorMap = {
  holiday: "bg-holiday/10",
  birthday: "bg-birthday/10",
  anniversary: "bg-anniversary/10",
};

const typeLabels: Record<string, string> = {
  holiday: "חג",
  birthday: "יום הולדת",
  anniversary: "יום שנה",
};

export function MonthView({ year, month, people }: MonthViewProps) {
  const events = getEventsForMonth(year, month, people);

  if (events.length === 0) return null;

  return (
    <div className="mb-2 break-inside-avoid" dir="rtl">
      <div className="flex items-start gap-3 flex-wrap">
        <h2 className="text-base font-bold text-primary whitespace-nowrap py-1 min-w-[70px]">
          {MONTH_NAMES_HE[month]}
        </h2>
        <div className="flex flex-wrap gap-1.5 flex-1">
          {events.map((event, i) => (
            <div
              key={`${event.type}-${event.day}-${i}`}
              className={`w-[100px] h-[90px] border rounded-md p-1.5 flex flex-col justify-between border-t-4 ${borderColorMap[event.type]} ${bgColorMap[event.type]}`}
            >
              <div className="text-[10px] font-semibold text-muted-foreground">{event.day}</div>
              <div className="text-[10px] font-semibold text-center leading-tight">{event.title}</div>
              <div className="text-[9px] text-muted-foreground text-center">
                {event.subtitle ?? typeLabels[event.type]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
