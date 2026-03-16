import { useState } from "react";
import { Person } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PersonFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  person?: Person | null;
  onSave: (data: { name: string; lastName: string; birthday: string; startedWorking: string }) => void;
}

export function PersonForm({ open, onOpenChange, person, onSave }: PersonFormProps) {
  const [name, setName] = useState(person?.name ?? "");
  const [lastName, setLastName] = useState(person?.lastName ?? "");
  const [birthday, setBirthday] = useState(person?.birthday?.slice(0, 10) ?? "");
  const [startedWorking, setStartedWorking] = useState(person?.startedWorking?.slice(0, 10) ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, lastName, birthday, startedWorking });
    onOpenChange(false);
  };

  // Reset form when person changes
  useState(() => {
    setName(person?.name ?? "");
    setLastName(person?.lastName ?? "");
    setBirthday(person?.birthday?.slice(0, 10) ?? "");
    setStartedWorking(person?.startedWorking?.slice(0, 10) ?? "");
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card" dir="rtl">
        <DialogHeader className="" >
          <DialogTitle className="text-primary font-semibold text-right">
            {person ? "עריכת עובד" : "הוספת עובד"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">שם פרטי</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">שם משפחה</Label>
              <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthday">יום הולדת</Label>
              <Input id="birthday" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startedWorking">תאריך תחילת עבודה</Label>
              <Input id="startedWorking" type="date" value={startedWorking} onChange={e => setStartedWorking(e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-start gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ביטול
            </Button>
            <Button type="submit">שמירה</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
