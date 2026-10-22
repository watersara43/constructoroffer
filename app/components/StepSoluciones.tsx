"use client";

import { SolucionProblem } from "../types";

interface StepSolucionesProps {
  problemas: string[];
  soluciones: SolucionProblem[];
  onChange: (soluciones: SolucionProblem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepSoluciones({
  problemas,
  soluciones,
  onChange,
  onNext,
  onBack,
}: StepSolucionesProps) {
  const filledProblemas = problemas.filter((p) => p.trim());

  const updateSolucion = (index: number, value: string) => {
    const newSoluciones = [...soluciones];
    newSoluciones[index] = {
      problema: filledProblemas[index],
      solucion: value,
    };
    onChange(newSoluciones);
  };

  const allFilled = filledProblemas.every(
    (_, i) => soluciones[i]?.solucion?.trim()
  );

  return (
    <div style={{ padding: "32px 24px", maxWidth: "600px", margin: "0 auto" }}>
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
          PASO 5 DE 5
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
          ¿Cómo lo resuelves?
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
          }}
        >
          Para cada problema que identificaste, explica qué parte de tu servicio lo resuelve.
        </p>
      </div>

      {/* Problem-Solution pairs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
        {filledProblemas.map((problema, index) => (
          <div
            key={index}
            style={{
              border: "1px solid var(--linea)",
              background: "var(--negro-suave)",
              padding: "24px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: soluciones[index]?.solucion?.trim()
                  ? "var(--lila)"
                  : "var(--tierra)",
                transition: "background 0.3s",
              }}
            />

            {/* Problem */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--tierra-claro)",
                  marginBottom: "6px",
                  fontWeight: 400,
                }}
              >
                PROBLEMA {index + 1}
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--arena)",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                &quot;{problema}&quot;
              </p>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--linea)",
                }}
              />
              <span style={{ color: "var(--lila)", fontSize: "14px" }}>↓</span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--linea)",
                }}
              />
            </div>

            {/* Solution */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--lila-suave)",
                  marginBottom: "8px",
                  fontWeight: 400,
                }}
              >
                ¿CÓMO LO RESUELVE TU SERVICIO?
              </label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Describe el mecanismo o la parte de tu servicio que ataca este problema directamente..."
                value={soluciones[index]?.solucion || ""}
                onChange={(e) => updateSolucion(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ready to generate hint */}
      {allFilled && (
        <div
          style={{
            background: "rgba(121, 99, 155, 0.08)",
            border: "1px solid var(--linea)",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ color: "var(--lila)", fontSize: "18px" }}>◈</span>
          <p style={{ fontSize: "13px", color: "var(--arena)", lineHeight: 1.5 }}>
            Todo listo. En el siguiente paso la IA construirá tus 3 pilares
            a partir de todo lo que has escrito.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} className="btn-secondary">
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!allFilled}
          className="btn-primary"
          style={{ flex: 1, justifyContent: "center" }}
        >
          Generar mi oferta
          <span>✦</span>
        </button>
      </div>
    </div>
  );
}
