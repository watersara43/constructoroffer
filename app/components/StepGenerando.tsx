"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Analizando los problemas de tu cliente...",
  "Conectando problemas con soluciones...",
  "Estructurando los 3 pilares...",
  "Construyendo el guión de llamada...",
  "Refinando el termómetro emocional...",
  "Preparando tu chuleta de llamada...",
  "Casi listo...",
];

export default function StepGenerando() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      {/* Animated logo/symbol */}
      <div
        style={{
          position: "relative",
          width: "80px",
          height: "80px",
          marginBottom: "48px",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(167, 139, 202, 0.2)",
            borderRadius: "50%",
            borderTopColor: "var(--lila)",
            animation: "spin 2s linear infinite",
          }}
        />
        {/* Middle ring */}
        <div
          style={{
            position: "absolute",
            inset: "12px",
            border: "1px solid rgba(167, 139, 202, 0.15)",
            borderRadius: "50%",
            borderBottomColor: "var(--lila-profundo)",
            animation: "spin 3s linear infinite reverse",
          }}
        />
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            inset: "32px",
            background: "var(--lila)",
            borderRadius: "50%",
            animation: "pulse-lila 2s ease infinite",
          }}
        />
      </div>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 500,
          fontStyle: "italic",
          color: "var(--crema)",
          marginBottom: "20px",
        }}
      >
        Construyendo tu oferta
      </h2>

      {/* Dynamic message */}
      <div
        style={{
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          key={messageIndex}
          style={{
            fontSize: "14px",
            color: "var(--tierra-claro)",
            animation: "fadeSlideUp 0.4s ease",
          }}
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          marginTop: "32px",
        }}
      >
        {LOADING_MESSAGES.map((_, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                i <= messageIndex
                  ? "var(--lila)"
                  : "rgba(255,255,255,0.1)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <p
        style={{
          marginTop: "48px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        Esto puede tardar entre 15 y 30 segundos
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
