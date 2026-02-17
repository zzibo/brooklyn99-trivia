"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import { reportQuestion } from "@/lib/supabase";

interface ReportButtonProps {
  questionText: string;
  correctAnswer: string;
  bossId: string;
}

export function ReportButton({ questionText, correctAnswer, bossId }: ReportButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleReport = async () => {
    setStatus("submitting");
    try {
      await reportQuestion(questionText, correctAnswer, bossId);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <span className="font-pixel text-[8px] text-muted-foreground">
        Reported!
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={status !== "idle"}
        className="cursor-pointer rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
        title="Report incorrect question"
      >
        <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <PixelBorder className="w-full max-w-sm space-y-3 bg-card text-center">
            <h3 className="font-pixel text-[10px] text-destructive">Report Question?</h3>
            <div className="space-y-2 text-left">
              <p className="font-pixel text-[8px] leading-relaxed text-muted-foreground">
                Question:
              </p>
              <p className="font-pixel text-[8px] leading-relaxed">
                {questionText}
              </p>
              <p className="font-pixel text-[8px] leading-relaxed text-muted-foreground">
                Marked correct:
              </p>
              <p className="font-pixel text-[8px] leading-relaxed text-b99-green">
                {correctAnswer}
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <PixelButton
                size="sm"
                variant="secondary"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </PixelButton>
              <PixelButton
                size="sm"
                variant="danger"
                onClick={handleReport}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Report"}
              </PixelButton>
            </div>
            {status === "error" && (
              <p className="font-pixel text-[7px] text-destructive">Failed to report. Try again!</p>
            )}
          </PixelBorder>
        </div>
      )}
    </>
  );
}
