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
        <Button variant="outline" onClick={onBack}>← חזרה לרשימה</Button>
        <h1 className="text-2xl font-bold text-primary">לוח שנה {year}</h1>
        <Button onClick={handlePrint}>הדפסה / ייצוא PDF</Button>
      </div>
      <div className="print-area bg-card p-4 rounded-lg border max-w-[210mm] mx-auto" dir="rtl">
        <h1 className="text-lg font-bold text-primary text-center mb-2 print:mb-1">
          לוח שנה — {year}
        </h1>
        <div className="flex gap-4 justify-center mb-2 no-print">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-holiday rounded" />
            <span className="text-xs text-muted-foreground">חג</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-birthday rounded" />
            <span className="text-xs text-muted-foreground">יום הולדת</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-anniversary rounded" />
            <span className="text-xs text-muted-foreground">יום שנה</span>
          </div>
        </div>
        {Array.from({ length: 12 }, (_, i) => (
          <MonthView key={i} year={year} month={i} people={people} />
        ))}
      </div>
    </div>
  );
}
