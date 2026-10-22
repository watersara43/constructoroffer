"use client";

interface StepClienteProps {
  cliente: string;
  dolorPrincipal: string;
  onChange: (field: "cliente" | "dolorPrincipal", value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepCliente({
  cliente,
  dolorPrincipal,
  onChange,
  onNext,
  onBack,
}: StepClienteProps) {
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
          PASO 3 DE 5
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
          Tu cliente potencial
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
          }}
        >
          Describe a quién va dirigido este servicio y cuál es su mayor dolor ahora mismo.
        </p>
      </div>

      {/* Insight box */}
      <div
        style={{
          background: "rgba(121, 99, 155, 0.08)",
          border: "1px solid var(--linea)",
          borderLeft: "3px solid var(--lila-profundo)",
          padding: "16px 20px",
          marginBottom: "32px",
        }}
      >
        <p style={{ fontSize: "13px", color: "var(--arena)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--lila-suave)", display: "block", marginBottom: "4px" }}>
            Por qué importa esto
          </strong>
          La oferta que conecta no es la que tiene más cosas — es la que nombra exactamente
          lo que el cliente está viviendo. Cuanto más específico seas aquí, más potente
          será tu presentación.
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
            }}
          >
            ¿Quién es tu cliente potencial?
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Ej: Closers con 1-2 años de experiencia que tienen resultados irregulares"
            value={cliente}
            onChange={(e) => onChange("cliente", e.target.value)}
          />
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              marginTop: "8px",
            }}
          >
            Describe quién es, en qué momento está y con qué experiencia.
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
            ¿Cuál es su dolor principal en este momento?
          </label>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Ej: Cierra algunas llamadas pero no sabe por qué y no puede replicarlo. Le pesa cuando pierde una y no entiende qué salió mal."
            value={dolorPrincipal}
            onChange={(e) => onChange("dolorPrincipal", e.target.value)}
          />
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
              marginTop: "8px",
            }}
          >
            El dolor que le quita el sueño. No el síntoma, la raíz.
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
          disabled={!cliente.trim() || !dolorPrincipal.trim()}
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
