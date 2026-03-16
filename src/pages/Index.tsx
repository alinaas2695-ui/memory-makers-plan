import { useState, useEffect } from "react";
import { Person } from "@/lib/types";
import { getPeople, addPerson, updatePerson, removePerson, savePeople } from "@/lib/storage";
import { PeopleTable } from "@/components/PeopleTable";
import { PersonForm } from "@/components/PersonForm";
import { ExportView } from "@/components/ExportView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import animedLogo from "@/assets/animed-white.png";
import { FloatingPaws } from "@/components/FloatingPaws";

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

  const handleExportData = () => {
    const dataStr = JSON.stringify(people, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `hr_calendar_people_${new Date().getFullYear()}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPeople = JSON.parse(e.target?.result as string) as Person[];
          if (Array.isArray(importedPeople)) {
            // Merge or replace: Let's simply replace for this requirement, or add missing.
            // To ensure we don't lose data, let's merge by ID.
            const existingIds = new Set(people.map(p => p.id));
            const newPeople = [...people];
            for (const p of importedPeople) {
              if (!existingIds.has(p.id)) {
                newPeople.push(p);
                existingIds.add(p.id);
              } else {
                // Update existing
                const idx = newPeople.findIndex(existing => existing.id === p.id);
                if (idx !== -1) newPeople[idx] = p;
              }
            }
            savePeople(newPeople);
            setPeople(getPeople());
          }
        } catch (error) {
          console.error("Error parsing JSON", error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (view === "export") {
    return (
      <div className="min-h-screen p-6" dir="rtl">
        <FloatingPaws />
        <ExportView people={people} year={exportYear} onBack={() => setView("manage")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto" dir="rtl">
      <FloatingPaws />
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-white border rounded-lg px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-primary">לוח שנה צוות אנימד</h1>
          <img src={animedLogo} alt="Animed Logo" className="h-10 object-contain bg-white" />
        </div>
        <div className="flex gap-3 items-center flex-wrap justify-end">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground whitespace-nowrap">שנה:</label>
            <Input
              type="number"
              className="w-24 text-left font-mono"
              value={exportYear}
              onChange={e => setExportYear(Number(e.target.value))}
              dir="ltr"
            />
          </div>
          <Button className="bg-sky-100" variant="outline" onClick={() => setView("export")}>
            צפה בלוח השנה
          </Button>
          <Button variant="secondary" onClick={handleExportData}>
            ייצוא רשימה
          </Button>
          <div className="relative">
            <Input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="ייבוא רשימה"
            />
            <Button variant="secondary" className="pointer-events-none">
              ייבוא רשימה
            </Button>
          </div>
          <Button onClick={handleOpenAdd}>+ הוסף עובד</Button>
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
