export type EntityCategory = 
  | 'Technology Personality'
  | 'Famous Person'
  | 'Internet Personality'
  | 'Movie Character'
  | 'Fictional Character'
  | 'Celebrity'
  | 'Famous Movie'
  | 'Famous Object'
  | 'Gaming & Anime Character';

export interface MysteryEntity {
  id: string;
  name: string;
  category: EntityCategory;
  description: string;
  aliases: string[];
  attributes: Record<string, boolean>;
  tags: string[];
  questions?: { text: string; answer: boolean }[];
}

export interface QuestionDefinition {
  id: string;
  text: string;
  attributeKey: string;
  categoryHint?: string;
  evaluate?: (entity: MysteryEntity) => boolean;
}

export interface AskedQuestion {
  questionId: string;
  questionText: string;
  answer: boolean; // true = YES, false = NO
  timestamp: number;
  questionNumber: number;
}

export interface Team {
  id: string;
  name: string;
  college?: string;
  avatarSeed: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  teamName: string;
  score: number;
  questionsUsed: number;
  timeTakenSec: number;
  isCurrentTeam?: boolean;
  status: 'CORRECT' | 'WRONG' | 'TIMEOUT';
  completedAt: string;
}

export type GameScreen = 
  | 'INTRO'
  | 'INITIALIZING'
  | 'GAMEPLAY'
  | 'RESULT'
  | 'ROUND_COMPLETE'
  | 'LEADERBOARD';

export interface GameState {
  screen: GameScreen;
  team: Team;
  roundNumber: number;
  roundDurationSec: number;
  timeRemainingSec: number;
  startTime: number | null;
  endTime: number | null;
  mysteryEntity: MysteryEntity | null;
  availableQuestions: QuestionDefinition[];
  selectedQuestionId: string | null;
  questionHistory: AskedQuestion[];
  maxQuestions: number;
  isAIAnalyzing: boolean;
  latestAnswer: {
    questionText: string;
    answer: boolean;
  } | null;
  finalGuess: string;
  guessCorrect: boolean;
  finalScore: number;
  soundEnabled: boolean;
}

export interface ScoringConfig {
  baseCorrectScore: number;
  bonusPerUnusedQuestion: Record<number, number>; // questions used -> points
  timeBonusFactor: number; // extra points per remaining second
  wrongGuessPenalty: number;
  maxPossibleScore: number;
}
