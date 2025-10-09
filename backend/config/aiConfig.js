import OpenAI from "openai";
import Groq from "groq-sdk";

// === Inisialisasi Client ===
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});


/**
 * Fungsi utama untuk generate teks / RPP
 * Prioritas: OpenAI → (fallback handled di controller)
 */
export async function generateWithAI(prompt) {
  //  OPENAI (utama)
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content?.trim();
    if (content) {
      return JSON.parse(content);
    }

    throw new Error("OpenAI tidak mengembalikan konten yang valid.");
  } catch (errorOpenAI) {
    console.warn("⚠️ OpenAI gagal:", errorOpenAI.message);
  }

 

  //  Semua gagal → null (biar controller pakai fallback buildMock)
  console.warn("⚠️ Semua provider gagal — menggunakan fallback lokal (mockupGenerator).");
  return null;
}
