import { useState, useEffect } from "react";
import { Person } from "@/lib/types";
import { getPeople, addPerson, updatePerson, removePerson } from "@/lib/storage";
import { PeopleTable } from "@/components/PeopleTable";
import { PersonForm } from "@/components/PersonForm";
import { ExportView } from "@/components/ExportView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [view, setView] = useState<"manage" | "export">("manage");
  const [exportYear, setExportYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setPeople(getPeople());
  }, []);

  const handleSave = (data: { name: string; lastName: string; birthday: string; startedWorking: string }) => {
    if (editingPerson) {
      updatePerson(editingPerson.id, data);
    } else {
      addPerson(data);
    }
    setPeople(getPeople());
    setEditingPerson(null);
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormOpen(true);
  };

  const handleRemove = (id: string) => {
    removePerson(id);
    setPeople(getPeople());
  };

  const handleOpenAdd = () => {
    setEditingPerson(null);
    setFormOpen(true);
  };

  if (view === "export") {
    return (
      <div className="min-h-screen p-6">
        <ExportView people={people} year={exportYear} onBack={() => setView("manage")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-surface py-4 z-10">
        <h1 className="text-2xl font-bold text-primary">HR Planner</h1>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Year:</label>
            <Input
              type="number"
              className="w-24"
              value={exportYear}
              onChange={e => setExportYear(Number(e.target.value))}
            />
          </div>
          <Button variant="outline" onClick={() => setView("export")}>
            View Calendar
          </Button>
          <Button onClick={handleOpenAdd}>+ Add Person</Button>
        </div>
      </div>

      <PeopleTable people={people} onEdit={handleEdit} onRemove={handleRemove} />

      <PersonForm
        key={editingPerson?.id ?? "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        person={editingPerson}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
