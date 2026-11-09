import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── TEXTOS PREDISEÑADOS ───────────────────────────────────────────────────
// 5 variantes por check: verde, amarillo1, rojo, gris, amarillo2
const TEXTOS: Record<string, Record<string, string>> = {
  marco: {
    verde: "Arrancaste muy bien. Desde el primer minuto dejaste claro para qué era la llamada, tomaste las riendas sin forzar y te posicionaste con criterio — no como alguien que necesita cerrar, sino como alguien que evalúa si puede ayudar. Eso marca el tono de todo lo que viene después. Sigue así.",
    amarillo1: "El marco estaba, pero no del todo sólido. Explicaste el propósito de la llamada, sí, pero en algún momento cediste el liderazgo — dejaste que el lead tomara el control antes de que establecieras tu posición. Para la próxima: antes de entrar en preguntas, confirma el propósito, el tiempo y deja claro que tú también estás evaluando si tiene sentido seguir. Eso cambia cómo te perciben.",
    rojo: "La llamada empezó sin marco real. Fuiste directo a preguntar o a presentar sin establecer primero el propósito, tu posición ni las reglas de la conversación. Cuando eso no existe, el lead lidera y tú respondes. Para la próxima prueba esto: «Antes de empezar, te cuento cómo suelo llevar esta conversación y para qué nos sirve a los dos. ¿Te parece?» Dos frases. Cambia todo.",
    gris: "La transcripción empieza en medio de la conversación, así que no puedo evaluar cómo arrancó. Si tienes la parte inicial, mándala — el marco es uno de los momentos más importantes de la llamada y vale la pena revisarlo.",
    amarillo2: "Se nota que tienes recursos para liderar, pero en la apertura hubo algún momento en que justificaste demasiado — te explicaste más de lo necesario, como queriendo ganarte el derecho a estar ahí. No lo necesitas. La próxima vez, menos explicación y más presencia. Quien lidera no convence de que puede liderar — simplemente lo hace.",
  },
  estrella_polar: {
    verde: "Encontraste su Estrella Polar de verdad — no te quedaste con lo superficial. Conseguiste que el lead verbalizara no solo qué quiere, sino qué significa para él conseguirlo. Y lo mejor: lo recuperaste después, cuando importaba. Eso es lo que hace que una presentación conecte de verdad.",
    amarillo1: "Preguntaste por su objetivo, sí, pero te quedaste en la superficie. Sabes qué quiere, pero no qué significa para él conseguirlo. Para la próxima, cuando te diga su objetivo, ve un paso más allá: «¿Y qué cambiaría para ti si eso estuviera resuelto?» Una pregunta. Ahí está la Estrella Polar de verdad.",
    rojo: "No llegaste a encontrar su Estrella Polar. La conversación fue sobre problemas y soluciones, pero en ningún momento supiste qué quiere conseguir realmente ni qué significado tiene para él. Para la próxima: antes de entrar en problemas, pregunta «¿Qué quieres que sea diferente en seis meses?» y no te muevas de ahí hasta tener algo concreto y personal.",
    gris: "La transcripción no tiene suficiente discovery para evaluar si encontraste la Estrella Polar o no. Puede que la llamada fuera parcial o que esta parte no quedara recogida. Si tienes más contexto, mándalo — es uno de los momentos más importantes para revisar.",
    amarillo2: "Conseguiste que el lead te dijera lo que quiere de verdad — eso no es fácil y lo hiciste bien. Pero después no lo recuperaste. En la presentación hablaste de tu solución sin conectarla con su Estrella Polar. La próxima vez, cuando presentes, vuelve ahí: «Me comentabas que lo que quieres es… por eso este pilar existe.»",
  },
  discovery: {
    verde: "El discovery fue sólido. Pasaste por las cinco fases sin que pareciera un interrogatorio — el lead habló, tú escuchaste y profundizaste donde importaba. Se nota que no ibas con prisa por llegar a la presentación. Con eso, cualquier presentación tiene base real.",
    amarillo1: "Hiciste preguntas, escuchaste y recogiste información — eso está bien. Pero el discovery se quedó en la superficie en algún punto. Pasaste a la siguiente pregunta cuando el lead te dio algo importante, sin quedarte a profundizar. Recuerda: cuando algo le duele, le frustra o le preocupa, no pases. Quédate ahí. «¿Y qué es lo que más te pesa de llevar así tanto tiempo?»",
    rojo: "El discovery fue demasiado corto o superficial. Recogiste datos pero no diagnóstico real — sabes qué le pasa, pero no cuánto le pesa ni por qué ahora. Para la próxima: no pases a presentar hasta que el lead haya verbalizado las consecuencias de seguir igual con sus propias palabras. «¿Y qué supone para ti que esto siga así?»",
    gris: "La transcripción no recoge suficiente discovery para evaluarlo. Si la llamada fue parcial o empezó después de esta fase, es normal. Manda la parte completa si la tienes — el discovery es donde se gana o se pierde la llamada antes de presentar nada.",
    amarillo2: "Las preguntas que hiciste eran buenas — pertinentes, en orden, sin saltar. El problema fue el ratio: hablaste demasiado tú. En un buen discovery el lead habla el 70% del tiempo y tú el 30. Cuando sientas que estás explicando demasiado, para y devuelve la pelota: «¿Cómo te encaja eso con lo que me estás contando?»",
  },
  coi: {
    verde: "Trabajaste el COI de verdad. No lo forzaste ni dramatizaste — dejaste que el lead verbalizara con sus propias palabras lo que le cuesta seguir igual. Eso es lo más difícil: que sea él quien lo diga, no tú quien se lo recuerdes. Cuando llegó el precio, había contexto real detrás. Eso marca la diferencia.",
    amarillo1: "Tocaste el COI pero no profundizaste lo suficiente. El lead te dio una pista de lo que le cuesta seguir igual y tú seguiste adelante. Ahí estaba la oportunidad. Cuando alguien te dice que lleva tiempo con este problema — para. Pregunta: «¿Y qué supone para ti que esto siga así seis meses más?» No para asustarle. Para que él mismo entienda por qué ahora importa.",
    rojo: "El COI no apareció en la llamada. Pasaste del problema a la solución sin que el lead verbalizara qué le cuesta seguir igual. Sin eso, el precio siempre va a parecer un esfuerzo — porque no hay nada con lo que compararlo. Para la próxima: antes de presentar, necesitas que el lead haya dicho, con sus palabras, qué pierde cada mes que pasa sin resolver esto.",
    gris: "No hay suficiente información en la transcripción para evaluar si trabajaste el coste de inacción. Si tienes más contexto, mándalo — el COI es uno de los momentos que más peso tiene cuando llega la conversación sobre la inversión.",
    amarillo2: "Intentaste trabajar el COI, pero lo hiciste tú — le explicaste las consecuencias en lugar de preguntarle a él. Y cuando lo dices tú, el lead lo escucha. Cuando lo dice él, lo siente. La diferencia es enorme. La próxima vez: «¿Qué crees tú que pasa si esto sigue igual?» Y espera.",
  },
  temp_check: {
    verde: "Hiciste el temp check antes de presentar y, lo más importante, escuchaste la respuesta de verdad. No lo usaste como trámite para seguir adelante — te importó lo que dijo. Eso marca la diferencia entre una presentación que conecta y una que se lanza al vacío. Muy bien.",
    amarillo1: "Hiciste una comprobación antes de presentar, pero fue rápida — una pregunta de confirmación a la que el lead dijo que sí y seguiste. El temp check no es un trámite. Si responde con dudas o de forma vaga, ahí está la señal de que falta trabajo antes de presentar. La próxima vez, cuando pregunte, escucha de verdad la respuesta antes de continuar.",
    rojo: "No hiciste temp check antes de presentar. Fuiste directo a la solución sin verificar que el lead estaba listo para escucharla. Para la próxima: antes de presentar, para un momento y pregunta algo como «¿Sientes que esto es algo que necesitas resolver ahora o todavía estás valorando si es el momento?» Y escucha de verdad lo que te dice.",
    gris: "La transcripción no recoge el momento de transición entre el discovery y la presentación, así que no puedo evaluar si hiciste temp check o no. Si tienes esa parte, mándala — es un momento bisagra en la llamada que vale la pena revisar.",
    amarillo2: "Preguntaste antes de presentar — eso está bien. Pero cuando el lead respondió, no te detuviste a escuchar de verdad. El temp check no termina cuando tú preguntas. Termina cuando tú escuchas y decides si tiene sentido seguir adelante o si hay algo que trabajar antes.",
  },
  presentacion: {
    verde: "La presentación estuvo conectada con lo que el lead te había contado. Hiciste recap antes de entrar, los pilares respondían a sus problemas reales y fuiste adaptando según sus respuestas — no recitaste un guión. Se nota cuando alguien presenta lo que el lead necesita escuchar en lugar de lo que tiene preparado. Así es como se hace.",
    amarillo1: "Presentaste bien, pero de forma algo lineal — un pilar detrás de otro sin verificar que el lead iba contigo. Los checks entre pilares existen para eso. La próxima vez, después de cada pilar para un momento: «¿Cómo te encaja esta parte con lo que me comentabas?» No para buscar un sí — para saber si tiene sentido continuar.",
    rojo: "La presentación fue genérica — no conectó con lo que el lead te había contado en el discovery. Presentaste tu solución, no su solución. Para que una presentación funcione necesita empezar con un recap de sus problemas reales. Sin esa conexión, el lead escucha y compara precio — no valor.",
    gris: "La transcripción no recoge la presentación completa o la llamada terminó antes de llegar a ella. Sin esa parte no puedo evaluar cómo conectaste la solución con el diagnóstico. Si tienes la transcripción completa, mándala.",
    amarillo2: "Los pilares estaban bien construidos y se notaba que conoces tu oferta. Pero entraste a presentar sin hacer recap de lo que el lead te había contado. Ese puente es el recap: «Después de lo que me has contado, lo que veo es… ¿lo estoy entendiendo bien?» Dos frases que cambian cómo se recibe todo lo que viene después.",
  },
  tech_check: {
    verde: "Antes de hablar de precio verificaste que el lead tenía claro qué incluía la solución, si encajaba con lo que necesitaba y si había algo que no le cuadrara. Cuando llegó el precio, el lead ya había confirmado que la solución era para él. Eso cambia completamente cómo se recibe la inversión.",
    amarillo1: "Hiciste alguna verificación antes del precio, pero fue rápida. El tech check va más allá de «¿tienes dudas?» — es asegurarte de que el lead ve claro cómo funciona y que quien está en la llamada puede tomar la decisión. Para la próxima: «¿Ves cómo esto responde a lo que me contabas? ¿Hay algo que necesites tener más claro antes de que hablemos de la inversión?»",
    rojo: "Fuiste directo al precio sin verificar antes que el lead tenía claro qué estaba comprando o si podía decidir solo. Cuando eso pasa, el precio llega sin base. Para la próxima: entre la presentación y el precio necesitas una parada. «¿Cómo lo ves hasta aquí? ¿Hay algo que necesites tener más claro antes de que hablemos de números?»",
    gris: "La llamada no llegó a la fase de inversión o la transcripción no recoge esa transición. No puedo evaluar si hiciste tech check o no. Si tienes esa parte, mándala — especialmente si las objeciones sobre precio son algo que quieres trabajar.",
    amarillo2: "Verificaste que el lead entendía la solución y no tenía dudas técnicas — bien. Pero no exploraste si era él solo quien tomaba la decisión. Y eso apareció después. Ese dato había que sacarlo antes: «¿Esta es una decisión que tomas tú o hay alguien más que necesita estar en la conversación?»",
  },
  precio_silencio: {
    verde: "Dijiste el precio con claridad y te quedaste en silencio. Sin justificarte, sin añadir más de lo necesario, sin correr a llenar el espacio. Cuando el precio se dice así, el lead lo recibe como algo natural, no como algo que defender. Muy bien.",
    amarillo1: "Dijiste el precio, pero añadiste demasiado justo después — antes de que el lead tuviera tiempo de procesar. Cuando justificas el precio antes de que nadie te lo haya cuestionado, el lead empieza a preguntarse si hay algo que justificar. Para la próxima: di el precio, cierra la frase y espera. Aunque el silencio se sienta largo, no lo llenes tú.",
    rojo: "El precio llegó con demasiada explicación alrededor. Cuando el precio necesita ser defendido antes de que nadie lo cuestione, deja de ser un dato y se convierte en un problema. Para la próxima: «La inversión es X.» Punto. Lo que venga después lo gestiones según lo que diga el lead — no antes.",
    gris: "La llamada no llegó a la conversación sobre inversión o esa parte no quedó recogida en la transcripción. No puedo evaluar cómo comunicaste el precio. Si tienes esa parte, mándala — es uno de los momentos más reveladores de una llamada.",
    amarillo2: "Dijiste el precio bien — directo, sin rodeos. Pero inmediatamente después preguntaste «¿qué te parece?» sin dejar que el silencio hiciera su trabajo. La próxima vez, di el precio y espera. Lo que él diga primero te dirá exactamente por dónde ir.",
  },
  objeciones: {
    verde: "Cuando llegó la objeción no te lanzaste a responderla — primero preguntaste para entenderla de verdad. Aislaste, exploraste el fondo y solo entonces reencuadraste. El lead sintió que le escuchabas, no que le rebatías. Esa diferencia es la que separa una conversación de un argumentario.",
    amarillo1: "Gestionaste la objeción, pero fuiste a responderla antes de entenderla del todo. «Necesito pensarlo» o «es mucho dinero» no es la objeción real — es la superficie. Para la próxima, antes de responder cualquier objeción pregunta: «Cuando me dices eso, ¿qué es lo que más te pesa — el momento, el dinero en sí o no tener claro si esto es para ti?» Primero entiende. Después responde.",
    rojo: "Cuando llegó la objeción la respondiste directamente, sin explorarla. Para la próxima: nunca des por resuelta una objeción solo porque el lead asintió. Primero aisla: «¿Es solo eso lo que te frena o hay algo más?» Después profundiza: «¿Y qué necesitarías tener claro para sentirte seguro/a?» Solo entonces reencuadra. En ese orden.",
    gris: "En esta llamada no aparecieron objeciones claras — o no llegasteis a esa parte. Eso no es ni bueno ni malo: a veces el lead no tiene objeciones, a veces no llegó el momento. No penalizo algo que no ocurrió.",
    amarillo2: "Hiciste bien en no responder de inmediato — aislaste la objeción y preguntaste si había algo más. Pero cuando el lead confirmó que era solo eso, fuiste directo al reframe sin explorar el fondo. «Es un esfuerzo económico» puede significar cosas muy distintas. Para la próxima: después de aislar, profundiza una vez más: «¿Es el momento, el importe en sí o necesitas estar más seguro/a de que te va a compensar?»",
  },
  cierre_followup: {
    verde: "Cerraste con claridad — sin presionar, sin perseguir, pero sin desaparecer tampoco. El lead supo exactamente qué pasaba después y tú dejaste la puerta abierta desde un lugar de criterio, no de necesidad. Eso es un cierre bien hecho aunque no haya venta ese día.",
    amarillo1: "Hubo cierre, pero los siguientes pasos quedaron vagos. «Te mando info» o «hablamos cuando puedas» no es un siguiente paso — es una puerta que se cierra sola. Para la próxima: antes de terminar la llamada, concreta. Fecha, formato y qué va a pasar. Y conéctalo con algo que él te dijo: «Me comentabas que en diciembre tenías más claridad — ¿quedamos el día X para retomarlo?»",
    rojo: "La llamada terminó sin cierre real ni siguientes pasos concretos. El lead se fue sin saber qué pasaba después. Cuando eso ocurre, el seguimiento siempre parece persecución. Para la próxima: aunque el lead no esté listo para decidir, antes de colgar necesitas un siguiente paso acordado entre los dos. «¿Cuándo crees que tendrás más claridad? ¿Te parece que hablamos el día X?»",
    gris: "La transcripción no recoge el final de la llamada o terminó antes de llegar al cierre. No puedo evaluar cómo gestionaste ese momento. Si tienes esa parte, mándala — el cierre y el follow-up son donde se consolida o se pierde todo lo que construiste antes.",
    amarillo2: "Respetaste la decisión del lead cuando dijo que no estaba listo — eso está bien y no es fácil hacerlo desde un lugar tranquilo. Pero ahí se acabó la conversación, sin un siguiente paso real. Respetar un no no significa desaparecer. «¿Qué tendría que estar resuelto para que tuvieras más claridad?» y «¿Te parece que lo retomamos en X fecha?» Así cierras con criterio y sin perseguir.",
  },
};

// ─── SCHEMA ───────────────────────────────────────────────────────────────
type SemaforoColor = "verde" | "amarillo1" | "amarillo2" | "rojo" | "gris";

const radiografiaSchema: Anthropic.Tool = {
  name: "analizar_llamada",
  description: "Analiza transcripciones de llamadas comerciales según los 10 checks A Fondo",
  input_schema: {
    type: "object" as const,
    properties: {
      checks: {
        type: "object",
        properties: {
          marco: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          estrella_polar: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          discovery: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          coi: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          temp_check: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          presentacion: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          tech_check: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          precio_silencio: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          objeciones: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
          cierre_followup: { type: "string", enum: ["verde", "amarillo1", "amarillo2", "rojo", "gris"] },
        },
        required: ["marco", "estrella_polar", "discovery", "coi", "temp_check", "presentacion", "tech_check", "precio_silencio", "objeciones", "cierre_followup"],
      },
      evidencias: {
        type: "object",
        description: "Fragmento literal de la transcripción que justifica cada semáforo",
        properties: {
          marco: { type: "string" },
          estrella_polar: { type: "string" },
          discovery: { type: "string" },
          coi: { type: "string" },
          temp_check: { type: "string" },
          presentacion: { type: "string" },
          tech_check: { type: "string" },
          precio_silencio: { type: "string" },
          objeciones: { type: "string" },
          cierre_followup: { type: "string" },
        },
        required: ["marco", "estrella_polar", "discovery", "coi", "temp_check", "presentacion", "tech_check", "precio_silencio", "objeciones", "cierre_followup"],
      },
      fortalezas: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 3,
        description: "Máximo 3 fortalezas observadas con evidencia",
      },
      oportunidades: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 3,
        description: "Máximo 3 oportunidades de mejora concretas",
      },
      plan_accion: {
        type: "string",
        description: "Qué practicar en las próximas 3 llamadas, en 2-3 frases",
      },
      nombre_closer: {
        type: "string",
        description: "Nombre del closer detectado en la transcripción, o vacío si no se identifica",
      },
    },
    required: ["checks", "evidencias", "fortalezas", "oportunidades", "plan_accion", "nombre_closer"],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────
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

const EMOJI: Record<SemaforoColor, string> = {
  verde: "🟢",
  amarillo1: "🟡",
  amarillo2: "🟡",
  rojo: "🔴",
  gris: "⚪",
};

function buildResumen(result: {
  nombre_closer: string;
  checks: Record<string, SemaforoColor>;
  evidencias: Record<string, string>;
  fortalezas: string[];
  oportunidades: string[];
  plan_accion: string;
}): string {
  const nombre = result.nombre_closer ? `${result.nombre_closer}, ` : "";
  let txt = `📋 RADIOGRAFÍA A FONDO\n`;
  if (nombre) txt += `${nombre}aquí tienes tu análisis:\n\n`;

  for (const [key, label] of Object.entries(CHECK_LABELS)) {
    const color = result.checks[key] as SemaforoColor;
    const emoji = EMOJI[color];
    const feedback = TEXTOS[key][color];
    const evidencia = result.evidencias[key];
    txt += `${emoji} ${label}\n${feedback}\n`;
    if (evidencia && color !== "gris") txt += `📌 Evidencia: "${evidencia}"\n`;
    txt += "\n";
  }

  txt += `✅ FORTALEZAS\n`;
  result.fortalezas.forEach((f) => { txt += `• ${f}\n`; });
  txt += `\n📌 OPORTUNIDADES\n`;
  result.oportunidades.forEach((o) => { txt += `• ${o}\n`; });
  txt += `\n🎯 PLAN PARA TUS PRÓXIMAS 3 LLAMADAS\n${result.plan_accion}`;

  return txt;
}

// ─── HANDLER ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { transcripciones } = await request.json() as { transcripciones: string[] };

    if (!transcripciones || transcripciones.length < 1) {
      return NextResponse.json({ error: "Necesitas al menos una transcripción." }, { status: 400 });
    }
    if (transcripciones.length > 3) {
      return NextResponse.json({ error: "Máximo 3 transcripciones a la vez." }, { status: 400 });
    }

    const totalChars = transcripciones.reduce((s, t) => s + t.length, 0);
    if (totalChars > 80000) {
      return NextResponse.json({ error: "Las transcripciones son demasiado largas. Reduce el texto e inténtalo de nuevo." }, { status: 400 });
    }

    const prompt = `Eres un analista experto en ventas consultivas formado en la metodología A Fondo de Sara Castro.
Tu única tarea: evaluar las siguientes transcripciones de llamadas comerciales según los 10 checks A Fondo.

REGLAS DE EVALUACIÓN:
- Evalúa únicamente lo que está en la transcripción. No inventes, no inferas lo que no está escrito.
- Si un check no es observable (llamada parcial, parte ausente, no hubo objeciones), asigna "gris".
- Para cada check elige la variante más precisa:
  • "verde" = comportamiento bien ejecutado con evidencia clara
  • "amarillo1" = comportamiento observable pero mejorable (el problema es de profundidad o consistencia)
  • "amarillo2" = comportamiento con una debilidad específica diferente a amarillo1 (p.ej. lidera pero desde necesidad, o encontró Estrella Polar pero no la recuperó)
  • "rojo" = ausencia o error claro con oportunidad perdida
  • "gris" = no evaluable
- La evidencia debe ser un fragmento LITERAL de la transcripción (máximo 2 frases). Si no hay evidencia clara, deja el campo vacío.
- Las fortalezas y oportunidades deben estar respaldadas por lo que ocurrió realmente en la llamada.

${transcripciones.map((t, i) => `--- TRANSCRIPCIÓN ${i + 1} ---\n${t}`).join("\n\n")}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      tools: [radiografiaSchema],
      tool_choice: { type: "any" },
      messages: [{ role: "user", content: prompt }],
    });

    const toolUse = message.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json({ error: "No se pudo analizar la transcripción. Inténtalo de nuevo." }, { status: 500 });
    }

    const result = toolUse.input as {
      nombre_closer: string;
      checks: Record<string, SemaforoColor>;
      evidencias: Record<string, string>;
      fortalezas: string[];
      oportunidades: string[];
      plan_accion: string;
    };

    // Sustituir variantes IA por textos prediseñados
    const checksConTexto: Record<string, { color: string; emoji: string; texto: string; evidencia: string }> = {};
    for (const key of Object.keys(CHECK_LABELS)) {
      const color = result.checks[key] as SemaforoColor;
      checksConTexto[key] = {
        color,
        emoji: EMOJI[color],
        texto: TEXTOS[key][color],
        evidencia: result.evidencias[key] || "",
      };
    }

    const resumenCopiable = buildResumen(result);

    return NextResponse.json({
      nombre_closer: result.nombre_closer,
      checks: checksConTexto,
      fortalezas: result.fortalezas,
      oportunidades: result.oportunidades,
      plan_accion: result.plan_accion,
      resumen_copiable: resumenCopiable,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    console.error("[radiografia] Error:", msg);
    return NextResponse.json({ error: `Error analizando la llamada: ${msg}` }, { status: 500 });
  }
}
