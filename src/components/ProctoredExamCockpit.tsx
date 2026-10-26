"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArenaExam,
  ArenaResult,
  saveArenaResult,
} from "../lib/arena";
import {
  ShieldAlert,
  Maximize2,
  Minimize2,
  Timer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Check,
  X,
  Lock,
  MonitorOff,
} from "lucide-react";

interface ProctoredExamCockpitProps {
  exam: ArenaExam;
  onClose: () => void;
  onFinish?: (result: ArenaResult) => void;
}

export function ProctoredExamCockpit({
  exam,
  onClose,
  onFinish,
}: ProctoredExamCockpitProps) {
  // Navigation & Answers
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  // Timing
  const totalSeconds = exam.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  // Anti-Cheat Proctoring State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [multiScreenWarning, setMultiScreenWarning] = useState(false);
  const [multiScreenError, setMultiScreenError] = useState<string | null>(null);
  const [tabViolations, setTabViolations] = useState(0);
  const [activeViolationNotice, setActiveViolationNotice] = useState<string | null>(null);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Completed State & Result
  const [isCompleted, setIsCompleted] = useState(false);
  const [examResult, setExamResult] = useState<ArenaResult | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Enter Fullscreen on Mount
  useEffect(() => {
    const requestFs = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch {
        // Fullscreen request may require user gesture on some browsers
      }
    };
    requestFs();

    const handleFsChange = () => {
      const isFs = Boolean(document.fullscreenElement);
      setIsFullscreen(isFs);
      if (!isFs && !isCompleted) {
        setFullscreenWarning(true);
        logViolation("Exited Fullscreen Mode");
      } else {
        setFullscreenWarning(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      if (document.fullscreenElement) {
        try {
          document.exitFullscreen().catch(() => {});
        } catch {}
      }
    };
  }, [isCompleted]);

  // 2. Tab Switch & Focus Loss Anti-Cheat Detection
  const logViolation = (reason: string) => {
    if (isCompleted) return;
    setTabViolations((prev) => {
      const next = prev + 1;
      setActiveViolationNotice(
        `Anti-Cheat Alert: ${reason}. Switching tabs or leaving the exam window is strictly forbidden (Strike ${next} of 3).`
      );
      if (next >= 3) {
        // Auto submit exam upon 3 strikes
        setTimeout(() => {
          submitExam(next);
        }, 1200);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isCompleted) {
        logViolation("Tab switch or browser minimized");
      }
    };

    const handleBlur = () => {
      if (!isCompleted) {
        logViolation("Window focus lost");
      }
    };

    // Keyboard & Copy/Paste Restrictions
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;
      // Prevent Ctrl+C, Ctrl+V, Cmd+C, Cmd+V, F12, Alt+Tab
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "u", "s", "p", "a"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        logViolation("Prohibited keyboard shortcut pressed");
      }
      if (e.key === "F12") {
        e.preventDefault();
        logViolation("Developer tools inspect shortcut attempted");
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (isCompleted) return;
      e.preventDefault();
      logViolation("Copy text attempt detected");
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isCompleted) return;
      e.preventDefault();
    };

    // Cursor boundary departure detection (detects cursor moving to secondary extended screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (isCompleted) return;
      logViolation("Cursor exited display boundaries (Extended monitor or external display departure detected)");
    };

    // Continuous Multi-Monitor & Extended Display Detection
    const checkExtendedDisplay = () => {
      if (typeof window !== "undefined" && !isCompleted) {
        const isExtended = Boolean((window.screen as any)?.isExtended);
        const hasExtendedCoords =
          window.screenX < -20 ||
          window.screenX > window.screen.width + 20 ||
          window.screen.availWidth > window.screen.width * 1.15 ||
          Boolean((window.screen as any)?.availLeft && (window.screen as any).availLeft !== 0) ||
          Boolean((window.screen as any)?.availTop && (window.screen as any).availTop !== 0);

        if (isExtended || hasExtendedCoords) {
          setMultiScreenWarning(true);
        } else {
          setMultiScreenWarning(false);
          setMultiScreenError(null);
        }
      }
    };

    checkExtendedDisplay();
    const displayInterval = setInterval(checkExtendedDisplay, 1500);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", checkExtendedDisplay);
    (window.screen as any)?.addEventListener?.("change", checkExtendedDisplay);

    return () => {
      clearInterval(displayInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkExtendedDisplay);
      (window.screen as any)?.removeEventListener?.("change", checkExtendedDisplay);
    };
  }, [isCompleted]);

  // 3. Countdown Timer
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, answers, tabViolations]);

  // Format Timer MM:SS
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Selection handler
  const handleSelectOption = (optIndex: number) => {
    if (isCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  // Flag for review toggle
  const toggleFlag = (index: number) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Submit Exam & Calculate Final Score
  const submitExam = (finalViolations = tabViolations) => {
    if (isCompleted) return;

    let score = 0;
    exam.items.forEach((item, idx) => {
      if (answers[idx] === item.correct) {
        score += 1;
      }
    });

    const total = exam.items.length;
    const percentage = Math.round((score / total) * 100);
    const passed = score >= exam.passScore;
    const timeSpent = totalSeconds - secondsRemaining;

    const result: ArenaResult = {
      id: `res-${Date.now()}`,
      examId: exam.id,
      topicId: exam.topicId,
      topicTitle: exam.title,
      mode: exam.mode,
      score,
      total,
      percentage,
      passed,
      timeSpentSeconds: Math.max(1, timeSpent),
      violations: finalViolations,
      completedAt: Date.now(),
      answers,
    };

    saveArenaResult(result);
    setExamResult(result);
    setIsCompleted(true);
    setConfirmSubmitOpen(false);

    if (onFinish) onFinish(result);

    // Exit fullscreen
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch {}
    }
  };

  const currentQ = exam.items[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / exam.items.length) * 100);

  // Return to Fullscreen
  const reenterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setFullscreenWarning(false);
      }
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#09090b] text-zinc-100 flex flex-col font-sans select-none overflow-hidden"
    >
      {/* 1. Multi-Monitor Extended Display Blocking Overlay */}
      {multiScreenWarning && !isCompleted && (
        <div className="fixed inset-0 z-[170] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl border border-zinc-700 bg-[#121215] p-7 text-center space-y-5 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-850 border border-zinc-700 text-zinc-100 mx-auto">
              <MonitorOff className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Secondary / Extended Display Detected</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Enterprise proctoring policy strictly forbids multi-monitor and extended display setups during the technical screening.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-[#0c0c0f] p-4 text-left text-xs text-zinc-300 space-y-2">
              <span className="font-semibold text-white block">Required Action to Continue:</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-400">
                <li><strong>macOS:</strong> Open <em>System Settings → Displays</em> and set to "Mirror" or disconnect external monitor.</li>
                <li><strong>Windows:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono">Win + P</kbd> and select <strong>"PC screen only"</strong>.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  const isExtended = Boolean((window.screen as any)?.isExtended);
                  const hasExtendedCoords =
                    window.screenX < -20 ||
                    window.screenX > window.screen.width + 20 ||
                    window.screen.availWidth > window.screen.width * 1.15 ||
                    Boolean((window.screen as any)?.availLeft && (window.screen as any).availLeft !== 0) ||
                    Boolean((window.screen as any)?.availTop && (window.screen as any).availTop !== 0);

                  if (!isExtended && !hasExtendedCoords) {
                    setMultiScreenWarning(false);
                    setMultiScreenError(null);
                  } else {
                    setMultiScreenError(
                      "Multiple displays are still active. Disconnect your external monitor cable or switch display mode to single screen."
                    );
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-zinc-600 bg-zinc-800 hover:bg-zinc-750 text-xs font-semibold text-white transition active:scale-95"
              >
                I Have Disconnected Secondary Monitor (Re-check)
              </button>
              {multiScreenError && (
                <p className="text-[11px] text-zinc-400 font-medium">
                  {multiScreenError}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Fullscreen Warning Overlay */}
      {fullscreenWarning && !isCompleted && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-zinc-700 bg-[#121215] p-6 text-center space-y-4 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-200 mx-auto">
              <Maximize2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fullscreen Mode Required</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              To guarantee proctored exam integrity, the technical assessment must remain in fullscreen mode. Please return to fullscreen to resume.
            </p>
            <button
              type="button"
              onClick={reenterFullscreen}
              className="w-full py-2.5 rounded-xl border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition active:scale-95"
            >
              Resume Fullscreen Mode
            </button>
          </div>
        </div>
      )}

      {/* 2. Anti-Cheat Warning Modal Notification */}
      {activeViolationNotice && !isCompleted && (
        <div className="fixed inset-x-0 top-4 z-[140] flex justify-center px-4 animate-bounce">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/95 px-4 py-2.5 shadow-2xl backdrop-blur-md max-w-xl text-xs text-zinc-200">
            <AlertTriangle className="h-4 w-4 text-zinc-300 shrink-0" />
            <span className="flex-1 font-medium">{activeViolationNotice}</span>
            <button
              type="button"
              onClick={() => setActiveViolationNotice(null)}
              className="text-zinc-500 hover:text-zinc-200 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Top Proctoring & Assessment Header Bar */}
      <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-[#0e0e12] px-4 sm:px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-[#141418] px-2.5 py-1">
            <ShieldAlert className="h-3.5 w-3.5 text-zinc-300" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              Proctored Environment
            </span>
          </div>
          <span className="text-xs font-semibold text-zinc-200 hidden sm:inline">
            {exam.title}
          </span>
        </div>

        {/* Live Timer & Anti-Cheat Counter */}
        <div className="flex items-center gap-3">
          {/* Tab Switch Strike Counter */}
          <div
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono font-medium ${
              tabViolations > 0
                ? "border-zinc-600 bg-zinc-850 text-zinc-200"
                : "border-zinc-800 bg-[#121215] text-zinc-400"
            }`}
            title="Tab switch infractions (Max 3 before automatic submission)"
          >
            <span>Strikes:</span>
            <span className="font-bold text-zinc-100">{tabViolations} / 3</span>
          </div>

          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-1 font-mono text-xs font-bold ${
              secondsRemaining < 180
                ? "border-zinc-500 bg-zinc-800 text-zinc-100 animate-pulse"
                : "border-zinc-700 bg-zinc-850 text-zinc-200"
            }`}
          >
            <Timer className="h-3.5 w-3.5 text-zinc-400" />
            <span>{timeFormatted}</span>
          </div>

          {/* Submit Button */}
          {!isCompleted && (
            <button
              type="button"
              onClick={() => setConfirmSubmitOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-white transition active:scale-95"
            >
              <span>Submit Exam</span>
            </button>
          )}

          {isCompleted && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-white transition"
            >
              <span>Close Arena</span>
            </button>
          )}
        </div>
      </header>

      {/* 4. Active Exam Cockpit View */}
      {!isCompleted ? (
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Main Question Workspace */}
          <main className="flex-1 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto space-y-6">
              {/* Question Header Status */}
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md border border-zinc-800 bg-[#141418] px-2 py-0.5 text-xs font-mono font-semibold text-zinc-300">
                    Q{currentIndex + 1} of {exam.items.length}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {currentQ.topicTitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFlag(currentIndex)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    flagged.has(currentIndex)
                      ? "border-zinc-500 bg-zinc-800 text-zinc-100 font-semibold"
                      : "border-zinc-800 bg-[#121215] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Flag className="h-3 w-3" />
                  <span>{flagged.has(currentIndex) ? "Flagged" : "Flag for Review"}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {currentQ.q}
                </h2>
              </div>

              {/* Multiple-Choice Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentIndex] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 active:scale-[0.99] ${
                        isSelected
                          ? "border-zinc-400 bg-zinc-800 text-white font-medium ring-1 ring-zinc-500 shadow-sm"
                          : "border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-700 hover:bg-[#16161b]"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-lg border text-xs font-mono font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? "border-zinc-300 bg-zinc-700 text-white"
                            : "border-zinc-750 bg-zinc-850 text-zinc-400"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed flex-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Action Bar */}
            <div className="max-w-3xl w-full mx-auto pt-6 border-t border-zinc-850 flex items-center justify-between">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-[#121215] px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              <span className="text-xs text-zinc-500 font-mono">
                {answeredCount} of {exam.items.length} Answered
              </span>

              {currentIndex < exam.items.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(exam.items.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 px-4 py-2 text-xs font-semibold text-white transition active:scale-95"
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-bold text-white transition shadow-sm active:scale-95"
                >
                  <span>Review & Finish</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </main>

          {/* Right Question Navigator Palette */}
          <aside className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#0c0c0e] p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Question Palette
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {progressPct}% Done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-zinc-200 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Question Buttons Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {exam.items.map((_, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isAnswered = answers[idx] !== undefined;
                  const isFlagged = flagged.has(idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex h-10 w-full items-center justify-center rounded-xl border text-xs font-mono font-bold transition ${
                        isCurrent
                          ? "border-zinc-300 bg-zinc-700 text-white ring-2 ring-zinc-400"
                          : isFlagged
                          ? "border-zinc-600 bg-[#1c1c22] text-zinc-300"
                          : isAnswered
                          ? "border-zinc-700 bg-zinc-800 text-zinc-200"
                          : "border-zinc-850 bg-[#121215] text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-zinc-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-zinc-850 space-y-1.5 text-[11px] text-zinc-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-300" />
                    <span>Answered:</span>
                  </span>
                  <span className="font-mono text-zinc-200">{answeredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full border border-zinc-700 bg-transparent" />
                    <span>Unanswered:</span>
                  </span>
                  <span className="font-mono text-zinc-200">{exam.items.length - answeredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Flag className="h-2.5 w-2.5 text-zinc-400" />
                    <span>Flagged for Review:</span>
                  </span>
                  <span className="font-mono text-zinc-200">{flagged.size}</span>
                </div>
              </div>
            </div>

            {/* Anti-cheat guidelines */}
            <div className="rounded-xl border border-zinc-850 bg-[#101014] p-3 text-[11px] text-zinc-500 space-y-1">
              <span className="font-semibold text-zinc-400 block">Proctoring Rules Active</span>
              <p>Tab switches and copy/paste actions are monitored. Reaching 3 strikes triggers automated exam termination.</p>
            </div>
          </aside>
        </div>
      ) : (
        /* 5. Post-Exam Comprehensive Review & Scorecard */
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="max-w-4xl w-full mx-auto space-y-8">
            {/* Scorecard Header Card */}
            <div className="rounded-2xl border border-zinc-750 bg-[#101014] p-8 text-center space-y-4 shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-100 mx-auto">
                <Trophy className="h-8 w-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Performance Assessment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {examResult?.passed ? "Technical Screening Passed! 🎉" : "Assessment Completed"}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto leading-relaxed">
                  {examResult?.passed
                    ? "Exceptional conceptual recall and problem-solving velocity. You met the Tier-1 technical passing standard."
                    : "Review the question breakdowns below to patch conceptual gaps and retake the arena round."}
                </p>
              </div>

              {/* Big Metrics Split */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-4">
                <div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-3 text-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Score</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {examResult?.score} / {examResult?.total}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-3 text-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Accuracy</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {examResult?.percentage}%
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-3 text-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Time Used</span>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">
                    {Math.floor((examResult?.timeSpentSeconds || 0) / 60)}m {((examResult?.timeSpentSeconds || 0) % 60)}s
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#0a0a0d] p-3 text-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Proctor Audit</span>
                  <div className="text-xs font-bold font-mono text-zinc-300 mt-1.5">
                    {examResult?.violations === 0 ? "Clean Session ✓" : `${examResult?.violations} Strikes`}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-zinc-850">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 px-5 py-2.5 text-xs font-semibold text-white transition active:scale-95"
                >
                  Return to Mock Arena
                </button>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                Detailed Question Solutions & Explanations
              </h3>

              <div className="space-y-4">
                {exam.items.map((item, idx) => {
                  const picked = examResult?.answers?.[idx];
                  const isCorrect = picked === item.correct;

                  return (
                    <div
                      key={item.id || idx}
                      className={`rounded-2xl border p-5 space-y-4 transition ${
                        isCorrect
                          ? "border-zinc-750 bg-[#0f0f13]"
                          : "border-zinc-700/80 bg-[#121215]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-xs font-mono font-bold text-zinc-300">
                            Q{idx + 1}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {item.topicTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold font-mono">
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-zinc-200">
                              <CheckCircle2 className="h-4 w-4" /> Correct (+1)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-zinc-400">
                              <XCircle className="h-4 w-4" /> Incorrect (0)
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-white leading-relaxed">
                        {item.q}
                      </h4>

                      {/* Options breakdown */}
                      <div className="space-y-2 pt-1 text-xs">
                        {item.options.map((opt, optIdx) => {
                          const wasPicked = picked === optIdx;
                          const wasCorrect = item.correct === optIdx;

                          let badgeClass = "border-zinc-850 bg-[#0a0a0d] text-zinc-400";
                          if (wasCorrect) {
                            badgeClass = "border-zinc-500 bg-zinc-800/80 text-white font-semibold";
                          } else if (wasPicked && !wasCorrect) {
                            badgeClass = "border-zinc-650 bg-zinc-900 text-zinc-300 line-through opacity-80";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-2.5 p-3 rounded-xl border ${badgeClass}`}
                            >
                              <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span className="flex-1">{opt}</span>
                              {wasCorrect && (
                                <span className="font-mono text-[10px] uppercase font-bold text-zinc-300">
                                  Correct Answer
                                </span>
                              )}
                              {wasPicked && !wasCorrect && (
                                <span className="font-mono text-[10px] uppercase text-zinc-500">
                                  Your Pick
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Callout */}
                      {item.explanation && (
                        <div className="rounded-xl border border-zinc-800 bg-[#09090b] p-3 text-xs text-zinc-300 leading-relaxed">
                          <span className="font-semibold text-zinc-400 block mb-1">
                            Technical Explanation:
                          </span>
                          <div dangerouslySetInnerHTML={{ __html: item.explanation }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Confirm Finish Modal */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-[160] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl border border-zinc-700 bg-[#121215] p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Submit Technical Assessment?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              You have answered <strong className="text-white font-semibold">{answeredCount} of {exam.items.length}</strong> questions.
              {exam.items.length - answeredCount > 0 && (
                <span> <strong className="text-zinc-300">{exam.items.length - answeredCount}</strong> questions are still unanswered.</span>
              )} Once submitted, your score and anti-cheat audit will be recorded.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:text-white transition"
              >
                Continue Exam
              </button>

              <button
                type="button"
                onClick={() => submitExam()}
                className="px-4 py-2 rounded-xl border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition active:scale-95"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
