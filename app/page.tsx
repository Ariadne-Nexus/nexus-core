import { DailySummaryPanel } from "@/components/DailySummaryPanel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 p-8">
        {/* Hero copy here */}
        <DailySummaryPanel />
      </div>
    </main>
  );
}
