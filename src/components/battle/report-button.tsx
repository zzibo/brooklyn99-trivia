"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { PixelBorder } from "@/components/pixel/pixel-border";
import { PixelButton } from "@/components/pixel/pixel-button";
import { reportQuestion } from "@/lib/db";

interface ReportButtonProps {
  questionText: string;
  correctAnswer: string;
  bossId: string;
}

export function ReportButton({ questionText, correctAnswer, bossId }: ReportButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleReport = async () => {
    setStatus("submitting");
    try {
      await reportQuestion(questionText, correctAnswer, bossId, suggestion.trim());
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <span className="font-pixel text-[8px] text-muted-foreground sm:text-[10px]">
        Reported!
      </span>
    );
  }

  return (
    <>
      <PixelButton
        onClick={() => setShowConfirm(true)}
        disabled={status !== "idle"}
        variant="danger"
        size="sm"
      >
        <span className="flex items-center gap-1">
          <Flag className="h-3 w-3" />
          Report
        </span>
      </PixelButton>

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
              <p className="font-pixel text-[8px] leading-relaxed text-muted-foreground">
                What&apos;s wrong?
              </p>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                maxLength={200}
                rows={2}
                placeholder="e.g. The correct answer should be..."
                className="font-pixel pixel-border w-full rounded bg-background px-2 py-1.5 text-[8px] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground resize-none"
              />
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
