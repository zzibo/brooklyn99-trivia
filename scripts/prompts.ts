export const CHARACTER_DESCRIPTIONS: Record<string, string> = {
  jake: "Jake Peralta - young male detective, messy brown hair, leather jacket, jeans, confident smirk, casual posture",
  amy: "Amy Santiago - female detective, long dark hair in ponytail, blazer and button-up shirt, glasses sometimes, organized and neat appearance",
  rosa: "Rosa Diaz - female detective, long curly dark hair, leather jacket, tough intimidating look, combat boots",
  terry: "Terry Jeffords - very muscular Black male sergeant, tight polo shirt showing muscles, bald head, warm smile",
  charles: "Charles Boyle - male detective, short brown hair, slightly pudgy, sweater vest, eager friendly expression",
  gina: "Gina Linetti - female civilian, stylish outfit, phone in hand, confident pose, trendy hair",
  holt: "Raymond Holt - older Black male captain, perfectly neat suit and tie, stoic expression, bald, glasses",
  hitchcock: "Hitchcock - overweight older male detective, balding with some hair, Hawaiian shirt, lazy appearance",
  scully: "Scully - overweight older male detective, rounder face, mustache, tie loosened, friendly but clueless look",
  "doug-judy": "Doug Judy - Black male, charismatic smile, casual cool outfit, sometimes leather jacket, suave demeanor",
  vulture: "The Vulture - male detective, slicked back hair, cocky grin, fitted suit, arrogant posture",
  wuntch: "Madeline Wuntch - older female, stern expression, power suit, short dark hair, commanding presence",
};

export const EXPRESSIONS: Record<string, string> = {
  neutral: "calm neutral expression, relaxed posture",
  happy: "big smile, excited expression, celebratory pose",
  sad: "disappointed frown, slumped posture, dejected look",
};

export const BACKGROUNDS: Record<string, string> = {
  bullpen: "NYPD police station open office bullpen, desks with papers and computers, fluorescent lighting, bulletin boards, coffee mugs, filing cabinets",
  "holts-office": "Captain's private office, neat organized desk, American flag, awards on wall, nameplate reading 'CPT. HOLT', leather chair",
  "shaws-bar": "Cozy neighborhood bar interior, wooden bar counter, bar stools, neon signs, dim warm lighting, bottles on shelves, jukebox",
  "evidence-room": "Police evidence storage room, metal shelving units with labeled boxes, chain-link cage doors, fluorescent harsh lighting",
  "interrogation-room": "Small police interrogation room, metal table and chairs, one-way mirror, harsh overhead light, bare gray walls",
  "nikolajs-house": "Cozy suburban living room, family photos, toy shelf, warm wallpaper, comfortable couch, kids toys on floor",
};

export function getSpritePrompt(characterId: string, expression: string): string {
  const charDesc = CHARACTER_DESCRIPTIONS[characterId] || "generic detective";
  const exprDesc = EXPRESSIONS[expression] || EXPRESSIONS.neutral;

  return `Create a pixel art character sprite in the style of Stardew Valley or classic SNES RPGs.

Character: ${charDesc}
Expression: ${exprDesc}

Style requirements:
- 32x32 or 64x64 pixel art, scaled up to 256x256 with crisp pixel edges
- Stardew Valley / Harvest Moon aesthetic
- Simple but recognizable features
- Warm color palette
- Transparent background (PNG)
- Full body sprite, facing forward
- Cute chibi proportions (large head, small body)
- Clean pixel edges, no anti-aliasing blur`;
}

export function getBackgroundPrompt(sceneId: string): string {
  const sceneDesc = BACKGROUNDS[sceneId] || "generic room";

  return `Create a pixel art background scene in the style of Stardew Valley or classic SNES RPGs.

Scene: ${sceneDesc}

Style requirements:
- 640x360 pixel art resolution, scaled up to 1280x720
- Stardew Valley / Harvest Moon indoor scene aesthetic
- Warm color palette with cozy lighting
- Detailed pixel art environment with furniture and props
- No characters in the scene
- Clean pixel edges, no anti-aliasing blur
- Horizontal composition suitable for a game scene background`;
}
