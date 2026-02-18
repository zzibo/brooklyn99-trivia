"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PixelButton } from "./pixel-button";

export function BackToHomeButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed left-3 top-3 z-50 flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 backdrop-blur-sm transition-all hover:bg-black/80 sm:left-4 sm:top-4"
      >
        <ArrowLeft className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
        <span className="font-pixel text-[8px] text-white sm:text-[10px]">
          Back
        </span>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="pixel-border mx-4 w-full max-w-xs rounded-lg bg-card p-5 text-center">
            <p className="font-pixel text-[10px] leading-relaxed text-foreground sm:text-xs">
              Are you sure you want to quit?
            </p>
            <p className="font-pixel mt-1.5 text-[8px] text-muted-foreground">
              Your progress will be lost!
            </p>
            <div className="mt-4 flex justify-center gap-3">
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
                onClick={() => router.push("/")}
              >
                Quit
              </PixelButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
