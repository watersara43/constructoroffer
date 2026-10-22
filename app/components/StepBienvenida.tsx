"use client";

interface StepBienvenidaProps {
  onNext: () => void;
}

export default function StepBienvenida({ onNext }: StepBienvenidaProps) {
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(121, 99, 155, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "600px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "48px",
            padding: "6px 16px",
            border: "1px solid var(--linea)",
            color: "var(--lila)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            fontWeight: 400,
          }}
        >
          A FONDO · SARA CASTRO
        </div>

        {/* Main headline */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 500,
            lineHeight: 1.05,
            marginBottom: "28px",
            color: "var(--crema)",
            fontStyle: "italic",
          }}
        >
          Constructor<br />
          <span style={{ color: "var(--lila-suave)" }}>de Ofertas</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "var(--tierra-claro)",
            lineHeight: 1.7,
            marginBottom: "52px",
            maxWidth: "480px",
            margin: "0 auto 52px",
            fontWeight: 300,
          }}
        >
          Construye la presentación de tu oferta en 3 pilares,
          conectados con los problemas reales de tu cliente,
          sin memorizar guiones ni dejar de ser tú.
        </p>

        {/* What you'll get */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            marginBottom: "52px",
            textAlign: "left",
          }}
        >
          {[
            {
              icon: "◈",
              title: "3 pilares",
              desc: "Tu oferta estructurada y clara",
            },
            {
              icon: "◉",
              title: "Guión natural",
              desc: "Lo que decir en cada pilar",
            },
            {
              icon: "◎",
              title: "Chuleta",
              desc: "Para tener a mano en la llamada",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px",
                border: "1px solid var(--linea-suave)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  color: "var(--lila)",
                  fontSize: "18px",
                  marginBottom: "8px",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--crema)",
                  marginBottom: "4px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--tierra-claro)",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Time estimate */}
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "32px",
          }}
        >
          ≈ 10 minutos para completarlo
        </p>

        {/* CTA */}
        <button
          onClick={onNext}
          className="btn-primary"
          style={{ width: "100%", maxWidth: "360px", justifyContent: "center" }}
        >
          Empezar
          <span style={{ fontSize: "16px" }}>→</span>
        </button>

        {/* Sara signature */}
        <p
          style={{
            marginTop: "40px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Herramienta gratuita de Sara Castro · A Fondo
        </p>
      </div>
    </div>
  );
}
