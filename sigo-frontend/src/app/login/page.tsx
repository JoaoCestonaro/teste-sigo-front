"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthRole } from "@/models/auth";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/navigation/routes";
import { NavBar } from "@/components/NavBar";
import { SectionCard } from "@/components/SectionCard";
import { TextInput } from "@/components/TextInput";

export default function LoginPage() {
  const router = useRouter();
  const { baseUrl, setBaseUrl, login } = useAuth();
  const [role, setRole] = useState<AuthRole>("Cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await login({ role, email, password });
    if (result.ok) {
      router.replace(routes.dashboard);
    } else {
      const message =
        typeof result.data === "object" && result.data
          ? (result.data as { Message?: string }).Message
          : null;
      setError(message ?? "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar />
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
        <header className="grid gap-2">
          <h1 className="text-2xl font-semibold">SIGO Login</h1>
          <p className="text-sm text-slate-600">
            Enter your credentials to access the dashboard.
          </p>
        </header>

        <SectionCard title="Connection">
          <TextInput
            label="API base URL"
            value={baseUrl}
            onChange={setBaseUrl}
            placeholder="http://localhost:5044"
          />
        </SectionCard>

        <SectionCard title="Login">
          <form className="grid gap-3" onSubmit={handleSubmit}>
            <label className="text-sm text-slate-600">
              Role
              <select
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                value={role}
                onChange={(event) => setRole(event.target.value as AuthRole)}
              >
                <option value="Cliente">Cliente</option>
                <option value="Funcionario">Funcionario</option>
                <option value="Oficina">Oficina</option>
              </select>
            </label>
            <TextInput label="Email" value={email} onChange={setEmail} />
            <TextInput
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
            />
            {error ? <p className="text-xs text-rose-600">{error}</p> : null}
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </SectionCard>
      </main>
    </div>
  );
}
