# B99 Trivia — Pokemon Battle Redesign

## Summary

Rip out FSRS spaced repetition. Replace the trivia trainer with a **Pokemon battle-style gauntlet** where 6 B99 characters are bosses you fight in order. Each boss throws 8 trivia questions at you. Answer like selecting moves in a 2x2 grid. Wrong answers drain your HP. Lose all HP = full restart from boss 1. Questions have difficulty levels that affect damage. Each character has deep, unique dialog pools so no two playthroughs feel the same.

## What Gets Removed

- `ts-fsrs` dependency and all FSRS logic (`src/lib/fsrs.ts`, `src/hooks/use-fsrs-cards.ts`)
- Stats page (`src/app/stats/`)
- Difficulty rating component (Again/Hard/Good/Easy buttons)
- 149 questions — replaced with curated 48
- `use-stats.ts` streak/accuracy tracking
- localStorage FSRS card state
- Categories system

## What Gets Kept

- Pixel art Stardew aesthetic + theme colors
- Character sprites with expressions (neutral/happy/sad)
- Scene backgrounds (1 per boss)
- Pixel UI primitives (pixel-border, pixel-button, health-bar)
- Next.js + Tailwind + shadcn/ui stack
- Art generation scripts

## Boss Order & Progression

| # | Boss | Your HP | Background | Personality |
|---|---|---|---|---|
| 1 | Charles Boyle | 3 | Nikolaj's House | Eager foodie, encouraging, overshares |
| 2 | Gina Linetti | 4 | Bullpen | Narcissist, savage, phone-obsessed |
| 3 | Jake Peralta | 5 | Shaw's Bar | Goofball, Die Hard fanatic, competitive |
| 4 | Amy Santiago | 6 | Evidence Room | Hyper-competitive, nerdy, panicky |
| 5 | Rosa Diaz | 7 | Interrogation Room | Intimidating, blunt, secretly soft |
| 6 | Captain Holt | 8 | Holt's Office | Final boss, deadpan, devastating monotone |

## Questions: 48 Total (8 per boss)

Each question has a difficulty level (1, 2, or 3). Mix per boss: roughly 3 level-1, 3 level-2, 2 level-3.

Questions are hard — this is not a casual quiz. They test deep B99 knowledge.

## Damage System

### Wrong answer (damage to player):

| Q Level | Damage to YOU | Reasoning |
|---|---|---|
| 1 (easy) | 2 HP | You should've known that |
| 2 (medium) | 1 HP | Fair miss |
| 3 (hard) | 1 HP | Hard question, lighter punishment |

### Correct answer (damage to boss):

| Q Level | Damage to BOSS | Reasoning |
|---|---|---|
| 1 (easy) | 1 bar | Expected knowledge |
| 2 (medium) | 1 bar | Standard |
| 3 (hard) | 2 bars | Big brain play, rewarded |

Boss HP = 8 bars (one per question). Hard correct answers drain 2 bars, so you can finish faster if you nail the tough ones.

## Game Over

Lose all HP = game over screen with the boss's victory dialog. Full restart from boss 1. No checkpoints. Roguelike energy.

## Battle Screen Layout

```
┌──────────────────────────────────────┐
│  [Boss Name]          [Boss HP ████] │
│                                      │
│            ┌──────────┐              │
│            │  SPRITE   │  "Dialog    │
│            │  (boss)   │   here"     │
│            └──────────┘              │
│                                      │
│  ── ── ── ── ── ── ── ── ── ── ──   │
│                                      │
│  [Your HP: ♥♥♥♥♥░░]      [Q 3/8]   │
│                                      │
│  ┌── Question text ───────────────┐  │
│  │                                │  │
│  │  ┌──────────┐  ┌──────────┐   │  │
│  │  │ Answer A │  │ Answer B │   │  │
│  │  ├──────────┤  ├──────────┤   │  │
│  │  │ Answer C │  │ Answer D │   │  │
│  │  └──────────┘  └──────────┘   │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Character Dialog System

Each character has **5+ lines per trigger**, randomly selected. No repeats within a single fight. Triggers:

| Trigger | When it fires |
|---|---|
| `intro` | Battle starts |
| `correct` | Player answers correctly |
| `wrong` | Player answers incorrectly |
| `player_low_hp` | Player at 1 HP |
| `boss_low_hp` | Boss at 1-2 bars left |
| `defeat` | Player beats the boss |
| `victory` | Boss beats the player |

### Charles Boyle (eager, foodie, oversharing)

**intro:**
- "Oh! A trivia battle? This is like the time I discovered bone marrow butter!"
- "I've been waiting for this moment like a slow-braised short rib!"
- "Let me quiz you! I promise I'll be gentle... unlike my ex-wife Eleanor."
- "Finally someone to test! Jake always says no. And by 'says no' I mean he runs away."
- "This is so exciting! I made a celebratory cheese plate but I already ate it."

**correct:**
- "YES! That's the right answer! I'm getting goosebumps — food goosebumps!"
- "You nailed it! Like a perfectly seared foie gras!"
- "Incredible! Jake would be so proud of you right now!"
- "That's correct! You have the palate of a trivia connoisseur!"
- "Wow! You really know your stuff! Can we be best friends? I need a backup Jake."

**wrong:**
- "Oh no... that's wrong. It's okay, everyone makes mistakes. Even Nikolaj. It's Nikolaj."
- "Hmm, not quite. Don't worry, I once confused truffle oil with motor oil."
- "Wrong answer, but I still believe in you! Like I believe in unpasteurized cheese!"
- "That's incorrect but your confidence was beautiful. Like a soufflé that collapsed."
- "Nope! But honestly, I got my own name wrong on a police report once, so no judgment."

**player_low_hp:**
- "You're struggling! Quick, eat something — food heals the mind!"
- "Oh no oh no oh no. This is like watching someone microwave a steak."
- "You're almost out! I feel terrible! Want me to make it easier? I can't, but want me to?"

**boss_low_hp:**
- "Wait, I'm losing?! This never happens! Well, it always happens, but still!"
- "You're really good at this! I'm scared AND impressed!"

**defeat:**
- "You beat me! That was beautiful. I'm not crying, I just have shallot in my eye."
- "Wow. I haven't felt this outmatched since my divorce."
- "You won! I'm honored to be your first victory. Tell Jake I said hi!"

**victory:**
- "I... I won? I never win! Wait till I tell Jake! He won't care but I'll tell him anyway!"
- "I beat you! This calls for a celebratory meal. Do you like tripe?"
- "Victory! And they said Charles Boyle couldn't win anything! Well, Eleanor said that."

### Gina Linetti (narcissist, savage, phone-obsessed)

**intro:**
- "Ugh, are we really doing this? I have 40,000 followers waiting for content."
- "Listen, I'm only here because the universe told me to humble you."
- "I'm Gina Linetti, the human form of the 100 emoji. Try to keep up."
- "Before we start — my time is literally worth more than yours. So be quick."
- "Oh look, another person about to be destroyed by my superior intellect. Cute."

**correct:**
- "Okay fine, you got that one. Don't let it go to your head."
- "Lucky guess. My phone psychic predicted this."
- "Whatever. Even a broken clock is right twice a day."
- "Ugh, you got it right. This is boring when you're not failing."
- "Correct. I'm not impressed, but I'm not NOT impressed. Actually, no, I'm not impressed."

**wrong:**
- "HAHAHAHA. I'm screenshotting this for my followers."
- "Wrong! But honestly, I'd be surprised if you got anything right."
- "Yikes. That answer was tragic. Like your whole vibe."
- "Incorrect! I'm literally live-tweeting your failure right now."
- "Wrong. And I thought MY attention span was bad."

**player_low_hp:**
- "You're about to lose to Gina Linetti. Honestly? That's an honor."
- "Almost dead? I'd say 'good try' but... was it?"
- "One more wrong answer and this is over. I should feel bad but I really don't."

**boss_low_hp:**
- "Wait, I'm losing? This can't be right. My horoscope said today was MY day."
- "Okay you're good but I'm CHOOSING to let you win. Remember that."

**defeat:**
- "Fine. You won. But I LET you win because I have better things to do."
- "This doesn't count. I wasn't even trying. *posts about it anyway*"
- "Whatever. I'm still the most famous person in this precinct. Bye."

**victory:**
- "Obviously I won. I'm Gina Linetti. Google me."
- "Another day, another person who couldn't handle my genius."
- "I won! Time to update my bio: 'Trivia champion, dance icon, your superior.'"

### Jake Peralta (goofball, Die Hard fanatic, competitive)

**intro:**
- "NINE NINE! Let's go! This is gonna be like Die Hard but with trivia!"
- "Cool cool cool cool cool. No doubt no doubt. Let's do this thing!"
- "Title of your sex tape! Wait — wrong context. Okay, trivia time!"
- "Yippee ki yay! Jake Peralta, trivia master, at your service!"
- "Alright alright alright, let's see what you got! And yes I just quoted Matthew McConaughey."

**correct:**
- "NOICE! Smort! You really know your stuff!"
- "Toit! That's the right answer! Bingpot!"
- "Okay okay okay, you're good. But can you beat the FULL Peralta experience?"
- "Dang! You got it! That's very Die Hard of you!"
- "Correct! I'd high-five you but this is a screen so... *air five*!"

**wrong:**
- "Ooh, wrong answer! That's rough, buddy. Like Bruce Willis in Die Hard 5."
- "Nope! But hey, even John McClane got shot a few times."
- "Wrong! Cool cool cool cool cool. That's fine. That's totally fine."
- "Incorrect! Don't worry, I once forgot my own badge number. Wait, no I didn't. 9544 baby!"
- "That ain't it! But I respect the confidence. Misplaced confidence, but still."

**player_low_hp:**
- "Uh oh, you're looking rough. Like me after an all-night stakeout."
- "Dude, you're about to lose! Quick, channel your inner McClane!"
- "One HP left! This is the part in the movie where the hero makes a comeback! ...Right?"

**boss_low_hp:**
- "Wait wait wait, I'm losing?! This wasn't in the script!"
- "Okay you're actually good. This is less Die Hard and more Die Hard 3 — I'm outmatched."

**defeat:**
- "You beat me?! BINGPOT! Okay that actually hurt but... BINGPOT!"
- "Noice. You're like the John McClane of trivia. I respect that."
- "I lost! Cool cool cool cool cool cool cool. No doubt. I'm fine. I'm FINE."

**victory:**
- "I WIN! Cool cool cool! Wait, was this even a competition? Yes. And I WON."
- "NINE NINE! Peralta wins again! Title of my sex tape!"
- "Victory! Now if you'll excuse me, I'm gonna go watch Die Hard to celebrate."

### Amy Santiago (competitive, nerdy, panicky)

**intro:**
- "I've prepared 47 binders for this moment. Let's begin."
- "I should warn you — I was valedictorian. Of everything. Always."
- "Trivia? Oh, you have NO idea what you've gotten yourself into."
- "I've color-coded my questions by difficulty AND thematic relevance. You're welcome."
- "Let's do this by the book. MY book. Which I literally wrote. It's laminated."

**correct:**
- "What?! You... you got that right? *adjusts glasses nervously*"
- "Okay. Fine. You knew that one. I'm not panicking. *is clearly panicking*"
- "Correct. But statistically, you can't keep this up. I've done the math."
- "Right answer. This is fine. I still have the advantage. *checks binder frantically*"
- "You got it. Whatever. I have a 97.3% win rate and ONE wrong answer won't change that."

**wrong:**
- "HA! Wrong! I knew you'd miss that one! I highlighted it in my prep binder!"
- "Incorrect! That's one point for organization and preparedness!"
- "Wrong answer! This is exactly why I color-code everything!"
- "Nope! See, THIS is what happens when you don't use a structured study system!"
- "Wrong! I'm adding this to my 'predicted outcomes' spreadsheet. Column B. Green highlight."

**player_low_hp:**
- "You're almost done! My binder predicted this outcome on page 34!"
- "Your HP is critically low! I've already drafted your defeat summary!"
- "One HP? I'm trying not to smile. I'm failing. I'm smiling."

**boss_low_hp:**
- "How are you winning?! My binder... my BINDER said this wouldn't happen!"
- "I'm losing?! Okay stay calm Amy. STAY CALM. *starts stress-organizing desk*"

**defeat:**
- "No. No no no. This can't be happening. My binder said I'd win. THE BINDER WAS WRONG."
- "You beat me?! I need to reorganize my entire study system. EVERYTHING IS WRONG."
- "I lost. I'm going to need 48 hours, 12 binders, and a good cry. Congratulations."

**victory:**
- "YES! Structure and preparation ALWAYS win! Take that, chaos!"
- "I won! Let me update my win/loss spreadsheet. Column B, row 47..."
- "Victory is MINE! This is going in the trophy binder! Yes I have a trophy binder!"

### Rosa Diaz (intimidating, blunt, secretly soft)

**intro:**
- "Let's get this over with."
- "I don't do small talk. Answer the questions or leave."
- "You showed up. That takes guts. You'll need them."
- "..."
- "Don't make eye contact with me. Just answer the questions."

**correct:**
- "...Not bad."
- "Hm. You actually knew that. Respect."
- "Correct. Don't smile about it."
- "Right. I'm mildly less annoyed now."
- "Fine. You got that one."

**wrong:**
- "Wrong."
- "That was the wrong answer. I'm disappointed."
- "Incorrect. I've hurt people for less."
- "No."
- "Wrong answer. I'm not going to sugarcoat it."

**player_low_hp:**
- "You're barely standing. I almost feel bad. Almost."
- "One more wrong answer and this is over. No pressure."
- "You're dying. Metaphorically. For now."

**boss_low_hp:**
- "...You're actually beating me. Don't get cocky."
- "I underestimated you. That won't happen again. Except it just did."

**defeat:**
- "...You beat me. Tell anyone and I'll deny it."
- "Fine. You won. I'm not mad. *is visibly mad*"
- "You won. I respect that. Now leave before I change my mind about respecting it."

**victory:**
- "Done."
- "That was easy. Next time, bring someone who knows things."
- "I win. Obviously. Go home."

### Captain Holt (deadpan, devastating, eloquent — FINAL BOSS)

**intro:**
- "I have prepared a series of questions to evaluate your competence. Or lack thereof."
- "Let us begin. I anticipate this will be... brief."
- "You've made it to the final challenge. Your overconfidence is noted."
- "I am Captain Raymond Holt. You are about to be thoroughly examined."
- "Sit. Focus. And prepare for the most rigorous assessment of your Nine-Nine knowledge."

**correct:**
- "Correct. I am experiencing what some might describe as mild surprise."
- "That is the right answer. Perhaps I underestimated you. Perhaps."
- "Indeed. Your knowledge of this subject is... not entirely nonexistent."
- "Correct. I will note this in my evaluation. The note will simply say 'hm.'"
- "Right. You may have detected a micro-expression of approval. You did not."

**wrong:**
- "Incorrect. Much like your life choices that led you to this moment."
- "Wrong. I have seen more intelligence from Cheddar, and he is a dog."
- "That answer was wrong. I am not angry. I am disappointed. Actually, I am also angry."
- "Incorrect. Kevin would find this amusing. I do not. But Kevin would."
- "Wrong. That answer was so incorrect it has looped around and become offensive."

**player_low_hp:**
- "You are performing poorly. This is not a subjective observation."
- "Your HP is critically low. I would offer encouragement, but I don't believe in false hope."
- "One HP remaining. The statistical probability of your victory is... negligible."

**boss_low_hp:**
- "You are... performing well. I need a moment. BONE?! No. I am composed."
- "I appear to be losing. This is... an unexpected development."

**defeat:**
- "You have defeated me. I need a moment. BONE?! How dare you... No. I am composed. Congratulations."
- "Hot damn. You've won. I will process this privately with Kevin later."
- "You've bested the final challenge. I am experiencing... an emotion. It will pass."

**victory:**
- "As I calculated. You may leave my office."
- "The outcome was never in doubt. Dismissed."
- "I have won. This brings me neither joy nor satisfaction. Actually, slight satisfaction."

## State Management

Simple React state — no localStorage needed beyond saving highest boss beaten.

```
{
  currentBoss: number (0-5)
  currentQuestion: number (0-7)
  playerHp: number
  bossHp: number
  phase: "intro" | "question" | "reveal" | "gameover" | "boss_defeated" | "victory"
  usedDialog: Record<string, string[]>  // track used lines per trigger to avoid repeats
}
```

## Pages

- `/` — Landing page (simplified, "Start Battle" button)
- `/battle` — The main battle screen (replaces `/train`)
- Remove `/stats`
