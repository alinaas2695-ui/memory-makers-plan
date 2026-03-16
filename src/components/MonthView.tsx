import { Person, CalendarEvent } from "@/lib/types";
import { getHolidaysForMonth } from "@/lib/holidays";

interface MonthViewProps {
  year: number;
  month: number;
  people: Person[];
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getEventsForMonth(year: number, month: number, people: Person[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // Add holidays
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

  // Add birthdays
  for (const person of people) {
    const bd = new Date(person.birthday);
    if (bd.getMonth() === month) {
      const age = year - bd.getFullYear();
      events.push({
        date: new Date(year, month, bd.getDate()),
        day: bd.getDate(),
        month,
        title: `${person.name} ${person.lastName}`,
        subtitle: `Birthday (${age})`,
        type: "birthday",
      });
    }

    // Work anniversaries
    const sw = new Date(person.startedWorking);
    if (sw.getMonth() === month && sw.getFullYear() !== year) {
      const years = year - sw.getFullYear();
      events.push({
        date: new Date(year, month, sw.getDate()),
        day: sw.getDate(),
        month,
        title: `${person.name} ${person.lastName}`,
        subtitle: `${years} year${years > 1 ? "s" : ""} anniversary`,
        type: "anniversary",
      });
    }
  }

  // Sort by day
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

export function MonthView({ year, month, people }: MonthViewProps) {
  const events = getEventsForMonth(year, month, people);

  if (events.length === 0) return null;

  return (
    <div className="mb-8 break-inside-avoid">
      <h2 className="text-xl font-semibold text-primary text-center mb-4">
        {MONTH_NAMES[month]}
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {events.map((event, i) => (
          <div
            key={`${event.type}-${event.day}-${i}`}
            className={`w-[110px] h-[110px] border rounded-md p-2 flex flex-col justify-between border-t-4 ${borderColorMap[event.type]} ${bgColorMap[event.type]}`}
          >
            <div className="text-xs font-semibold text-muted-foreground">{event.day}</div>
            <div className="text-xs font-semibold text-center leading-tight">{event.title}</div>
            <div className="text-[10px] text-muted-foreground text-center">
              {event.subtitle ?? event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
