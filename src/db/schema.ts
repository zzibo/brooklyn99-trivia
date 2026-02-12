import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const characters = sqliteTable("characters", {
  id: text("id").primaryKey(), // e.g. "jake", "amy"
  name: text("name").notNull(),
  title: text("title").notNull(), // e.g. "Detective Jake Peralta"
  color: text("color").notNull(), // hex color for UI accent
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(), // e.g. "general", "quotes"
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // emoji
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
  characterId: text("character_id")
    .notNull()
    .references(() => characters.id),
  question: text("question").notNull(),
  difficulty: integer("difficulty").notNull(), // 1-3
});

export const answers = sqliteTable("answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  text: text("text").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
});
