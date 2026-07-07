"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/services/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  return {
    user,
    loading,
  };
}