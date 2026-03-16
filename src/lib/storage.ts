import { Person } from "./types";

const STORAGE_KEY = "hr-people";

export function getPeople(): Person[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePeople(people: Person[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

export function addPerson(person: Omit<Person, "id" | "createdAt">): Person {
  const people = getPeople();
  const newPerson: Person = {
    ...person,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  people.push(newPerson);
  savePeople(people);
  return newPerson;
}

export function updatePerson(id: string, updates: Partial<Omit<Person, "id" | "createdAt">>): void {
  const people = getPeople();
  const idx = people.findIndex(p => p.id === id);
  if (idx !== -1) {
    people[idx] = { ...people[idx], ...updates };
    savePeople(people);
  }
}

export function removePerson(id: string): void {
  const people = getPeople().filter(p => p.id !== id);
  savePeople(people);
}
