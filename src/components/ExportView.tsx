import { Person } from "@/lib/types";
import { MonthView } from "./MonthView";
import { Button } from "@/components/ui/button";
import animedLogo from "@/assets/animed-white.png";

interface ExportViewProps {
  people: Person[];
  year: number;
  onBack: () => void;
}

export function ExportView({ people, year, onBack }: ExportViewProps) {
  const handlePrint = () => window.print();

  return (
    <div dir="rtl">
      <div className="no-print flex items-center justify-between mb-6 sticky top-0 bg-surface py-4 z-10 w-full max-w-5xl mx-auto">
        <Button variant="outline" onClick={onBack}>← חזרה לרשימה</Button>
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg border">
          <h1 className="text-2xl font-bold text-primary">לוח שנה צוות אנימד - {year}</h1>
          <img src={animedLogo} alt="Animed Logo" className="h-10 object-contain bg-white" />
        </div>
        <Button onClick={handlePrint}>הדפסה / ייצוא PDF</Button>
      </div>
      <div className="print-area bg-card p-4 print:p-0 rounded-lg border max-w-[210mm] mx-auto relative overflow-hidden">
        <div className="hidden print:flex w-full items-center justify-center gap-3 mb-4">
          <img src={animedLogo} alt="Animed Logo" className="h-12 object-contain bg-white" />
          <h1 className="text-xl font-bold text-primary">
            לוח שנה צוות אנימד — {year}
          </h1>
        </div>
        <h1 className="text-lg font-bold text-primary text-center mb-2 print:hidden">
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
