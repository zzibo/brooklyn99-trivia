import { GoogleGenAI } from "@google/genai";
import { getSpritePrompt, getBackgroundPrompt, CHARACTER_DESCRIPTIONS, BACKGROUNDS, EXPRESSIONS } from "./prompts";
import fs from "fs";
import path from "path";

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("Missing GOOGLE_API_KEY environment variable");
  console.error("Set it in .env or pass it: GOOGLE_API_KEY=xxx tsx scripts/generate-art.ts");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SPRITES_DIR = path.join(process.cwd(), "public", "sprites");
const BACKGROUNDS_DIR = path.join(process.cwd(), "public", "backgrounds");

// Ensure directories exist
fs.mkdirSync(SPRITES_DIR, { recursive: true });
fs.mkdirSync(BACKGROUNDS_DIR, { recursive: true });

async function generateImage(prompt: string, outputPath: string): Promise<void> {
  if (fs.existsSync(outputPath)) {
    console.log(`  Skipping (exists): ${path.basename(outputPath)}`);
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        responseModalities: ["image", "text"],
      },
    });

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data!, "base64");
          fs.writeFileSync(outputPath, buffer);
          console.log(`  Generated: ${path.basename(outputPath)}`);
          return;
        }
      }
    }

    console.warn(`  No image returned for: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`  Error generating ${path.basename(outputPath)}:`, error);
  }
}

async function generateSprites(): Promise<void> {
  console.log("\n=== Generating Character Sprites ===\n");

  const characterIds = Object.keys(CHARACTER_DESCRIPTIONS);
  const expressions = Object.keys(EXPRESSIONS);

  for (const charId of characterIds) {
    console.log(`Character: ${charId}`);
    for (const expr of expressions) {
      const prompt = getSpritePrompt(charId, expr);
      const outputPath = path.join(SPRITES_DIR, `${charId}-${expr}.png`);
      await generateImage(prompt, outputPath);
      // Rate limiting
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

async function generateBackgrounds(): Promise<void> {
  console.log("\n=== Generating Backgrounds ===\n");

  for (const sceneId of Object.keys(BACKGROUNDS)) {
    console.log(`Scene: ${sceneId}`);
    const prompt = getBackgroundPrompt(sceneId);
    const outputPath = path.join(BACKGROUNDS_DIR, `${sceneId}.png`);
    await generateImage(prompt, outputPath);
    // Rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }
}

async function main(): Promise<void> {
  console.log("Brooklyn 99 Trivia - Art Generator");
  console.log("Using Google Gemini for pixel art generation\n");

  const args = process.argv.slice(2);

  if (args.includes("--sprites-only")) {
    await generateSprites();
  } else if (args.includes("--backgrounds-only")) {
    await generateBackgrounds();
  } else {
    await generateSprites();
    await generateBackgrounds();
  }

  console.log("\nDone! Check public/sprites and public/backgrounds");
}

main().catch(console.error);
