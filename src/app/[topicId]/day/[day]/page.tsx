"use client";

import { use } from "react";
import { Suspense } from "react";
import { TopicView } from "@/components/TopicView";

export default function TopicDayPageRoute({
  params,
}: {
  params: Promise<{ topicId: string; day: string }>;
}) {
  const { topicId, day } = use(params);

  return (
    <Suspense fallback={<div className="empty-note">Loading day...</div>}>
      <TopicView topicId={topicId} dayParam={day} />
    </Suspense>
  );
}
