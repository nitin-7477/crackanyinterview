"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AuthPage } from "@/components/AuthPage";

function LoginContent() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice") || "";
  return <AuthPage mode="login" initialNotice={notice} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="empty-note">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
