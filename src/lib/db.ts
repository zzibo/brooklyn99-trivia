"use server";

import { createClient, type Client } from "@libsql/client";

const tursoUrl = process.env.TURSO_DATABASE_URL || "";
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN || "";

let client: Client | null = null;

function getClient(): Client {
  if (!client) {
    if (!tursoUrl) {
      throw new Error(
        "Turso not configured. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.local"
      );
    }
    client = createClient({ url: tursoUrl, authToken: tursoAuthToken });
  }
  return client;
}

let tablesCreated = false;
async function ensureTables() {
  if (tablesCreated) return;
  const db = getClient();
  await db.batch([
    `CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK (LENGTH(name) <= 20),
      score INTEGER NOT NULL,
      character TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS question_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_text TEXT NOT NULL,
      shown_answer TEXT NOT NULL,
      boss TEXT NOT NULL,
      suggestion TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    )`,
  ]);

  // Migrate: add suggestion column if table already existed without it
  try {
    await db.execute(`ALTER TABLE question_reports ADD COLUMN suggestion TEXT DEFAULT ''`);
  } catch {
    // Column already exists — ignore
  }

  tablesCreated = true;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  character: string;
  created_at: string;
}

export async function submitScore(
  name: string,
  score: number,
  character: string
) {
  await ensureTables();
  await getClient().execute({
    sql: "INSERT INTO leaderboard (name, score, character) VALUES (?, ?, ?)",
    args: [name, score, character],
  });
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  await ensureTables();
  const result = await getClient().execute(
    "SELECT * FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 10"
  );
  return result.rows.map((row) => ({
    id: String(row.id),
    name: String(row.name),
    score: Number(row.score),
    character: String(row.character),
    created_at: String(row.created_at),
  }));
}

export async function reportQuestion(
  questionText: string,
  shownAnswer: string,
  boss: string,
  suggestion: string
) {
  await ensureTables();
  await getClient().execute({
    sql: "INSERT INTO question_reports (question_text, shown_answer, boss, suggestion) VALUES (?, ?, ?, ?)",
    args: [questionText, shownAnswer, boss, suggestion],
  });
}
