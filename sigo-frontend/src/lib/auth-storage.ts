export const AUTH_STORAGE_KEY = "sigo.token";

type StoredToken = {
  token: string;
};

const isBrowser = () => typeof window !== "undefined";

export const authStorage = {
  get(): string {
    if (!isBrowser()) return "";

    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return "";

      const parsed = JSON.parse(raw) as Partial<StoredToken> | null;
      if (!parsed || typeof parsed.token !== "string" || !parsed.token.trim()) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return "";
      }

      return parsed.token;
    } catch {
      return "";
    }
  },

  set(token: string) {
    if (!isBrowser()) return;
    if (!token.trim()) {
      this.clear();
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token }));
  },

  clear() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
