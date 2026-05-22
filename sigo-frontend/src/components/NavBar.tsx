"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/navigation/routes";

export function NavBar() {
  const { token, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-800">
          <Link href={routes.dashboard}>Dashboard</Link>
          <Link href={routes.login}>Login</Link>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>{token ? "Token active" : "No token"}</span>
          {token ? (
            <button
              type="button"
              className="rounded-md border border-slate-200 px-3 py-1 text-xs"
              onClick={logout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
