import type { ApiResult } from "@/lib/api";

export type AuthRole = "Cliente" | "Funcionario" | "Oficina";

export type AuthLoginPayload = {
  role: AuthRole;
  email: string;
  password: string;
};

export type AuthContextValue = {
  baseUrl: string;
  setBaseUrl: (value: string) => void;
  token: string;
  setToken: (value: string) => void;
  login: (payload: AuthLoginPayload) => Promise<ApiResult>;
  logout: () => void;
  isReady: boolean;
};
