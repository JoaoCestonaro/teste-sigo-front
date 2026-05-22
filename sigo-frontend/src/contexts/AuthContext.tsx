"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import type { ApiResult } from "@/lib/api";
import { fetchJson } from "@/lib/api";
import type { AuthContextValue, AuthLoginPayload } from "@/models/auth";

const STORAGE_TOKEN = "sigo.token";
const STORAGE_BASE_URL = "sigo.baseUrl";

const defaultBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5044";

export const AuthContext = createContext<AuthContextValue | null>(null);

const loginRoutes: Record<AuthLoginPayload["role"], string> = {
  Cliente: "/api/clientes/login",
  Funcionario: "/api/funcionarios/login",
  Oficina: "/api/oficinas/login",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);
  const [token, setToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedBaseUrl = localStorage.getItem(STORAGE_BASE_URL);
    const storedToken = localStorage.getItem(STORAGE_TOKEN);
    if (storedBaseUrl) setBaseUrl(storedBaseUrl);
    if (storedToken) setToken(storedToken);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(STORAGE_BASE_URL, baseUrl);
    if (token) {
      localStorage.setItem(STORAGE_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_TOKEN);
    }
  }, [baseUrl, token, isReady]);

  const login = async (payload: AuthLoginPayload): Promise<ApiResult> => {
    const result = await fetchJson(baseUrl, loginRoutes[payload.role], {
      method: "POST",
      body: {
        Email: payload.email,
        Password: payload.password,
      },
    });

    if (result.ok && typeof result.data === "object" && result.data) {
      const tokenValue = (result.data as { Data?: string }).Data ?? "";
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
