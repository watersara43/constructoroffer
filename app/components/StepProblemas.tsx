"use client";

import { useState } from "react";

interface StepProblemasProps {
  problemas: string[];
  onChange: (problemas: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepProblemas({
  problemas,
  onChange,
  onNext,
  onBack,
}: StepProblemasProps) {
  const [touched, setTouched] = useState<boolean[]>(
    new Array(5).fill(false)
  );

  const updateProblema = (index: number, value: string) => {
    const newProblemas = [...problemas];
    newProblemas[index] = value;
    onChange(newProblemas);

    const newTouched = [...touched];
    newTouched[index] = true;
    setTouched(newTouched);
  };

  const filledCount = problemas.filter((p) => p.trim()).length;
  const canContinue = filledCount >= 3;

  return (
    <div style={{ padding: "32px 24px", maxWidth: "560px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <p
          style={{
            fontSize: "11px",
            color: "var(--lila)",
            letterSpacing: "0.12em",
            marginBottom: "12px",
          }}
        >
          PASO 4 DE 5
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--crema)",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Los 5 problemas de tu cliente
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
          }}
        >
          Escríbelos tú. Esta parte es tuya — no la puede hacer la IA por ti.
        </p>
      </div>

      {/* Important note */}
      <div
        style={{
          background: "rgba(128, 106, 88, 0.08)",
          border: "1px solid rgba(128, 106, 88, 0.2)",
          borderLeft: "3px solid var(--tierra)",
          padding: "16px 20px",
          marginBottom: "32px",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--arena)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--arena)", display: "block", marginBottom: "4px" }}>
            Por qué los escribes tú, no la IA
          </strong>
          Los problemas más poderosos vienen de conversaciones reales, de frases que
          has escuchado en llamadas, de lo que dicen tus clientes en sus propias palabras.
          La IA no tiene ese contexto. Tú sí.
        </p>
      </div>

      {/* Counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--tierra-claro)" }}>
          Mínimo 3, máximo 5
        </span>
        <span
          style={{
            fontSize: "13px",
            color: filledCount >= 3 ? "var(--lila)" : "var(--tierra-claro)",
            fontWeight: 500,
          }}
        >
          {filledCount}/5 completados
        </span>
      </div>

      {/* Problem inputs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
        {[0, 1, 2, 3, 4].map((index) => {
          const isRequired = index < 3;
          const isEmpty = !problemas[index]?.trim();
          const showError = touched[index] && isEmpty && isRequired;

          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${
                      problemas[index]?.trim()
                        ? "var(--lila)"
                        : "var(--linea)"
                    }`,
                    fontSize: "11px",
                    color: problemas[index]?.trim()
                      ? "var(--lila)"
                      : "rgba(255,255,255,0.2)",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {index + 1}
                </span>
                <input
                  type="text"
                  className="input-field"
                  placeholder={
                    isRequired
                      ? `Problema ${index + 1} (obligatorio)`
                      : `Problema ${index + 1} (opcional)`
                  }
                  value={problemas[index] || ""}
                  onChange={(e) => updateProblema(index, e.target.value)}
                  style={{
                    borderColor:
                      showError
                        ? "rgba(200, 80, 80, 0.4)"
                        : undefined,
                  }}
                />
              </div>
              {showError && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(200, 80, 80, 0.7)",
                    marginTop: "6px",
                    marginLeft: "40px",
                  }}
                >
                  Este campo es obligatorio
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Examples hint */}
      <div
        style={{
          padding: "14px 18px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--linea-suave)",
          marginBottom: "32px",
        }}
      >
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
          <strong style={{ color: "rgba(255,255,255,0.4)" }}>Ejemplos para inspirarte: </strong>
          &quot;No entiende por qué pierde llamadas que parecían cerradas&quot; · &quot;Cada llamada es diferente y no sabe qué replicar&quot; · &quot;Se pone nervioso cuando el cliente pregunta el precio&quot;
        </p>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} className="btn-secondary">
          Atrás
        </button>
        <button
          onClick={() => {
            if (!canContinue) {
              setTouched(new Array(5).fill(true));
              return;
            }
            onNext();
          }}
          disabled={false}
          className="btn-primary"
          style={{
            flex: 1,
            justifyContent: "center",
            opacity: canContinue ? 1 : 0.6,
          }}
        >
          {canContinue ? (
            <>
              Continuar
              <span>→</span>
            </>
          ) : (
            `Falta${3 - filledCount > 1 ? "n" : ""} ${3 - filledCount} problema${3 - filledCount > 1 ? "s" : ""}`
          )}
        </button>
      </div>
    </div>
  );
}
