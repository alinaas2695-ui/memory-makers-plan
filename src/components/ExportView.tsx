import { Person } from "@/lib/types";
import { MonthView } from "./MonthView";
import { Button } from "@/components/ui/button";

interface ExportViewProps {
  people: Person[];
  year: number;
  onBack: () => void;
}

export function ExportView({ people, year, onBack }: ExportViewProps) {
  const handlePrint = () => window.print();

  return (
    <div>
      <div className="no-print flex items-center justify-between mb-6 sticky top-0 bg-surface py-4 z-10">
        <Button variant="outline" onClick={onBack}>← Back to List</Button>
        <h1 className="text-2xl font-bold text-primary">Calendar {year}</h1>
        <Button onClick={handlePrint}>Print / Export PDF</Button>
      </div>
      <div className="print-area bg-card p-8 rounded-lg border max-w-[210mm] mx-auto">
        <h1 className="text-3xl font-bold text-primary text-center mb-8 print:mb-6">
          HR Calendar — {year}
        </h1>
        <div className="flex gap-4 justify-center mb-8 no-print">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-holiday rounded" />
            <span className="text-xs text-muted-foreground">Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-birthday rounded" />
            <span className="text-xs text-muted-foreground">Birthday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-anniversary rounded" />
            <span className="text-xs text-muted-foreground">Anniversary</span>
          </div>
        </div>
        {Array.from({ length: 12 }, (_, i) => (
          <MonthView key={i} year={year} month={i} people={people} />
        ))}
      </div>
    </div>
  );
}
