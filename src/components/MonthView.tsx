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

const eventBgColorMap: Record<EventType, string> = {
  holiday: "bg-holiday/15",
  birthday: "bg-birthday/15",
  anniversary: "bg-anniversary/15",
};

const eventBorderColorMap: Record<EventType, string> = {
  holiday: "border-r-holiday",
  birthday: "border-r-birthday",
  anniversary: "border-r-anniversary",
};

const eventTextColorMap: Record<EventType, string> = {
  holiday: "text-holiday-foreground",
  birthday: "text-birthday-foreground",
  anniversary: "text-anniversary-foreground",
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
    <div className="mb-2 break-inside-avoid print:mb-1.5" dir="rtl">
      <div className="flex items-start gap-3 print:gap-1.5 flex-wrap">
        <h2 className="text-base font-bold text-primary whitespace-nowrap py-1 min-w-[60px] print:text-[14px] print:min-w-[48px] print:py-0.5">
          {MONTH_NAMES_HE[month]}
        </h2>
        <div className="flex flex-wrap gap-1.5 print:gap-1.5 flex-1">
          {groups.map((group) => (
            <div
              key={group.day}
              className="w-[110px] print:w-[90px] min-h-[80px] print:min-h-[55px] border rounded p-1 print:p-1 flex flex-col justify-start bg-card shadow-sm print:shadow-none"
            >
              <div className="text-[10px] print:text-[8.5px] font-semibold text-muted-foreground px-0.5 pb-1">{group.day}</div>
              <div className="flex-1 flex flex-col justify-start gap-1 print:gap-0.5">
                {group.events.map((event, i) => (
                  <div key={i} className={`text-center rounded-sm px-1 py-0.5 border-r-[3px] print:border-r-2 ${eventBgColorMap[event.type]} ${eventBorderColorMap[event.type]}`}>
                    <div className={`text-[10px] print:text-[8.5px] font-semibold leading-tight ${eventTextColorMap[event.type]}`}>{event.title}</div>
                    <div className={`text-[9px] print:text-[7.5px] opacity-80 leading-tight ${eventTextColorMap[event.type]}`}>
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
