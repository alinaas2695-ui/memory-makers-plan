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
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 hover:bg-primary/5">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Birthday</TableHead>
            <TableHead className="font-semibold">Started Working</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No people added yet. Click "Add Person" to get started.
              </TableCell>
            </TableRow>
          )}
          {people.map((person) => (
            <TableRow key={person.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {person.name} {person.lastName}
              </TableCell>
              <TableCell>{formatDate(person.birthday)}</TableCell>
              <TableCell>{formatDate(person.startedWorking)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(person)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onRemove(person.id)}>
                    Remove
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
