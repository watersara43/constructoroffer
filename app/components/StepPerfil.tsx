"use client";

import { Perfil } from "../types";

interface StepPerfilProps {
  value: Perfil | null;
  onChange: (v: Perfil) => void;
  onNext: () => void;
  onBack: () => void;
}

const opciones = [
  {
    id: "closer" as Perfil,
    icon: "◈",
    titulo: "Closer / Comercial",
    descripcion:
      "Vendes el servicio de otra persona o empresa. Tu objetivo es cerrar la venta presentando la oferta de tu cliente.",
    ejemplos: "Setter, closer, comercial externo, director de ventas",
  },
  {
    id: "emprendedor" as Perfil,
    icon: "◉",
    titulo: "Emprendedor / Creador",
    descripcion:
      "Vendes tu propio servicio o conocimiento. Eres la oferta y el producto a la vez.",
    ejemplos: "Consultor, coach, formador, freelance, agencia propia",
  },
];

export default function StepPerfil({
  value,
  onChange,
  onNext,
  onBack,
}: StepPerfilProps) {
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
            fontWeight: 400,
          }}
        >
          PASO 1 DE 5
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
          ¿Qué vendes tú?
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
          }}
        >
          Dependiendo de tu situación, la oferta se construye diferente.
        </p>
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
        {opciones.map((opcion) => {
          const selected = value === opcion.id;
          return (
            <button
              key={opcion.id}
              onClick={() => onChange(opcion.id)}
              style={{
                background: selected
                  ? "rgba(121, 99, 155, 0.12)"
                  : "var(--negro-suave)",
                border: selected
                  ? "1px solid var(--lila)"
                  : "1px solid var(--linea)",
                padding: "24px 28px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {selected && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    background: "var(--lila)",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    color: selected ? "var(--lila)" : "var(--tierra)",
                    fontSize: "20px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {opcion.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: selected ? "var(--crema)" : "var(--arena)",
                      marginBottom: "6px",
                    }}
                  >
                    {opcion.titulo}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--tierra-claro)",
                      lineHeight: 1.5,
                      marginBottom: "8px",
                    }}
                  >
                    {opcion.descripcion}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.25)",
                      fontStyle: "italic",
                    }}
                  >
                    Ej: {opcion.ejemplos}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} className="btn-secondary">
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!value}
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
