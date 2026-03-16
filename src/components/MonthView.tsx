import { Person, CalendarEvent, EventType } from "@/lib/types";
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

interface DayGroup {
  day: number;
  events: CalendarEvent[];
  primaryType: EventType;
}

function getEventsForMonth(year: number, month: number, people: Person[]): DayGroup[] {
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

  const grouped = new Map<number, CalendarEvent[]>();
  for (const e of events) {
    if (!grouped.has(e.day)) grouped.set(e.day, []);
    grouped.get(e.day)!.push(e);
  }

  const typePriority: Record<EventType, number> = { holiday: 0, birthday: 1, anniversary: 2 };

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
    .map(([day, evts]) => ({
      day,
      events: evts,
      primaryType: evts.reduce((best, e) =>
        typePriority[e.type] < typePriority[best] ? e.type : best, evts[0].type),
    }));
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
  const groups = getEventsForMonth(year, month, people);

  if (groups.length === 0) return null;

  return (
    <div className="mb-2 break-inside-avoid" dir="rtl">
      <div className="flex items-start gap-3 flex-wrap">
        <h2 className="text-base font-bold text-primary whitespace-nowrap py-1 min-w-[60px]">
          {MONTH_NAMES_HE[month]}
        </h2>
        <div className="flex flex-wrap gap-1.5 flex-1">
          {groups.map((group) => (
            <div
              key={group.day}
              className={`w-[110px] min-h-[80px] border rounded p-1.5 flex flex-col justify-between border-t-[3px] ${borderColorMap[group.primaryType]} ${bgColorMap[group.primaryType]}`}
            >
              <div className="text-[10px] font-semibold text-muted-foreground">{group.day}</div>
              <div className="flex-1 flex flex-col justify-center gap-0.5">
                {group.events.map((event, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] font-semibold leading-tight">{event.title}</div>
                    <div className="text-[9px] text-muted-foreground leading-tight">
                      {event.subtitle ?? typeLabels[event.type]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
