"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ApiResult } from "@/lib/api";
import { fetchJson } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import type { AuthContextValue, AuthLoginPayload } from "@/models/auth";

const defaultBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5044";

export const AuthContext = createContext<AuthContextValue | null>(null);

const loginRoutes: Record<AuthLoginPayload["role"], string> = {
  Cliente: "/api/clientes/login",
  Funcionario: "/api/funcionarios/login",
  Oficina: "/api/oficinas/login",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [baseUrl, setBaseUrlState] = useState(defaultBaseUrl);
  const [token, setToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedToken = authStorage.get();
    if (storedToken) setToken(storedToken);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (token) {
      authStorage.set(token);
    } else {
      authStorage.clear();
    }
  }, [token, isReady]);

  const setBaseUrl = useCallback((value: string) => {
    if (value !== defaultBaseUrl) {
      setBaseUrlState(defaultBaseUrl);
      return;
    }
    setBaseUrlState(value);
  }, []);

  const login = async (payload: AuthLoginPayload): Promise<ApiResult> => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const result = await fetchJson(baseUrl, loginRoutes[payload.role], {
      method: "POST",
      body: {
        email: normalizedEmail,
        password: payload.password,
      },
    });

    if (result.ok && typeof result.data === "object" && result.data) {
      const pickToken = (value: unknown): string | null => {
        if (!value || typeof value !== "object") return null;
        const record = value as { token?: string; Token?: string };
        return record.token ?? record.Token ?? null;
      };
      const envelope = result.data as {
        data?: { token?: string; Token?: string } | string | null;
        Data?: { Token?: string; token?: string } | string | null;
        token?: string;
        Token?: string;
      };
      const tokenValue =
        (typeof envelope.data === "string" ? envelope.data : null) ??
        (typeof envelope.Data === "string" ? envelope.Data : null) ??
        pickToken(envelope.data) ??
        pickToken(envelope.Data) ??
        envelope.token ??
        envelope.Token ??
        "";
      if (tokenValue) setToken(tokenValue);
    } else if (result.ok && typeof result.data === "string") {
      const tokenValue = result.data.trim();
      if (tokenValue) setToken(tokenValue);
    }

    return result;
  };

  const logout = () => setToken("");

  const value = useMemo<AuthContextValue>(
    () => ({
      baseUrl,
      setBaseUrl,
      token,
      setToken,
      login,
      logout,
      isReady,
    }),
    [baseUrl, token, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
