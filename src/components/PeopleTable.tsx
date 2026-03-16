import { Person } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PeopleTableProps {
  people: Person[];
  onEdit: (person: Person) => void;
  onRemove: (id: string) => void;
}

export function PeopleTable({ people, onEdit, onRemove }: PeopleTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-lg border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5">
            <TableHead className="font-semibold text-right">שם</TableHead>
            <TableHead className="font-semibold text-right hidden sm:table-cell">יום הולדת</TableHead>
            <TableHead className="font-semibold text-right hidden sm:table-cell">תאריך תחילת עבודה</TableHead>
            <TableHead className="font-semibold text-left">פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                לא נוספו עובדים עדיין. לחץ &quot;+ הוסף עובד&quot; כדי להתחיל.
              </TableCell>
            </TableRow>
          )}
          {people.map((person) => (
            <TableRow key={person.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-right">
                {person.name} {person.lastName}
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">{formatDate(person.birthday)}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">{formatDate(person.startedWorking)}</TableCell>
              <TableCell className="text-left">
                <div className="flex justify-start gap-2" dir="ltr">
                  <Button variant="outline" size="sm" onClick={() => onEdit(person)}>
                    עריכה
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onRemove(person.id)}>
                    הסרה
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
