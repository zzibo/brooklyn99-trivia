import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
    }
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  character: string;
  created_at: string;
}

export async function submitScore(name: string, score: number, character: string) {
  const { error } = await getClient()
    .from("leaderboard")
    .insert({ name, score, character });

  if (error) throw error;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await getClient()
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(10);

  if (error) throw error;
  return data ?? [];
}

export async function reportQuestion(questionText: string, shownAnswer: string, boss: string) {
  const { error } = await getClient()
    .from("question_reports")
    .insert({ question_text: questionText, shown_answer: shownAnswer, boss });

  if (error) throw error;
}
