import type { Question } from "@/lib/types";

export const QUESTIONS: Question[] = [
  // === CHARLES BOYLE (Boss 1) — questions 1-8 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 1,
    bossId: "charles",
    question: "What is the name of Charles Boyle's adopted son?",
    difficulty: 1,
    answers: [
      { id: 1, text: "Nikolaj", isCorrect: true },
      { id: 2, text: "Nikolai", isCorrect: false },
      { id: 3, text: "Nicholas", isCorrect: false },
      { id: 4, text: "Nikolas", isCorrect: false },
    ],
  },
  {
    id: 2,
    bossId: "charles",
    question: "What country is Charles's adopted son Nikolaj originally from?",
    difficulty: 1,
    answers: [
      { id: 5, text: "Latvia", isCorrect: true },
      { id: 6, text: "Lithuania", isCorrect: false },
      { id: 7, text: "Estonia", isCorrect: false },
      { id: 8, text: "Moldova", isCorrect: false },
    ],
  },
  {
    id: 3,
    bossId: "charles",
    question: "What is the name of Charles Boyle's ex-wife?",
    difficulty: 1,
    answers: [
      { id: 9, text: "Eleanor", isCorrect: true },
      { id: 10, text: "Elizabeth", isCorrect: false },
      { id: 11, text: "Elaine", isCorrect: false },
      { id: 12, text: "Emily", isCorrect: false },
    ],
  },
  {
    id: 4,
    bossId: "charles",
    question:
      "What is the running gag about how Charles corrects people when they say Nikolaj's name?",
    difficulty: 2,
    answers: [
      {
        id: 13,
        text: "He repeats 'Nikolaj' with a slightly different pronunciation each time",
        isCorrect: true,
      },
      {
        id: 14,
        text: "He spells it out letter by letter",
        isCorrect: false,
      },
      {
        id: 15,
        text: "He makes them say it three times fast",
        isCorrect: false,
      },
      {
        id: 16,
        text: "He writes it down on a card for them",
        isCorrect: false,
      },
    ],
  },
  {
    id: 5,
    bossId: "charles",
    question:
      "What is the name of the multi-level marketing company that traps Charles in the show?",
    difficulty: 2,
    answers: [
      { id: 17, text: "NutriBoom", isCorrect: true },
      { id: 18, text: "NutriBlast", isCorrect: false },
      { id: 19, text: "VitaLife", isCorrect: false },
      { id: 20, text: "HealthBoom", isCorrect: false },
    ],
  },
  {
    id: 6,
    bossId: "charles",
    question:
      "What creepy phrase does NutriBoom use as their slogan that Charles gets trapped into saying?",
    difficulty: 2,
    answers: [
      {
        id: 21,
        text: "Boom boom!",
        isCorrect: true,
      },
      { id: 22, text: "Health is wealth!", isCorrect: false },
      { id: 23, text: "Nourish the boom!", isCorrect: false },
      { id: 24, text: "Boom goes the dynamite!", isCorrect: false },
    ],
  },
  {
    id: 7,
    bossId: "charles",
    question:
      "What is the relationship between Charles and Gina's parents?",
    difficulty: 3,
    answers: [
      {
        id: 25,
        text: "Charles's father and Gina's mother get married, making them step-siblings",
        isCorrect: true,
      },
      {
        id: 26,
        text: "They are already related as distant cousins",
        isCorrect: false,
      },
      {
        id: 27,
        text: "Gina's father and Charles's mother get married",
        isCorrect: false,
      },
      {
        id: 28,
        text: "They are not related in any way",
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    bossId: "charles",
    question:
      "What is the name of Charles's serious girlfriend (and later wife) whom he meets during a case?",
    difficulty: 3,
    answers: [
      { id: 29, text: "Genevieve Mirren-Carter", isCorrect: true },
      { id: 30, text: "Vivian Ludley", isCorrect: false },
      { id: 31, text: "Diana Kowalski", isCorrect: false },
      { id: 32, text: "Catherine DuBois", isCorrect: false },
    ],
  },

  // === GINA LINETTI (Boss 2) — questions 9-16 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 9,
    bossId: "gina",
    question: "What is the name of Gina Linetti's dance crew?",
    difficulty: 1,
    answers: [
      { id: 33, text: "Floorgasm", isCorrect: true },
      { id: 34, text: "Dancy Reagan", isCorrect: false },
      { id: 35, text: "Floor Breakers", isCorrect: false },
      { id: 36, text: "The Gina Show", isCorrect: false },
    ],
  },
  {
    id: 10,
    bossId: "gina",
    question: "What major accident happens to Gina outside the precinct?",
    difficulty: 1,
    answers: [
      { id: 37, text: "She gets hit by a bus", isCorrect: true },
      { id: 38, text: "She falls off a stage while dancing", isCorrect: false },
      { id: 39, text: "She crashes her car into a fire hydrant", isCorrect: false },
      { id: 40, text: "She gets trampled at a concert", isCorrect: false },
    ],
  },
  {
    id: 11,
    bossId: "gina",
    question:
      "What is Gina's relationship to Charles Boyle by the end of the show?",
    difficulty: 1,
    answers: [
      {
        id: 41,
        text: "Step-siblings (their parents married each other)",
        isCorrect: true,
      },
      { id: 42, text: "Cousins", isCorrect: false },
      { id: 43, text: "Ex-partners", isCorrect: false },
      { id: 44, text: "No family relation", isCorrect: false },
    ],
  },
  {
    id: 12,
    bossId: "gina",
    question:
      "What does Gina famously call herself in her self-description?",
    difficulty: 2,
    answers: [
      {
        id: 45,
        text: "The human form of the 100 emoji",
        isCorrect: true,
      },
      { id: 46, text: "The queen of the Nine-Nine", isCorrect: false },
      { id: 47, text: "Brooklyn's finest civilian", isCorrect: false },
      { id: 48, text: "The real boss of the precinct", isCorrect: false },
    ],
  },
  {
    id: 13,
    bossId: "gina",
    question: "Who is the father of Gina's baby?",
    difficulty: 2,
    answers: [
      { id: 49, text: "Milton Boyle", isCorrect: true },
      { id: 50, text: "Charles Boyle", isCorrect: false },
      { id: 51, text: "A Boyle cousin named Bill", isCorrect: false },
      { id: 52, text: "She never reveals the father", isCorrect: false },
    ],
  },
  {
    id: 14,
    bossId: "gina",
    question: "Why does Gina ultimately leave the Nine-Nine?",
    difficulty: 2,
    answers: [
      {
        id: 53,
        text: "To pursue her own business ventures and social media empire",
        isCorrect: true,
      },
      { id: 54, text: "She gets fired by Holt", isCorrect: false },
      { id: 55, text: "She moves to Los Angeles for a dance career", isCorrect: false },
      { id: 56, text: "She gets a job at One Police Plaza", isCorrect: false },
    ],
  },
  {
    id: 15,
    bossId: "gina",
    question:
      "What is the name of Gina's daughter?",
    difficulty: 3,
    answers: [
      { id: 57, text: "Enigma", isCorrect: true },
      { id: 58, text: "Destiny", isCorrect: false },
      { id: 59, text: "Beyonce", isCorrect: false },
      { id: 60, text: "Gina Jr.", isCorrect: false },
    ],
  },
  {
    id: 16,
    bossId: "gina",
    question:
      "Before working at the Nine-Nine, how did Gina and Jake know each other?",
    difficulty: 3,
    answers: [
      {
        id: 61,
        text: "They were childhood friends who grew up together",
        isCorrect: true,
      },
      {
        id: 62,
        text: "They met at the police academy",
        isCorrect: false,
      },
      {
        id: 63,
        text: "Gina was Jake's babysitter",
        isCorrect: false,
      },
      {
        id: 64,
        text: "They met through Charles Boyle",
        isCorrect: false,
      },
    ],
  },

  // === JAKE PERALTA (Boss 3) — questions 17-24 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 17,
    bossId: "jake",
    question: "What is Jake Peralta's badge number?",
    difficulty: 1,
    answers: [
      { id: 65, text: "9544", isCorrect: true },
      { id: 66, text: "9445", isCorrect: false },
      { id: 67, text: "9454", isCorrect: false },
      { id: 68, text: "4954", isCorrect: false },
    ],
  },
  {
    id: 18,
    bossId: "jake",
    question:
      "What is the real name of Jake's criminal frenemy, the Pontiac Bandit?",
    difficulty: 1,
    answers: [
      { id: 69, text: "Doug Judy", isCorrect: true },
      { id: 70, text: "Doug Johnson", isCorrect: false },
      { id: 71, text: "Dave Judy", isCorrect: false },
      { id: 72, text: "Dennis Judy", isCorrect: false },
    ],
  },
  {
    id: 19,
    bossId: "jake",
    question: "What is Jake's all-time favorite movie?",
    difficulty: 1,
    answers: [
      { id: 73, text: "Die Hard", isCorrect: true },
      { id: 74, text: "Lethal Weapon", isCorrect: false },
      { id: 75, text: "Speed", isCorrect: false },
      { id: 76, text: "Point Break", isCorrect: false },
    ],
  },
  {
    id: 20,
    bossId: "jake",
    question:
      "What phrase does Jake repeatedly say when he's nervous or pretending things are fine?",
    difficulty: 2,
    answers: [
      {
        id: 77,
        text: "Cool cool cool cool cool, no doubt no doubt",
        isCorrect: true,
      },
      { id: 78, text: "That's totally fine, totally fine", isCorrect: false },
      {
        id: 79,
        text: "No worries no worries no worries",
        isCorrect: false,
      },
      { id: 80, text: "It's all good, all good, all good", isCorrect: false },
    ],
  },
  {
    id: 21,
    bossId: "jake",
    question:
      "What is the name Jake uses as his go-to fake identity / alter ego for undercover work?",
    difficulty: 2,
    answers: [
      { id: 81, text: "Rex Buckingham", isCorrect: false },
      { id: 82, text: "Vic Kovac", isCorrect: true },
      { id: 83, text: "Larry Sherbert", isCorrect: false },
      { id: 84, text: "Johnny Franzone", isCorrect: false },
    ],
  },
  {
    id: 22,
    bossId: "jake",
    question:
      "What is the recurring exclamation Jake makes when he solves a case or has a breakthrough?",
    difficulty: 2,
    answers: [
      { id: 85, text: "Bingpot!", isCorrect: true },
      { id: 86, text: "Eureka!", isCorrect: false },
      { id: 87, text: "Boom boom!", isCorrect: false },
      { id: 88, text: "Case closed!", isCorrect: false },
    ],
  },
  {
    id: 23,
    bossId: "jake",
    question:
      "Who does Jake go to prison with after being framed by Lieutenant Melanie Hawkins?",
    difficulty: 3,
    answers: [
      { id: 89, text: "Rosa Diaz", isCorrect: true },
      { id: 90, text: "Charles Boyle", isCorrect: false },
      { id: 91, text: "He goes alone", isCorrect: false },
      { id: 92, text: "Doug Judy", isCorrect: false },
    ],
  },
  {
    id: 24,
    bossId: "jake",
    question:
      "In the first Halloween Heist episode, what item does Jake bet Holt he can steal?",
    difficulty: 3,
    answers: [
      { id: 93, text: "Holt's Medal of Valor", isCorrect: true },
      { id: 94, text: "Holt's watch", isCorrect: false },
      { id: 95, text: "Holt's championship cummerbund", isCorrect: false },
      { id: 96, text: "Holt's office nameplate", isCorrect: false },
    ],
  },

  // === AMY SANTIAGO (Boss 4) — questions 25-32 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 25,
    bossId: "amy",
    question: "How many brothers does Amy Santiago have?",
    difficulty: 1,
    answers: [
      { id: 97, text: "Seven", isCorrect: true },
      { id: 98, text: "Five", isCorrect: false },
      { id: 99, text: "Six", isCorrect: false },
      { id: 100, text: "Eight", isCorrect: false },
    ],
  },
  {
    id: 26,
    bossId: "amy",
    question: "What rank does Amy get promoted to during the series?",
    difficulty: 1,
    answers: [
      { id: 101, text: "Sergeant", isCorrect: true },
      { id: 102, text: "Lieutenant", isCorrect: false },
      { id: 103, text: "Captain", isCorrect: false },
      { id: 104, text: "Deputy Inspector", isCorrect: false },
    ],
  },
  {
    id: 27,
    bossId: "amy",
    question: "What is Amy's signature nervous/stress habit that she tries to hide?",
    difficulty: 1,
    answers: [
      { id: 105, text: "Smoking cigarettes", isCorrect: true },
      { id: 106, text: "Biting her nails", isCorrect: false },
      { id: 107, text: "Stress eating", isCorrect: false },
      { id: 108, text: "Pulling her hair", isCorrect: false },
    ],
  },
  {
    id: 28,
    bossId: "amy",
    question:
      "What is Amy famously known for using to organize everything in her life?",
    difficulty: 2,
    answers: [
      { id: 109, text: "Binders", isCorrect: true },
      { id: 110, text: "Spreadsheets", isCorrect: false },
      { id: 111, text: "Color-coded folders", isCorrect: false },
      { id: 112, text: "Post-it notes", isCorrect: false },
    ],
  },
  {
    id: 29,
    bossId: "amy",
    question:
      "What is the recurring joke about how Amy behaves when she drinks alcohol?",
    difficulty: 2,
    answers: [
      { id: 113, text: "She cycles through specific numbered 'drunk stages' with distinct personalities", isCorrect: true },
      { id: 114, text: "She immediately falls asleep after one drink", isCorrect: false },
      { id: 115, text: "She becomes extremely good at arm wrestling", isCorrect: false },
      { id: 116, text: "She starts speaking only in police codes", isCorrect: false },
    ],
  },
  {
    id: 30,
    bossId: "amy",
    question:
      "What bet did Jake and Amy make before they started dating?",
    difficulty: 2,
    answers: [
      {
        id: 117,
        text: "If Jake gets more felony arrests, Amy goes on a date with him; if Amy wins, Jake gives up his car",
        isCorrect: true,
      },
      {
        id: 118,
        text: "Whoever closes more cases buys the other dinner for a month",
        isCorrect: false,
      },
      {
        id: 119,
        text: "If Jake wins, Amy has to do his paperwork; if Amy wins, Jake has to organize his desk",
        isCorrect: false,
      },
      {
        id: 120,
        text: "Whoever solves the next big case gets the other's parking spot",
        isCorrect: false,
      },
    ],
  },
  {
    id: 31,
    bossId: "amy",
    question:
      "What is the name of Amy and Jake's son?",
    difficulty: 3,
    answers: [
      { id: 121, text: "Mac", isCorrect: true },
      { id: 122, text: "Miles", isCorrect: false },
      { id: 123, text: "Marcus", isCorrect: false },
      { id: 124, text: "Max", isCorrect: false },
    ],
  },
  {
    id: 32,
    bossId: "amy",
    question:
      "Where does Jake propose to Amy?",
    difficulty: 3,
    answers: [
      {
        id: 125,
        text: "During the fifth Halloween Heist in the evidence lock-up at the precinct",
        isCorrect: true,
      },
      {
        id: 126,
        text: "At Shaw's Bar after a big case",
        isCorrect: false,
      },
      {
        id: 127,
        text: "On the roof of the precinct building",
        isCorrect: false,
      },
      {
        id: 128,
        text: "At a fancy restaurant in Manhattan",
        isCorrect: false,
      },
    ],
  },

  // === ROSA DIAZ (Boss 5) — questions 33-40 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 33,
    bossId: "rosa",
    question: "What secret hobby is Rosa revealed to practice?",
    difficulty: 1,
    answers: [
      { id: 129, text: "Ballet", isCorrect: true },
      { id: 130, text: "Watercolor painting", isCorrect: false },
      { id: 131, text: "Knitting", isCorrect: false },
      { id: 132, text: "Writing poetry", isCorrect: false },
    ],
  },
  {
    id: 34,
    bossId: "rosa",
    question: "What is the name of Rosa's dog?",
    difficulty: 1,
    answers: [
      { id: 133, text: "Arlo", isCorrect: true },
      { id: 134, text: "Bruno", isCorrect: false },
      { id: 135, text: "Maximus", isCorrect: false },
      { id: 136, text: "Spike", isCorrect: false },
    ],
  },
  {
    id: 35,
    bossId: "rosa",
    question: "What sexual orientation does Rosa come out as during the series?",
    difficulty: 1,
    answers: [
      { id: 137, text: "Bisexual", isCorrect: true },
      { id: 138, text: "Lesbian", isCorrect: false },
      { id: 139, text: "Pansexual", isCorrect: false },
      { id: 140, text: "She never comes out", isCorrect: false },
    ],
  },
  {
    id: 36,
    bossId: "rosa",
    question:
      "What happens when Rosa comes out to her parents?",
    difficulty: 2,
    answers: [
      {
        id: 141,
        text: "Her mother accepts it but her father initially struggles with it",
        isCorrect: true,
      },
      {
        id: 142,
        text: "Both parents immediately accept her",
        isCorrect: false,
      },
      {
        id: 143,
        text: "Both parents reject her at first",
        isCorrect: false,
      },
      {
        id: 144,
        text: "Her father accepts it but her mother does not",
        isCorrect: false,
      },
    ],
  },
  {
    id: 37,
    bossId: "rosa",
    question:
      "What is the main reason the squad knows almost nothing about Rosa's personal life?",
    difficulty: 2,
    answers: [
      {
        id: 145,
        text: "She deliberately keeps her private life extremely secret and intimidates anyone who asks",
        isCorrect: true,
      },
      {
        id: 146,
        text: "She has amnesia about her past",
        isCorrect: false,
      },
      {
        id: 147,
        text: "She is in witness protection",
        isCorrect: false,
      },
      {
        id: 148,
        text: "She only recently moved to New York and hasn't shared yet",
        isCorrect: false,
      },
    ],
  },
  {
    id: 38,
    bossId: "rosa",
    question:
      "What type of vehicle does Rosa famously ride?",
    difficulty: 2,
    answers: [
      { id: 149, text: "A motorcycle", isCorrect: true },
      { id: 150, text: "A black muscle car", isCorrect: false },
      { id: 151, text: "A blacked-out SUV", isCorrect: false },
      { id: 152, text: "A vintage pickup truck", isCorrect: false },
    ],
  },
  {
    id: 39,
    bossId: "rosa",
    question:
      "What does Rosa threaten to do (or actually do) when someone annoys her?",
    difficulty: 3,
    answers: [
      {
        id: 153,
        text: "She threatens them with violence and has a large collection of weapons",
        isCorrect: true,
      },
      {
        id: 154,
        text: "She files formal complaints with HR",
        isCorrect: false,
      },
      {
        id: 155,
        text: "She gives them the silent treatment for weeks",
        isCorrect: false,
      },
      { id: 156, text: "She transfers them to another precinct", isCorrect: false },
    ],
  },
  {
    id: 40,
    bossId: "rosa",
    question:
      "When the squad finally sees Rosa's apartment, what surprises them about it?",
    difficulty: 3,
    answers: [
      { id: 157, text: "It is warm, bright, and beautifully decorated — the opposite of her personality", isCorrect: true },
      { id: 158, text: "It is completely empty with no furniture", isCorrect: false },
      { id: 159, text: "It is a converted warehouse full of weapons", isCorrect: false },
      { id: 160, text: "It looks exactly like an interrogation room", isCorrect: false },
    ],
  },

  // === CAPTAIN HOLT (Boss 6) — questions 41-48 ===
  // 3 level-1, 3 level-2, 2 level-3

  {
    id: 41,
    bossId: "holt",
    question: "What is Captain Holt's husband's full name?",
    difficulty: 1,
    answers: [
      { id: 161, text: "Kevin Cozner", isCorrect: true },
      { id: 162, text: "Kevin Costner", isCorrect: false },
      { id: 163, text: "Kevin Kozner", isCorrect: false },
      { id: 164, text: "Keith Cozner", isCorrect: false },
    ],
  },
  {
    id: 42,
    bossId: "holt",
    question: "What breed is Holt's beloved dog Cheddar?",
    difficulty: 1,
    answers: [
      { id: 165, text: "Pembroke Welsh Corgi", isCorrect: true },
      { id: 166, text: "Cardigan Welsh Corgi", isCorrect: false },
      { id: 167, text: "Shiba Inu", isCorrect: false },
      { id: 168, text: "French Bulldog", isCorrect: false },
    ],
  },
  {
    id: 43,
    bossId: "holt",
    question:
      "What is the first name of Holt's arch-nemesis at One Police Plaza?",
    difficulty: 1,
    answers: [
      { id: 169, text: "Madeline", isCorrect: true },
      { id: 170, text: "Margaret", isCorrect: false },
      { id: 171, text: "Marilyn", isCorrect: false },
      { id: 172, text: "Martha", isCorrect: false },
    ],
  },
  {
    id: 44,
    bossId: "holt",
    question:
      "What word does Holt famously scream during his breakdown over what happened between him and Kevin?",
    difficulty: 2,
    answers: [
      { id: 173, text: "BONE?!", isCorrect: true },
      { id: 174, text: "PAIN!", isCorrect: false },
      { id: 175, text: "BETRAYAL!", isCorrect: false },
      { id: 176, text: "DIVORCE!", isCorrect: false },
    ],
  },
  {
    id: 45,
    bossId: "holt",
    question: "What is Kevin Cozner's profession?",
    difficulty: 2,
    answers: [
      {
        id: 177,
        text: "Classics professor at Columbia University",
        isCorrect: true,
      },
      { id: 178, text: "Lawyer at a Manhattan firm", isCorrect: false },
      { id: 179, text: "Museum curator at the Met", isCorrect: false },
      {
        id: 180,
        text: "English professor at NYU",
        isCorrect: false,
      },
    ],
  },
  {
    id: 46,
    bossId: "holt",
    question:
      "When someone brings a different Corgi to the precinct pretending it's Cheddar, what does Holt say?",
    difficulty: 2,
    answers: [
      {
        id: 181,
        text: "\"This bitch? Please. You're not Cheddar. You're just some common bitch.\"",
        isCorrect: true,
      },
      {
        id: 182,
        text: "\"That's not Cheddar, that's a fraud.\"",
        isCorrect: false,
      },
      {
        id: 183,
        text: "\"I know my own dog, you fool.\"",
        isCorrect: false,
      },
      {
        id: 184,
        text: "\"Cheddar would never behave this way.\"",
        isCorrect: false,
      },
    ],
  },
  {
    id: 47,
    bossId: "holt",
    question:
      "What does Holt shout in celebration when something finally goes right after a long struggle?",
    difficulty: 3,
    answers: [
      { id: 185, text: "VINDICATION!", isCorrect: true },
      { id: 186, text: "VICTORY!", isCorrect: false },
      { id: 187, text: "JUSTICE!", isCorrect: false },
      { id: 188, text: "EXCELLENCE!", isCorrect: false },
    ],
  },
  {
    id: 48,
    bossId: "holt",
    question:
      "What two-word exclamation does Holt use to express excitement or surprise, which becomes his catchphrase?",
    difficulty: 3,
    answers: [
      { id: 189, text: "Hot damn!", isCorrect: true },
      { id: 190, text: "Good grief!", isCorrect: false },
      { id: 191, text: "Great Scott!", isCorrect: false },
      { id: 192, text: "Oh my!", isCorrect: false },
    ],
  },
];
