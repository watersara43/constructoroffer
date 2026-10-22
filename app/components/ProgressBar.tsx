"use client";

import { Step } from "../types";

const STEPS: { id: Step; label: string }[] = [
  { id: "perfil", label: "Perfil" },
  { id: "producto", label: "Servicio" },
  { id: "cliente", label: "Cliente" },
  { id: "problemas", label: "Problemas" },
  { id: "soluciones", label: "Soluciones" },
  { id: "resultado", label: "Tu oferta" },
];

interface ProgressBarProps {
  currentStep: Step;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const hiddenSteps: Step[] = ["bienvenida", "generando"];
  if (hiddenSteps.includes(currentStep)) return null;

  const stepIds = STEPS.map((s) => s.id);
  const currentIndex = stepIds.indexOf(currentStep);
  const progress =
    currentStep === "resultado"
      ? 100
      : Math.round(((currentIndex + 1) / STEPS.length) * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Progress line */}
      <div
        style={{ height: "2px", background: "var(--negro-medio)", width: "100%" }}
      >
        <div
          className="progress-bar"
          style={{ width: `${progress}%`, height: "2px" }}
        />
      </div>

      {/* Steps indicator */}
      <div
        style={{
          background: "rgba(23, 21, 26, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--linea-suave)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "720px",
          margin: "0 auto",
          gap: "8px",
        }}
      >
        {/* Logo */}
        <img
          src="https://raw.githubusercontent.com/watersara43/manifiesto-a-fondo/main/logo-a-fondo.png"
          alt="A Fondo — Sara Castro"
          style={{
            height: "28px",
            width: "auto",
            flexShrink: 0,
            opacity: 0.9,
          }}
        />

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = step.id === currentStep || (currentStep === "resultado" && index === STEPS.length - 1);
            const isFuture = index > currentIndex && currentStep !== "resultado";

            return (
              <div
                key={step.id}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: isCompleted
                        ? "var(--lila)"
                        : isCurrent
                        ? "var(--lila-suave)"
                        : "rgba(255,255,255,0.15)",
                      transition: "background 0.3s",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      color: isCompleted
                        ? "var(--lila)"
                        : isCurrent
                        ? "var(--crema)"
                        : "rgba(255,255,255,0.25)",
                      fontWeight: isCurrent ? 400 : 300,
                      transition: "color 0.3s",
                      whiteSpace: "nowrap",
                      fontFamily: "DM Sans, sans-serif",
                      display: isFuture && index > 2 ? "none" : "inline",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.12)",
                      fontSize: "10px",
                      margin: "0 2px",
                    }}
                  >
                    /
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Step count */}
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
            flexShrink: 0,
            fontFamily: "DM Sans, sans-serif",
          }}
        >
          {currentIndex + 1}/{STEPS.length}
        </span>
      </div>
    </div>
  );
}
