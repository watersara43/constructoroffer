"use client";

import { useState, useRef } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────
type SemaforoColor = "verde" | "amarillo1" | "amarillo2" | "rojo" | "gris";

interface CheckResult {
  color: SemaforoColor;
  emoji: string;
  texto: string;
  evidencia: string;
}

interface RadiografiaResult {
  nombre_closer: string;
  checks: Record<string, CheckResult>;
  fortalezas: string[];
  oportunidades: string[];
  plan_accion: string;
  resumen_copiable: string;
}

// ─── CONSTANTES ───────────────────────────────────────────────────────────
const CHECK_LABELS: Record<string, string> = {
  marco: "01 · MARCO",
  estrella_polar: "02 · ESTRELLA POLAR",
  discovery: "03 · DISCOVERY",
  coi: "04 · COI / COSTE DE INACCIÓN",
  temp_check: "05 · TEMP CHECK",
  presentacion: "06 · PRESENTACIÓN",
  tech_check: "07 · TECH CHECK",
  precio_silencio: "08 · PRECIO + SILENCIO",
  objeciones: "09 · OBJECIONES",
  cierre_followup: "10 · CIERRE Y FOLLOW-UP",
};

const SEMAFORO_LABEL: Record<SemaforoColor, string> = {
  verde: "Verde",
  amarillo1: "Amarillo",
  amarillo2: "Amarillo",
  rojo: "Rojo",
  gris: "Gris",
};

const SEMAFORO_BG: Record<SemaforoColor, string> = {
  verde: "bg-green-50 border-green-200",
  amarillo1: "bg-yellow-50 border-yellow-200",
  amarillo2: "bg-yellow-50 border-yellow-200",
  rojo: "bg-red-50 border-red-200",
  gris: "bg-gray-50 border-gray-200",
};

const SEMAFORO_TEXT: Record<SemaforoColor, string> = {
  verde: "text-green-700",
  amarillo1: "text-yellow-700",
  amarillo2: "text-yellow-700",
  rojo: "text-red-700",
  gris: "text-gray-500",
};

// ─── COMPONENTES ──────────────────────────────────────────────────────────
function TranscriptionInput({
  index,
  value,
  onChange,
  onRemove,
  canRemove,
}: {
  index: number;
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-semibold text-gray-700">
          Transcripción {index + 1}
        </label>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Pega aquí la transcripción ${index + 1}...`}
        rows={8}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent font-mono"
      />
      <p className="text-xs text-gray-400 mt-1">
        {value.length.toLocaleString()} caracteres
      </p>
    </div>
  );
}

function CheckCard({ checkKey, result }: { checkKey: string; result: CheckResult }) {
  const [expanded, setExpanded] = useState(false);
  const label = CHECK_LABELS[checkKey];

  return (
    <div className={`border rounded-lg p-4 ${SEMAFORO_BG[result.color]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{result.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-gray-900">{label}</h3>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SEMAFORO_TEXT[result.color]} bg-white border`}
            >
              {SEMAFORO_LABEL[result.color]}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {expanded ? result.texto : result.texto.slice(0, 160) + (result.texto.length > 160 ? "…" : "")}
          </p>
          {result.texto.length > 160 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-gray-500 hover:text-gray-700 mt-1 underline"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          )}
          {result.evidencia && (
            <div className="mt-2 pl-3 border-l-2 border-gray-300">
              <p className="text-xs text-gray-500 italic">
                📌 &ldquo;{result.evidencia}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────
export default function RadiografiaPage() {
  const [transcripciones, setTranscripciones] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RadiografiaResult | null>(null);
  const [copied, setCopied] = useState(false);
  const resumenRef = useRef<HTMLTextAreaElement>(null);

  const updateTranscripcion = (i: number, v: string) => {
    const next = [...transcripciones];
    next[i] = v;
    setTranscripciones(next);
  };

  const addTranscripcion = () => {
    if (transcripciones.length < 3) {
      setTranscripciones([...transcripciones, ""]);
    }
  };

  const removeTranscripcion = (i: number) => {
    setTranscripciones(transcripciones.filter((_, idx) => idx !== i));
  };

  const handleAnalizar = async () => {
    const filled = transcripciones.filter((t) => t.trim().length > 50);
    if (filled.length === 0) {
      setError("Pega al menos una transcripción con contenido suficiente.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/radiografia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcripciones: filled }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al analizar. Inténtalo de nuevo.");
      } else {
        setResult(data as RadiografiaResult);
        // Scroll suave al resultado
        setTimeout(() => {
          document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopiar = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.resumen_copiable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select textarea
      resumenRef.current?.select();
    }
  };

  const handleNuevoAnalisis = () => {
    setResult(null);
    setTranscripciones(["", ""]);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalChars = transcripciones.reduce((s, t) => s + t.length, 0);
  const filled = transcripciones.filter((t) => t.trim().length > 50);

  return (
    <div className="min-h-screen bg-[#f9f7f4]">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
              KIT A FONDO · Herramienta 1
            </p>
            <h1 className="text-lg font-bold tracking-tight">
              Radiografía de llamadas
            </h1>
          </div>
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Volver
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {!result ? (
          <>
            {/* Intro */}
            <div className="mb-8">
              <p className="text-gray-600 text-sm leading-relaxed">
                Pega 1, 2 o 3 transcripciones de llamadas comerciales. La IA detecta
                automáticamente los roles, evalúa los{" "}
                <strong>10 checks A Fondo</strong> y te da un semáforo + feedback
                para cada uno.
              </p>
            </div>

            {/* Inputs */}
            {transcripciones.map((t, i) => (
              <TranscriptionInput
                key={i}
                index={i}
                value={t}
                onChange={(v) => updateTranscripcion(i, v)}
                onRemove={() => removeTranscripcion(i)}
                canRemove={transcripciones.length > 1}
              />
            ))}

            {transcripciones.length < 3 && (
              <button
                onClick={addTranscripcion}
                className="mb-6 text-sm text-gray-500 hover:text-gray-800 border border-dashed border-gray-300 rounded-lg px-4 py-2 w-full transition-colors"
              >
                + Añadir transcripción ({transcripciones.length}/3)
              </button>
            )}

            {/* Stats */}
            <div className="text-xs text-gray-400 mb-4">
              {filled.length} transcripción{filled.length !== 1 ? "es" : ""} lista
              {filled.length !== 1 ? "s" : ""} · {totalChars.toLocaleString()} caracteres totales
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalizar}
              disabled={loading || filled.length === 0}
              className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analizando llamada…
                </span>
              ) : (
                "Analizar llamada →"
              )}
            </button>

            {loading && (
              <p className="text-center text-xs text-gray-400 mt-3">
                Esto puede tardar 15–30 segundos dependiendo de la longitud.
              </p>
            )}
          </>
        ) : (
          <div id="resultado">
            {/* Header resultado */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  📋 Radiografía
                  {result.nombre_closer && (
                    <span className="text-gray-500 font-normal text-base ml-2">
                      · {result.nombre_closer}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filled.length} transcripción{filled.length !== 1 ? "es" : ""} analizadas
                </p>
              </div>
              <button
                onClick={handleNuevoAnalisis}
                className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
              >
                Nuevo análisis
              </button>
            </div>

            {/* Grid semáforos */}
            <section className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Los 10 checks
              </h3>
              <div className="grid gap-3">
                {Object.entries(CHECK_LABELS).map(([key]) => (
                  <CheckCard key={key} checkKey={key} result={result.checks[key]} />
                ))}
              </div>
            </section>

            {/* Fortalezas + Oportunidades */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
                  ✅ Fortalezas
                </h3>
                <ul className="space-y-2">
                  {result.fortalezas.map((f, i) => (
                    <li key={i} className="text-sm text-green-900 flex gap-2">
                      <span className="text-green-500 flex-shrink-0">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
                  📌 Oportunidades
                </h3>
                <ul className="space-y-2">
                  {result.oportunidades.map((o, i) => (
                    <li key={i} className="text-sm text-amber-900 flex gap-2">
                      <span className="text-amber-500 flex-shrink-0">•</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Plan de acción */}
            <section className="mb-8 bg-[#1a1a1a] text-white rounded-lg p-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                🎯 Plan para tus próximas 3 llamadas
              </h3>
              <p className="text-sm leading-relaxed">{result.plan_accion}</p>
            </section>

            {/* Resumen copiable */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Resumen copiable
                </h3>
                <button
                  onClick={handleCopiar}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    copied
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {copied ? "✓ Copiado" : "Copiar todo"}
                </button>
              </div>
              <textarea
                ref={resumenRef}
                readOnly
                value={result.resumen_copiable}
                rows={12}
                className="w-full px-3 py-3 text-xs font-mono text-gray-700 bg-white border border-gray-200 rounded-lg resize-y focus:outline-none"
              />
            </section>

            {/* CTA */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                onClick={handleNuevoAnalisis}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ← Analizar otra llamada
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
