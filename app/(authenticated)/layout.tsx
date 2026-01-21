import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,.28),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(34,211,238,.22),transparent_55%),radial-gradient(700px_500px_at_60%_120%,rgba(16,185,129,.18),transparent_55%)]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">{children}</main>
    </div>
  );
}
