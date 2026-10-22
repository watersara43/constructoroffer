"use client";

import { useState } from "react";
import {
  Step,
  Perfil,
  FormData,
  SolucionProblem,
  GeneratedResult,
} from "./types";
import ProgressBar from "./components/ProgressBar";
import StepBienvenida from "./components/StepBienvenida";
import StepPerfil from "./components/StepPerfil";
import StepProducto from "./components/StepProducto";
import StepCliente from "./components/StepCliente";
import StepProblemas from "./components/StepProblemas";
import StepSoluciones from "./components/StepSoluciones";
import StepGenerando from "./components/StepGenerando";
import StepResultado from "./components/StepResultado";

const INITIAL_FORM: FormData = {
  perfil: "closer",
  producto: "",
  transformacion: "",
  cliente: "",
  dolorPrincipal: "",
  problemas: ["", "", "", "", ""],
  soluciones: [],
};

export default function Home() {
  const [step, setStep] = useState<Step>("bienvenida");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateForm = (field: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const goTo = (s: Step) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateOffer = async () => {
    goTo("generando");
    setError(null);

    // Prepare soluciones — filter out empty problemas
    const filledProblemas = form.problemas.filter((p) => p.trim());
    const solucionesCompletas: SolucionProblem[] = filledProblemas.map(
      (problema, i) => ({
        problema,
        solucion: form.soluciones[i]?.solucion || "",
      })
    );

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          perfil: form.perfil,
          producto: form.producto,
          transformacion: form.transformacion,
          cliente: form.cliente,
          dolorPrincipal: form.dolorPrincipal,
          problemas: filledProblemas,
          soluciones: solucionesCompletas,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Error generando la oferta");
      }

      const data: GeneratedResult = await response.json();
      setResult(data);
      goTo("resultado");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error desconocido";
      setError(message);
      goTo("soluciones");
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setResult(null);
    setError(null);
    goTo("bienvenida");
  };

  return (
    <>
      <ProgressBar currentStep={step} />

      {/* Main content */}
      <main
        style={{
          minHeight: "100vh",
          paddingTop: step === "bienvenida" || step === "generando" ? 0 : "80px",
        }}
      >
        {/* Error banner */}
        {error && step === "soluciones" && (
          <div
            style={{
              background: "rgba(200, 80, 80, 0.1)",
              border: "1px solid rgba(200, 80, 80, 0.3)",
              padding: "14px 24px",
              textAlign: "center",
              fontSize: "14px",
              color: "rgba(220, 140, 140, 1)",
              maxWidth: "600px",
              margin: "0 auto 24px",
            }}
          >
            {error} — Por favor inténtalo de nuevo.
          </div>
        )}

        {step === "bienvenida" && (
          <StepBienvenida onNext={() => goTo("perfil")} />
        )}

        {step === "perfil" && (
          <StepPerfil
            value={form.perfil as Perfil}
            onChange={(v) => updateForm("perfil", v)}
            onNext={() => goTo("producto")}
            onBack={() => goTo("bienvenida")}
          />
        )}

        {step === "producto" && (
          <StepProducto
            perfil={form.perfil as Perfil}
            producto={form.producto}
            transformacion={form.transformacion}
            onChange={(field, value) => updateForm(field, value)}
            onNext={() => goTo("cliente")}
            onBack={() => goTo("perfil")}
          />
        )}

        {step === "cliente" && (
          <StepCliente
            cliente={form.cliente}
            dolorPrincipal={form.dolorPrincipal}
            onChange={(field, value) => updateForm(field, value)}
            onNext={() => goTo("problemas")}
            onBack={() => goTo("producto")}
          />
        )}

        {step === "problemas" && (
          <StepProblemas
            problemas={form.problemas}
            onChange={(v) => updateForm("problemas", v)}
            onNext={() => goTo("soluciones")}
            onBack={() => goTo("cliente")}
          />
        )}

        {step === "soluciones" && (
          <StepSoluciones
            problemas={form.problemas}
            soluciones={form.soluciones}
            onChange={(v) => updateForm("soluciones", v)}
            onNext={generateOffer}
            onBack={() => goTo("problemas")}
          />
        )}

        {step === "generando" && <StepGenerando />}

        {step === "resultado" && result && (
          <StepResultado result={result} onReset={reset} />
        )}
      </main>
    </>
  );
}
