export interface Person {
  id: string;
  name: string;
  lastName: string;
  birthday: string; // ISO date string
  startedWorking: string; // ISO date string
  createdAt: string; // ISO date string
}

export type EventType = 'holiday' | 'birthday' | 'anniversary';

export interface CalendarEvent {
  date: Date;
  day: number;
  month: number;
  title: string;
  subtitle?: string;
  type: EventType;
}
