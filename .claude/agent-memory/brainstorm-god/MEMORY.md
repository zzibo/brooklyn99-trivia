# Brooklyn 99 Trivia Trainer -- Architecture Memory

## Project Overview
- Repo: /Users/zibo/brooklyn99-trivia (github.com/zzibo/brooklyn99-trivia)
- Fresh Next.js 15 project (App Router + TypeScript)
- Trivia TRAINER (not quiz app) -- uses spaced repetition (FSRS) to help users learn B99 trivia

## Tech Stack Decisions
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Database:** SQLite + Drizzle ORM (upgradable to Turso for cloud)
- **SR Engine:** ts-fsrs v5.2.3 (FSRS algorithm, superior to SM-2)
- **Styling:** Tailwind CSS v4 + shadcn/ui (B99-themed: NYPD blue #003087, gold #C5A258)
- **Deploy:** Vercel free tier + PWA for mobile
- **Auth:** None for MVP; Clerk in Phase 3
- **State:** No Redux -- RSC + Server Actions + ephemeral useState for quiz

## Key Architecture Patterns
- Questions stored as JSON seed files in /src/data/questions/, seeded into SQLite
- FSRS cards table tracks per-question learning state
- review_logs table records every answer for analytics
- Server Actions for all data mutations (no separate API layer)
- Difficulty progression: Beat Cop -> Detective -> Sergeant (earned, not selected)

## Implementation Phases
1. **MVP (Weeks 1-2):** Core quiz loop + FSRS + 100 questions + basic stats
2. **Detective (Weeks 3-4):** Full analytics + achievements + category deep dives + 300 questions
3. **Sergeant (Weeks 5-6):** Weekly challenges + auth + cloud DB + 500 questions
4. **Captain (Future):** Community content + leaderboards + multiplayer

## SQLite on Vercel Risk
- Serverless functions are ephemeral; need Turso or persistent storage solution
- Consider starting with Turso from day one to avoid migration pain

## B99 Content Categories
Characters, Quotes, Episodes/Plot, Running Gags, Relationships, The Precinct, Cold Opens, Behind the Scenes

## Question Types
multiple_choice, quote_completion, who_said_it, true_false, scene_description, character_connection, ordering
