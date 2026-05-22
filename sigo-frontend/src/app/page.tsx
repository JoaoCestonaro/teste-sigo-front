"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/navigation/routes";

export default function HomePage() {
  const router = useRouter();
  const { token, isReady } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    router.replace(token ? routes.dashboard : routes.login);
  }, [isReady, token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
      Loading...
    </div>
  );
}
