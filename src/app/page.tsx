"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";

export default function RootPage() {
  const { account } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [account, router]);

  return null;
}
