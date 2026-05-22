"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchJson } from "@/lib/api";
import type { ApiResult } from "@/lib/api";
import { NavBar } from "@/components/NavBar";
import { SectionCard } from "@/components/SectionCard";
import { TextInput } from "@/components/TextInput";
import { ResultPanel } from "@/components/ResultPanel";
import { CrudPanel } from "@/components/CrudPanel";
import { entityConfigs } from "@/models/entityConfigs";

export default function DashboardPage() {
  const { baseUrl, setBaseUrl, token, logout } = useAuth();
  const [cep, setCep] = useState("");
  const [cepResult, setCepResult] = useState<ApiResult | null>(null);
  const [busy, setBusy] = useState(false);

  const handleCep = async () => {
    if (!cep.trim()) return;
    setBusy(true);
    const result = await fetchJson(baseUrl, `/api/ceps/${cep.trim()}`, {
      method: "GET",
    });
    setCepResult(result);
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-600">
              Minimal admin to validate backend endpoints.
            </p>
          </div>
          {token ? (
            <button
              type="button"
              className="rounded-md border border-slate-200 px-3 py-1 text-sm"
              onClick={logout}
            >
              Logout
            </button>
          ) : null}
        </header>

        <SectionCard title="Connection">
          <TextInput
            label="API base URL"
            value={baseUrl}
            onChange={setBaseUrl}
            placeholder="http://localhost:5044"
          />
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
            <p className="font-semibold">Token</p>
            <p className="mt-1 break-all">{token || "No token"}</p>
          </div>
        </SectionCard>

        <SectionCard title="CRUD">
          <div className="grid gap-4 md:grid-cols-2">
            {entityConfigs.map((config) => (
              <CrudPanel
                key={config.key}
                config={config}
                baseUrl={baseUrl}
                token={token}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="CEP lookup">
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex-1">
              <TextInput label="CEP" value={cep} onChange={setCep} />
            </div>
            <button
              type="button"
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white"
              onClick={handleCep}
              disabled={busy}
            >
              Consult
            </button>
          </div>
          <ResultPanel title="CEP" result={cepResult} />
        </SectionCard>
      </main>
    </div>
  );
}
