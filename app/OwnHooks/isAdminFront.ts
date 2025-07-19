"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useIsAdmin = (token: string | null) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.refresh();
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const isAdmin = decodedToken?.role === "admin";

      if (!isAdmin) {
        router.refresh();
      }
    } catch (error) {
      router.refresh();
    }
  }, [token, router]);
};
