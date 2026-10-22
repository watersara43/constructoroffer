import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface FormData {
  perfil: "closer" | "emprendedor";
  producto: string;
  transformacion: string;
  cliente: string;
  dolorPrincipal: string;
  problemas: string[];
  soluciones: { problema: string; solucion: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    const {
      perfil,
      producto,
      transformacion,
      cliente,
      dolorPrincipal,
      problemas,
      soluciones,
    } = data;

    const perfilLabel =
      perfil === "closer"
        ? "closer/comercial que vende servicios de otros"
        : "emprendedor/a que vende sus propios servicios";

    const problemasFormateados = problemas
      .map((p, i) => `${i + 1}. ${p}`)
      .join("\n");

    const solucionesFormateadas = soluciones
      .map(
        (s, i) =>
          `Problema ${i + 1}: "${s.problema}"\nSolución: "${s.solucion}"`
      )
      .join("\n\n");

    const prompt = `Eres un experto en construcción de ofertas y presentaciones de ventas consultivas.
Tu misión: construir una presentación de oferta en 3 pilares sólidos, conectados con los problemas reales del cliente, basada en la metodología A Fondo de Sara Castro.

DATOS DEL USUARIO:
- Perfil: ${perfilLabel}
- Producto/Servicio: ${producto}
- Transformación que ofrece: ${transformacion}
- Cliente potencial: ${cliente}
- Dolor principal del cliente: ${dolorPrincipal}

PROBLEMAS QUE TIENE EL CLIENTE (escritos por el usuario):
${problemasFormateados}

CONEXIONES PROBLEMA-SOLUCIÓN:
${solucionesFormateadas}

INSTRUCCIONES:
Construye exactamente 3 pilares de la oferta. Cada pilar debe:
1. Tener un nombre memorable (2-5 palabras, sin usar números ni "pilar X")
2. Agrupar 1-2 de los problemas listados de forma natural
3. Mostrar cómo la solución resuelve esos problemas
4. Incluir el beneficio concreto que obtiene el cliente
5. Incluir un fragmento de guión de llamada (máximo 3-4 frases naturales, en primera persona, sin sonar a vendedor)
6. Incluir un termómetro emocional: pregunta de diagnóstico para medir dónde está el cliente + 2 alternativas de respuesta que muestren temperatura

Al final, añade una "Chuleta de Llamada": un resumen ultra-compacto de los 3 pilares para tener a mano durante la llamada (máximo 3 líneas por pilar).

FORMATO DE RESPUESTA (JSON estricto, sin markdown, sin texto extra):
{
  "pilares": [
    {
      "nombre": "Nombre del pilar",
      "problemasConectados": ["problema 1", "problema 2"],
      "solucion": "Cómo lo resuelve tu servicio/producto",
      "beneficio": "Qué consigue el cliente exactamente",
      "guionLlamada": "Fragmento natural de lo que dirías en llamada",
      "termometro": {
        "pregunta": "Pregunta de diagnóstico",
        "respuestaCaliente": "Respuesta que indica que está listo para comprar",
        "respuestaFria": "Respuesta que indica que necesita más trabajo previo"
      }
    }
  ],
  "chuletaLlamada": "Resumen ultra-compacto de los 3 pilares para usar durante la llamada"
}`;

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse JSON response
    let result;
    try {
      // Clean potential markdown code blocks
      const cleaned = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      result = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Error procesando la respuesta. Inténtalo de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating offer:", error);
    return NextResponse.json(
      { error: "Error generando la oferta. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
