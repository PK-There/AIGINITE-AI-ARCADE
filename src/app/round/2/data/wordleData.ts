'use client'

export const WORDLE_TARGETS = [
  'CYBER',
  'ROBOT',
  'LOGIC',
  'MODEL',
  'TOKEN',
  'AGENT',
  'BYTES',
  'CHIPS',
  'PROMPT',
  'CLOUD',
  'ARRAY',
  'GRAPH',
  'STACK',
  'PIXEL',
  'QUANT',
  'FLASH',
  'BRAIN',
  'SYNTH',
  'PATCH',
  'DEBUG',
  'QUERY',
  'SERVE',
];

export const VALID_GUESSES = new Set([
  'CYBER', 'ROBOT', 'LOGIC', 'MODEL', 'TOKEN', 'AGENT', 'BYTES', 'CHIPS', 'PROMPT', 'CLOUD',
  'ARRAY', 'GRAPH', 'STACK', 'PIXEL', 'QUANT', 'FLASH', 'BRAIN', 'SYNTH', 'PATCH', 'DEBUG',
  'QUERY', 'SERVE', 'ABOUT', 'ABOVE', 'ACUTE', 'ADAPT', 'ADULT', 'AFTER', 'AGAIN', 'AGILE',
  'ALERT', 'ALIGN', 'ALIEN', 'ALLOW', 'ALONE', 'ALPHA', 'ALTER', 'AMONG', 'ANGEL', 'ANGER',
  'ANGLE', 'ANIME', 'ANKLE', 'APPLY', 'ARGUE', 'ARISE', 'ARMOR', 'ARROW', 'AUDIO', 'AUDIT',
  'AVOID', 'AWARD', 'AWARE', 'BADGE', 'BASIC', 'BATCH', 'BEAST', 'BEGIN', 'BENCH', 'BETA',
  'BLACK', 'BLADE', 'BLAME', 'BLANK', 'BLAST', 'BLEED', 'BLEND', 'BLOCK', 'BLOOD', 'BOARD',
  'BOOST', 'BOUND', 'BRAKE', 'BRAND', 'BRASS', 'BREAD', 'BREAK', 'BRICK', 'BRIEF', 'BRING',
  'BROAD', 'BUILD', 'BURST', 'CABLE', 'CACHE', 'CANDY', 'CARGO', 'CARRY', 'CAUSE', 'CHAIN',
  'CHAIR', 'CHAMP', 'CHART', 'CHASE', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHOIR', 'CHUNK',
  'CIRCA', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIFF', 'CLIMB', 'CLOCK',
  'CLOSE', 'COAST', 'CODES', 'COUNT', 'COURT', 'COVER', 'CRACK', 'CRAFT', 'CRANE', 'CRASH',
  'CRAWL', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CRUSH', 'CYCLE',
  'DAILY', 'DANCE', 'DEATH', 'DEBUT', 'DELAY', 'DELTA', 'DENSE', 'DEPTH', 'DIGIT', 'DIRTY',
  'DISCO', 'DIVED', 'DODGE', 'DRAFT', 'DRAIN', 'DRAMA', 'DREAM', 'DRESS', 'DRIFT', 'DRIVE',
  'DRONE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'ECLIP', 'EIGHT', 'ELDER', 'ELECT', 'ELITE',
  'EMPTY', 'ENEMY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EXACT', 'EXIST', 'EXTRA',
  'FAINT', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIGHT', 'FINAL', 'FIRST',
  'FLAME', 'FLEET', 'FLOAT', 'FLOOD', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORGE', 'FORTH',
  'FRAME', 'FRESH', 'FRONT', 'FROST', 'GAMMA', 'GAUGE', 'GENRE', 'GHOST', 'GIANT', 'GLASS',
  'GLOBE', 'GLORY', 'GLOVE', 'GRACE', 'GRADE', 'GRAIN', 'GRAND', 'GRANT', 'GRASP', 'GREAT',
  'GREEN', 'GREET', 'GRIEF', 'GROUP', 'GUARD', 'GUESS', 'GUIDE', 'GUILD', 'HABIT', 'HEART',
  'HEAVY', 'HEDGE', 'HONOR', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HYPER', 'IDEAL', 'IMAGE',
  'INDEX', 'INNER', 'INPUT', 'IRONY', 'ISSUE', 'JOINT', 'JUDGE', 'JUICE', 'KNIFE', 'KNOCK',
  'LABEL', 'LABOR', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEGAL', 'LEVEL', 'LEVER', 'LIGHT',
  'LIMIT', 'LINKS', 'LOCAL', 'LODGE', 'LOVER', 'LUCKY', 'LUNAR', 'MAGIC', 'MAJOR', 'MAKER',
  'MARCH', 'MATCH', 'MAYOR', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MONEY',
  'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NAIVE', 'NERVE',
  'NIGHT', 'NOBLE', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCEAN', 'OFFER', 'OFTEN',
  'ORDER', 'OTHER', 'OUTER', 'OWNER', 'PANEL', 'PANIC', 'PAPER', 'PARTY', 'PEACE', 'PHASE',
  'PHONE', 'PHOTO', 'PILOT', 'PITCH', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER',
  'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PULSE', 'QUEEN',
  'QUICK', 'QUIET', 'RADAR', 'RADIO', 'RAISE', 'RALLY', 'RANCH', 'RANGE', 'RAPID', 'RATIO',
  'REACH', 'REACT', 'READY', 'REALM', 'REBEL', 'RESET', 'RIDGE', 'RIGHT', 'RIVAL', 'RIVER',
  'ROUTE', 'ROYAL', 'RULER', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SCOUT', 'SEDAN', 'SENSE',
  'SERVE', 'SETUP', 'SHADE', 'SHAFT', 'SHAKE', 'SHAME', 'SHAPE', 'SHARE', 'SHARP', 'SHEET',
  'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SIGHT', 'SKILL', 'SMART',
  'SMILE', 'SMOKE', 'SOLID', 'SOLVE', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPARK', 'SPEAK',
  'SPEED', 'SPICE', 'SPINE', 'SPITE', 'SPLIT', 'SPOON', 'SPORT', 'STAFF', 'STAGE', 'STAIN',
  'STAKE', 'STAMP', 'STAND', 'STARE', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STICK',
  'STILL', 'STOCK', 'STONE', 'STORE', 'STORM', 'STORY', 'STRAP', 'SUGAR', 'SUITE', 'SUPER',
  'SWEET', 'SWIFT', 'SWORD', 'TABLE', 'TASTE', 'TEACH', 'THEME', 'THICK', 'THING', 'THINK',
  'THIRD', 'TITLE', 'TOTAL', 'TOUCH', 'TOWER', 'TRACE', 'TRACK', 'TRADE', 'TRAIL', 'TRAIN',
  'TRAIT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRUCK', 'TRUTH', 'TWICE', 'UNCLE', 'UNDER',
  'UNION', 'UNITY', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'VALID', 'VALUE', 'VIDEO', 'VIRAL',
  'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH',
  'WHILE', 'WHITE', 'WHOLE', 'WOUND', 'WRITE', 'YIELD', 'YOUNG', 'YOUTH', 'ZEBRA', 'ZEROS'
]);

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export function evaluateGuess(guess: string, target: string): LetterStatus[] {
  const result: LetterStatus[] = Array(5).fill('absent');
  const targetChars = target.split('');
  const guessChars = guess.split('');

  // Pass 1: exact matches (green)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct';
      targetChars[i] = '#'; // consume
      guessChars[i] = '*';
    }
  }

  // Pass 2: present elsewhere (yellow)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== '*') {
      const foundIndex = targetChars.indexOf(guessChars[i]);
      if (foundIndex !== -1) {
        result[i] = 'present';
        targetChars[foundIndex] = '#'; // consume
      }
    }
  }

  return result;
}

// AI Opponent simulation guess strategy
export function generateAiGuess(
  turnIndex: number,
  targetWord: string,
  previousGuesses: string[],
  knownLetters: { correct: (string | null)[]; present: string[]; absent: string[] }
): string {
  // Turn 0: Classic optimal openers
  const openers = ['CRANE', 'SLATE', 'TRACE', 'AUDIO', 'ROBOT', 'LOGIC'];
  if (turnIndex === 0) {
    return openers[Math.floor(Math.random() * openers.length)];
  }

  // Turn 1-2: filter candidate words matching current known letters
  const candidatePool = Array.from(VALID_GUESSES).filter((word) => {
    if (previousGuesses.includes(word)) return false;
    // Check known correct positions
    for (let i = 0; i < 5; i++) {
      if (knownLetters.correct[i] && word[i] !== knownLetters.correct[i]) {
        return false;
      }
    }
    // Check absent letters
    for (const char of knownLetters.absent) {
      if (word.includes(char) && !knownLetters.correct.includes(char) && !knownLetters.present.includes(char)) {
        return false;
      }
    }
    // Check present letters exist
    for (const char of knownLetters.present) {
      if (!word.includes(char)) return false;
    }
    return true;
  });

  // If we reach turn 3 or 4, or candidates are few, AI has a high probability to hit the target
  if (turnIndex >= 3 && Math.random() > 0.3) {
    return targetWord;
  }

  if (candidatePool.length > 0) {
    return candidatePool[Math.floor(Math.random() * candidatePool.length)];
  }

  return targetWord;
}
