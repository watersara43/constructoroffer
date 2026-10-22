"use client";

import { Perfil } from "../types";

interface StepProductoProps {
  perfil: Perfil;
  producto: string;
  transformacion: string;
  onChange: (field: "producto" | "transformacion", value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepProducto({
  perfil,
  producto,
  transformacion,
  onChange,
  onNext,
  onBack,
}: StepProductoProps) {
  const isCloser = perfil === "closer";

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
          PASO 2 DE 5
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
          {isCloser ? "El servicio que presentas" : "Tu servicio"}
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
          }}
        >
          Describe qué es lo que vendes y qué consigue el cliente al comprarlo.
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "40px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--arena)",
              marginBottom: "10px",
              fontWeight: 400,
            }}
          >
            {isCloser
              ? "¿Qué servicio o programa vendes?"
              : "¿Cómo se llama tu servicio o programa?"}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={
              isCloser
                ? "Ej: Formación de closers de alto ticket de 3 meses"
                : "Ej: Mentoría de ventas 1:1 de 90 días"
            }
            value={producto}
            onChange={(e) => onChange("producto", e.target.value)}
          />
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              marginTop: "8px",
            }}
          >
            Sé específico: tipo de servicio, duración, formato.
          </p>
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--arena)",
              marginBottom: "10px",
            }}
          >
            ¿Qué transformación concreta consigue el cliente?
          </label>
          <textarea
            className="input-field"
            rows={4}
            placeholder={
              isCloser
                ? "Ej: Pasa de no saber cerrar a cerrar el 40-50% de sus llamadas en 90 días, sin perder su estilo personal"
                : "Ej: Pasa de hacer llamadas sin estructura y cerrar 1 de cada 5, a tener un proceso claro que le permite cerrar 3 de 5"
            }
            value={transformacion}
            onChange={(e) => onChange("transformacion", e.target.value)}
          />
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              marginTop: "8px",
            }}
          >
            Punto de partida → Resultado específico. Cuanto más concreto, mejor.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} className="btn-secondary">
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!producto.trim() || !transformacion.trim()}
          className="btn-primary"
          style={{ flex: 1, justifyContent: "center" }}
        >
          Continuar
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
