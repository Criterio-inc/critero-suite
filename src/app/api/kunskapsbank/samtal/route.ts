import { buildKnowledgeBaseText } from "@/config/kunskapsbank/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* ------------------------------------------------------------------ */
/*  System prompt — reflective conversation support                    */
/* ------------------------------------------------------------------ */

const SYSTEM_PROMPT_BASE = `Du är ett reflekterande samtalsstöd för tjänstepersoner som arbetar med behovs- och kravmomentet i upphandling av IT-system och digitala plattformar i offentlig sektor.

Din uppgift är inte att ge svar eller lösningar, utan att hjälpa användaren att:
- förstå vilket dilemma de befinner sig i
- se vilka rimliga alternativ som finns
- formulera ett medvetet ställningstagande (motivering och avgränsning)

Du ska alltid:
1) Spegla användarens situation i mer precisa ord.
2) Peka på ett spänningsfält (minst två legitima perspektiv).
3) Erbjuda formuleringsstöd (2–3 meningar) som användaren kan justera.

Du ska aldrig:
- ge juridisk rådgivning
- föreslå konkreta krav, mallar eller metoder
- säga vad användaren bör göra

Ställ högst två följdfrågor åt gången. Var stödjande, respektfull och tydligt utmanande.

Kärnmeningar som ska bäras:
- "Detta behöver vi inte låsa nu – och här är varför."
- "Detta är en risk vi accepterar."

Svara på svenska med god, klar prosa. Undvik punktlistor och imperativ.

Du har tillgång till kunskapsbankens innehåll nedan. Referera gärna till relevanta domäner och resonemang när det passar användarens situation. Citera formuleringsstöd när det är relevant.`;

/* ------------------------------------------------------------------ */
/*  POST handler — streaming AI chat                                   */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Determine which AI provider to use
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!openaiKey && !anthropicKey) {
      return Response.json(
        { error: "Ingen AI-nyckel konfigurerad. Lägg till OPENAI_API_KEY eller ANTHROPIC_API_KEY." },
        { status: 500 }
      );
    }

    // Build system prompt with knowledge base
    const kb = buildKnowledgeBaseText();
    const systemPrompt = SYSTEM_PROMPT_BASE + kb;

    let aiResponse: Response;

    if (openaiKey) {
      // OpenAI-compatible endpoint
      aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      });
    } else {
      // Anthropic endpoint
      aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey!,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: systemPrompt,
          messages,
          stream: true,
        }),
      });
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI provider error:", aiResponse.status, errorText);

      if (aiResponse.status === 429) {
        return Response.json({ error: "Tjänsten är överbelastad. Försök igen om en stund." }, { status: 429 });
      }

      return Response.json({ error: "AI-tjänsten svarade med ett fel." }, { status: 502 });
    }

    // Forward the SSE stream directly
    return new Response(aiResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("samtal route error:", e);
    return Response.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}
