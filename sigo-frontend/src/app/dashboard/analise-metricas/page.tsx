import { ProtectedRoute } from "@/components/Auth/RouteGuards";
import { DashboardTabs } from "@/components/Dashboard/DashboardTabs";
import { NavBar } from "@/components/Sidebar/NavBar";

export default function AnaliseMetricasPage() {
  return (
    <ProtectedRoute>
      <div className="sigo-page">
        <NavBar />
        <main className="sigo-shell grid gap-6 py-8">
          <DashboardTabs />

          <section className="sigo-card p-8">
            <h2 className="text-2xl font-black text-[var(--sigo-text)]">
              Analise e Metricas
            </h2>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
