import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "trivia.db");
const OUT_DIR = path.join(process.cwd(), "generated");

if (!fs.existsSync(DB_PATH)) {
  console.error("Database not found. Run `npm run db:seed` first.");
  process.exit(1);
}

// Ensure output directory
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sqlite = new Database(DB_PATH);
const db = drizzle(sqlite, { schema });

// Export characters
const characters = db.select().from(schema.characters).all();
fs.writeFileSync(path.join(OUT_DIR, "characters.json"), JSON.stringify(characters, null, 2));
console.log(`Exported ${characters.length} characters`);

// Export categories
const categories = db.select().from(schema.categories).all();
fs.writeFileSync(path.join(OUT_DIR, "categories.json"), JSON.stringify(categories, null, 2));
console.log(`Exported ${categories.length} categories`);

// Export questions with answers
const questions = db.select().from(schema.questions).all();
const questionsWithAnswers = questions.map((q) => {
  const answers = db
    .select()
    .from(schema.answers)
    .where(eq(schema.answers.questionId, q.id))
    .all()
    .map((a) => ({
      id: a.id,
      text: a.text,
      isCorrect: a.isCorrect,
    }));

  return {
    id: q.id,
    categoryId: q.categoryId,
    characterId: q.characterId,
    question: q.question,
    difficulty: q.difficulty,
    answers,
  };
});

fs.writeFileSync(path.join(OUT_DIR, "questions.json"), JSON.stringify(questionsWithAnswers, null, 2));
console.log(`Exported ${questionsWithAnswers.length} questions`);

console.log("Export complete!");
sqlite.close();
