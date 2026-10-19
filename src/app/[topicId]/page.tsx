"use client";

import { use } from "react";
import { Suspense } from "react";
import { TopicView } from "@/components/TopicView";

export default function TopicPageRoute({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);

  return (
    <Suspense fallback={<div className="empty-note">Loading topic...</div>}>
      <TopicView topicId={topicId} />
    </Suspense>
  );
}
