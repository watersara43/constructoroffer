"use client";

import { useState } from "react";
import { GeneratedResult, Pilar } from "../types";

interface StepResultadoProps {
  result: GeneratedResult;
  onReset: () => void;
}

function PilarCard({
  pilar,
  index,
}: {
  pilar: Pilar;
  index: number;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const romanNumerals = ["I", "II", "III"];

  return (
    <div className="pilar-card animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Pilar header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "var(--lila)",
            marginBottom: "8px",
            fontWeight: 400,
          }}
        >
          PILAR {romanNumerals[index]}
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--crema)",
            lineHeight: 1.2,
          }}
        >
          {pilar.nombre}
        </h3>
      </div>

      {/* Problems connected */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--tierra-claro)",
            marginBottom: "8px",
          }}
        >
          PROBLEMAS QUE RESUELVE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {pilar.problemasConectados.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <span style={{ color: "var(--lila)", flexShrink: 0, marginTop: "2px" }}>
                ·
              </span>
              <span style={{ fontSize: "14px", color: "var(--arena)", lineHeight: 1.5 }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ height: "1px", background: "var(--linea)", margin: "20px 0" }}
      />

      {/* Solution */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--tierra-claro)",
            marginBottom: "8px",
          }}
        >
          CÓMO LO RESUELVES
        </div>
        <p style={{ fontSize: "15px", color: "var(--crema)", lineHeight: 1.6 }}>
          {pilar.solucion}
        </p>
      </div>

      {/* Benefit */}
      <div
        style={{
          background: "rgba(121, 99, 155, 0.08)",
          border: "1px solid rgba(121, 99, 155, 0.2)",
          padding: "16px 20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--lila-suave)",
            marginBottom: "6px",
          }}
        >
          BENEFICIO CONCRETO
        </div>
        <p style={{ fontSize: "14px", color: "var(--arena)", lineHeight: 1.6 }}>
          {pilar.beneficio}
        </p>
      </div>

      {/* Expandable: Guión */}
      <div style={{ marginBottom: "12px" }}>
        <button
          onClick={() => toggle("guion")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "transparent",
            border: "1px solid var(--linea)",
            padding: "12px 16px",
            cursor: "pointer",
            color: "var(--arena)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
          }}
        >
          <span>FRAGMENTO DE GUIÓN</span>
          <span style={{ color: "var(--lila)", fontSize: "14px" }}>
            {expandedSection === "guion" ? "−" : "+"}
          </span>
        </button>
        {expandedSection === "guion" && (
          <div
            style={{
              border: "1px solid var(--linea)",
              borderTop: "none",
              padding: "16px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "var(--crema)",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "12px",
              }}
            >
              &quot;{pilar.guionLlamada}&quot;
            </p>
            <button
              onClick={() => copyText(pilar.guionLlamada, `guion-${index}`)}
              style={{
                background: "transparent",
                border: "1px solid var(--linea)",
                color:
                  copied === `guion-${index}`
                    ? "var(--lila)"
                    : "var(--tierra-claro)",
                padding: "6px 14px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {copied === `guion-${index}` ? "✓ Copiado" : "Copiar guión"}
            </button>
          </div>
        )}
      </div>

      {/* Expandable: Termómetro */}
      <div>
        <button
          onClick={() => toggle("termometro")}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "transparent",
            border: "1px solid var(--linea)",
            padding: "12px 16px",
            cursor: "pointer",
            color: "var(--arena)",
            fontSize: "12px",
            letterSpacing: "0.08em",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 400,
          }}
        >
          <span>TERMÓMETRO EMOCIONAL</span>
          <span style={{ color: "var(--lila)", fontSize: "14px" }}>
            {expandedSection === "termometro" ? "−" : "+"}
          </span>
        </button>
        {expandedSection === "termometro" && (
          <div
            style={{
              border: "1px solid var(--linea)",
              borderTop: "none",
              padding: "16px",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "var(--tierra-claro)",
                  marginBottom: "6px",
                }}
              >
                PREGUNTA DE DIAGNÓSTICO
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--crema)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                &quot;{pilar.termometro.pregunta}&quot;
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div
                style={{
                  padding: "12px",
                  background: "rgba(61, 220, 132, 0.06)",
                  border: "1px solid rgba(61, 220, 132, 0.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(61, 220, 132, 0.7)",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}
                >
                  🔥 RESPUESTA CALIENTE
                </div>
                <p style={{ fontSize: "12px", color: "var(--arena)", lineHeight: 1.5 }}>
                  {pilar.termometro.respuestaCaliente}
                </p>
              </div>
              <div
                style={{
                  padding: "12px",
                  background: "rgba(128, 106, 88, 0.08)",
                  border: "1px solid rgba(128, 106, 88, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(128, 106, 88, 0.8)",
                    letterSpacing: "0.1em",
                    marginBottom: "6px",
                  }}
                >
                  ❄️ RESPUESTA FRÍA
                </div>
                <p style={{ fontSize: "12px", color: "var(--arena)", lineHeight: 1.5 }}>
                  {pilar.termometro.respuestaFria}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StepResultado({ result, onReset }: StepResultadoProps) {
  const [showChuleta, setShowChuleta] = useState(false);
  const [copiedChuleta, setCopiedChuleta] = useState(false);

  const copyChuleta = () => {
    navigator.clipboard.writeText(result.chuletaLlamada).then(() => {
      setCopiedChuleta(true);
      setTimeout(() => setCopiedChuleta(false), 2500);
    });
  };

  const printPDF = () => {
    window.print();
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "720px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "48px" }} className="animate-reveal">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "rgba(121, 99, 155, 0.1)",
            border: "1px solid var(--linea)",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "var(--lila)", fontSize: "12px" }}>◈</span>
          <span
            style={{
              fontSize: "11px",
              color: "var(--lila-suave)",
              letterSpacing: "0.1em",
            }}
          >
            TU OFERTA ESTÁ LISTA
          </span>
        </div>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--crema)",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Tus 3 pilares
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tierra-claro)",
            lineHeight: 1.6,
            maxWidth: "520px",
          }}
        >
          Revisa cada pilar, expande el guión y el termómetro cuando quieras.
          Descarga el PDF o copia la chuleta para tenerlo a mano en llamada.
        </p>

        {/* Action buttons */}
        <div
          className="no-print"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setShowChuleta(!showChuleta)}
            style={{
              background: "transparent",
              border: "1px solid var(--lila)",
              color: "var(--lila-suave)",
              padding: "10px 20px",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {showChuleta ? "Ocultar" : "Ver"} chuleta de llamada
          </button>
          <button
            onClick={printPDF}
            style={{
              background: "transparent",
              border: "1px solid var(--linea)",
              color: "var(--tierra-claro)",
              padding: "10px 20px",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ↓ Descargar PDF
          </button>
        </div>
      </div>

      {/* Chuleta de llamada */}
      {showChuleta && (
        <div
          className="animate-reveal"
          style={{
            background: "var(--negro-medio)",
            border: "1px solid var(--lila)",
            padding: "28px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "var(--lila)",
              }}
            >
              CHULETA DE LLAMADA
            </div>
            <button
              onClick={copyChuleta}
              style={{
                background: "transparent",
                border: "1px solid var(--linea)",
                color: copiedChuleta ? "var(--lila)" : "var(--tierra-claro)",
                padding: "6px 14px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {copiedChuleta ? "✓ Copiado" : "Copiar"}
            </button>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--arena)",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
            }}
          >
            {result.chuletaLlamada}
          </p>
        </div>
      )}

      {/* Pilares */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "56px" }}>
        {result.pilares.map((pilar, index) => (
          <PilarCard key={index} pilar={pilar} index={index} />
        ))}
      </div>

      {/* CTA section */}
      <div
        className="no-print animate-reveal delay-300"
        style={{
          background: "var(--negro-suave)",
          border: "1px solid var(--linea)",
          padding: "40px 36px",
          textAlign: "center",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(121, 99, 155, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              border: "1px solid var(--linea)",
              marginBottom: "20px",
              fontSize: "11px",
              color: "var(--lila)",
              letterSpacing: "0.1em",
            }}
          >
            AUDITORÍA GRATUITA · 30 MIN
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--crema)",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            ¿Quieres que revisemos<br />
            tu oferta juntos?
          </h3>

          <p
            style={{
              fontSize: "15px",
              color: "var(--tierra-claro)",
              lineHeight: 1.7,
              maxWidth: "440px",
              margin: "0 auto 28px",
            }}
          >
            En 30 minutos te digo exactamente qué está fallando en tus llamadas
            y cómo aplicar esta oferta para cerrar más — sin cambiar cómo eres.
          </p>

          <a
            href="https://cal.com/saracastro/entrevista-con-sara-castro"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: "inline-flex",
              textDecoration: "none",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
            Reservar mi auditoría gratuita
            <span>→</span>
          </a>

          <p
            style={{
              marginTop: "16px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Sin coste · Sin compromiso · Con Sara Castro
          </p>
        </div>
      </div>

      {/* Start over */}
      <div className="no-print" style={{ textAlign: "center" }}>
        <button
          onClick={onReset}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.2)",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Empezar de nuevo con otra oferta
        </button>
      </div>
    </div>
  );
}
