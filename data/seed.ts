import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../src/db/schema";
import { generalQuestions } from "./questions/general";
import { characterQuestions } from "./questions/characters";
import { quoteQuestions } from "./questions/quotes";
import { episodeQuestions } from "./questions/episodes";
import { runningGagQuestions } from "./questions/running-gags";
import { relationshipQuestions } from "./questions/relationships";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "trivia.db");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Remove existing DB
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const sqlite = new Database(DB_PATH);
const db = drizzle(sqlite, { schema });

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS characters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    color TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id TEXT NOT NULL REFERENCES categories(id),
    character_id TEXT NOT NULL REFERENCES characters(id),
    question TEXT NOT NULL,
    difficulty INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL REFERENCES questions(id),
    text TEXT NOT NULL,
    is_correct INTEGER NOT NULL
  );
`);

// Seed characters
const characterData = [
  { id: "jake", name: "Jake Peralta", title: "Detective Jake Peralta", color: "#3498db" },
  { id: "amy", name: "Amy Santiago", title: "Sergeant Amy Santiago", color: "#9b59b6" },
  { id: "rosa", name: "Rosa Diaz", title: "Detective Rosa Diaz", color: "#e74c3c" },
  { id: "terry", name: "Terry Jeffords", title: "Sergeant Terry Jeffords", color: "#27ae60" },
  { id: "charles", name: "Charles Boyle", title: "Detective Charles Boyle", color: "#f39c12" },
  { id: "gina", name: "Gina Linetti", title: "Civilian Administrator Gina Linetti", color: "#e91e63" },
  { id: "holt", name: "Raymond Holt", title: "Captain Raymond Holt", color: "#1e3a5f" },
  { id: "hitchcock", name: "Hitchcock", title: "Detective Michael Hitchcock", color: "#95a5a6" },
  { id: "scully", name: "Scully", title: "Detective Norm Scully", color: "#bdc3c7" },
  { id: "doug-judy", name: "Doug Judy", title: "The Pontiac Bandit", color: "#8e44ad" },
  { id: "vulture", name: "The Vulture", title: "Detective Keith Pemberton", color: "#34495e" },
  { id: "wuntch", name: "Madeline Wuntch", title: "Deputy Chief Madeline Wuntch", color: "#c0392b" },
];

for (const char of characterData) {
  db.insert(schema.characters).values(char).run();
}
console.log(`Seeded ${characterData.length} characters`);

// Seed categories
const categoryData = [
  { id: "general", name: "General Knowledge", description: "General facts about the show", icon: "📺" },
  { id: "characters", name: "Characters", description: "Character backgrounds and traits", icon: "👤" },
  { id: "quotes", name: "Quotes & Catchphrases", description: "Famous lines and catchphrases", icon: "💬" },
  { id: "episodes", name: "Episodes & Plot", description: "Specific episode knowledge", icon: "🎬" },
  { id: "running-gags", name: "Running Gags", description: "Recurring jokes and themes", icon: "🔄" },
  { id: "relationships", name: "Relationships", description: "Character relationships and dynamics", icon: "❤️" },
];

for (const cat of categoryData) {
  db.insert(schema.categories).values(cat).run();
}
console.log(`Seeded ${categoryData.length} categories`);

// Seed questions
const allQuestions = [
  ...generalQuestions.map((q) => ({ ...q, categoryId: "general" })),
  ...characterQuestions.map((q) => ({ ...q, categoryId: "characters" })),
  ...quoteQuestions.map((q) => ({ ...q, categoryId: "quotes" })),
  ...episodeQuestions.map((q) => ({ ...q, categoryId: "episodes" })),
  ...runningGagQuestions.map((q) => ({ ...q, categoryId: "running-gags" })),
  ...relationshipQuestions.map((q) => ({ ...q, categoryId: "relationships" })),
];

let questionCount = 0;
let answerCount = 0;

for (const q of allQuestions) {
  const result = db
    .insert(schema.questions)
    .values({
      categoryId: q.categoryId,
      characterId: q.characterId,
      question: q.question,
      difficulty: q.difficulty,
    })
    .run();

  const questionId = Number(result.lastInsertRowid);

  for (const a of q.answers) {
    db.insert(schema.answers)
      .values({
        questionId,
        text: a.text,
        isCorrect: a.isCorrect,
      })
      .run();
    answerCount++;
  }
  questionCount++;
}

console.log(`Seeded ${questionCount} questions with ${answerCount} answers`);
console.log("Database seeded successfully!");

sqlite.close();
