"use client";

import { Step } from "../types";

interface HeaderProps {
  currentStep: Step;
}

export default function Header({ currentStep }: HeaderProps) {
  // Only show on steps where progress bar is also visible
  const hiddenSteps: Step[] = ["bienvenida", "generando"];
  if (hiddenSteps.includes(currentStep)) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "40px", // below the progress bar line
        left: 0,
        right: 0,
        zIndex: 49,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
      className="no-print"
    >
      {/* Logo shown inside the progress bar row — handled in ProgressBar */}
    </div>
  );
}
