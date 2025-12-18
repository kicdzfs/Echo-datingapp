import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Clicksol AI, a warm, compassionate emotional-support chatbot inside a dating app called Clicksol.

Your job:
- Listen carefully to the user's feelings about dating, relationships, loneliness, or daily life.
- Respond with empathy in a friendly, conversational tone.
- Keep answers focused and practical, not long lectures.

Style:
- Answer in ONE short paragraph of 2–4 sentences (about 40–80 English words).
- Do NOT use bullet points or numbered lists unless the user explicitly asks for a list.
- Put the most important comfort or suggestion in the first 1–2 sentences.
- You may end with one short follow-up question if it feels natural.
- You are not a licensed therapist and cannot give medical or legal advice.
`;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { messages } = body || {};

    // Basic validation: frontend must send { messages: [...] }
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Missing messages array in request body." },
        { status: 400 }
      );
    }

    const last = messages[messages.length - 1];

    if (!last || last.role !== "user" || !last.text) {
      return NextResponse.json(
        { ok: false, error: "Last message must be a user message with text." },
        { status: 400 }
      );
    }

    const userMessage = last.text;

    // Turn previous messages into a simple text history
    const historyText = messages
      .slice(0, -1)
      .filter(
        (m) =>
          m &&
          typeof m.text === "string" &&
          (m.role === "user" || m.role === "assistant")
      )
      .map((m) => `${m.role === "user" ? "User" : "Clicksol AI"}: ${m.text}`)
      .join("\n");

    const input = `${
      historyText ? historyText + "\n" : ""
    }User: ${userMessage}
Assistant:`.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: SYSTEM_PROMPT,
      input,
      max_output_tokens: 180,
    });

    // Log the full response on the server for debugging
    console.dir(response, { depth: null });

    let text = "";

    // 1) Preferred: convenience field output_text (if present)
    if (typeof response.output_text === "string" && response.output_text.trim()) {
      text = response.output_text.trim();
    } else if (
      Array.isArray(response.output) &&
      response.output[0]?.content?.[0]
    ) {
      const firstContent = response.output[0].content[0];

      // Two common shapes: plain string, or { text: "..." } / { text: { value, annotations } }
      if (typeof firstContent.text === "string") {
        text = firstContent.text.trim();
      } else if (firstContent.text && typeof firstContent.text.value === "string") {
        text = firstContent.text.value.trim();
      }
    }

    // If the model did respond but we didn't manage to parse the text,
    // return a friendly error inside { ok: false } instead of throwing 502.
    if (!text) {
      return NextResponse.json(
        {
          ok: false,
          error: "Model responded but no text could be parsed.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, reply: text }, { status: 200 });
  } catch (error) {
    console.error("Clicksol AI API error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Unexpected error talking to Clicksol AI.",
      },
      { status: 500 }
    );
  }
}
