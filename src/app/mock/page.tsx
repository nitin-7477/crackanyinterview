"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext.jsx";
import { useStudy } from "@/context/StudyContext.jsx";
import { HomeLayout } from "@/components/HomeLayout";
import { PASS_SCORE, QUIZ_SIZE, dayQuestions, planQuestionList, selectedJsDay } from "@/lib/catalog.js";

export default function MockPage() {
  const { account } = useAuth();
  const { state } = useStudy();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }
  }, [account, router]);

  if (!account) return null;

  const day = selectedJsDay(state.plan);
  const today = dayQuestions(planQuestionList(), day);
  const read = new Set(state.plan.read[day] || []);
  const done = today.filter((item: any) => read.has(item.id)).length;
  const ready = done === today.length;
  const result = state.plan.results[day];
  const status = result?.passed
    ? `Day ${day} practice is passed (${result.score}/${result.total}).`
    : ready
      ? `Day ${day} reading is complete. The practice quiz is ${QUIZ_SIZE} questions. Score more than ${PASS_SCORE} to unlock the next day.`
      : `Finish Day ${day} reading first. ${done}/${today.length} questions are marked complete.`;

  return (
    <HomeLayout>
      <p className="home-kicker">Practice</p>
      <h1>Mock Interviews</h1>
      <p className="home-lead">{status}</p>
      <section className="dash-card">
        <h2>JavaScript · Day {day}</h2>
        <p>{QUIZ_SIZE} questions · pass mark more than {PASS_SCORE}</p>
        <button
          type="button"
          className="dash-go"
          onClick={() => router.push(ready ? `/javascript/day/${day}?quiz=true` : `/javascript/day/${day}`)}
        >
          {ready ? "Start practice" : "Continue reading"}
        </button>
      </section>
    </HomeLayout>
  );
}
