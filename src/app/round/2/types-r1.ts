export type PlayerId = 1 | 2 | 3 | 4;
export type PlayerStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

export interface PlayerScoreData {
  playerScore: number;
  correctAnswers: number;
  wrongAnswers: number;
  completionTime: number; // in seconds
  speedBonus: number;
  finalSubgameScore: number;
  completedAt?: string;
}

export interface TeamState {
  teamName: string;
  teamId: string;
  currentStage: PlayerId | 5; // 5 is Victory/Summary
  teamScore: number;
  totalTime: number; // cumulative seconds
  playerStatus: Record<PlayerId, PlayerStatus>;
  playerScores: Record<PlayerId, PlayerScoreData>;
  startTime: number | null; // epoch timestamp
  isFinished: boolean;
}

export const PLAYER_CODES: Record<PlayerId, string> = {
  1: 'A7X92',
  2: 'K4P81',
  3: 'M9Q32',
  4: 'T6B47',
};

export const PLAYER_INFO: Record<PlayerId, { name: string; role: string; icon: string; title: string; color: string; desc: string }> = {
  1: {
    name: 'Player 1',
    role: 'Cyber Historian & AI Lore',
    icon: 'Brain',
    title: 'Pop Culture & Tech Quiz',
    color: '#00F0FF',
    desc: 'High-speed trivia on AI milestones, sci-fi lore, neural networks, and modern tech culture.'
  },
  2: {
    name: 'Player 2',
    role: 'Lexical Hacker',
    icon: 'Terminal',
    title: 'Wordle Race vs AI',
    color: '#39FF14',
    desc: 'Race against autonomous AI agent "NEXUS-9" to crack a 5-letter cryptographic cyber keyword.'
  },
  3: {
    name: 'Player 3',
    role: 'Synthetic Forensic Inspector',
    icon: 'Eye',
    title: 'Identify Deepfake Detective',
    color: '#FF007F',
    desc: 'Analyze visual artifacts, specular reflections, and synthetic hallucinations to spot AI creations.'
  },
  4: {
    name: 'Player 4',
    role: 'Neural Accelerator',
    icon: 'Zap',
    title: 'Rapid Fire Brain Rush',
    color: '#FFB800',
    desc: '8 high-velocity micro-challenges: logic gates, reflex sequences, vector logos, and binary code.'
  }
};

export const INITIAL_PLAYER_SCORE: PlayerScoreData = {
  playerScore: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  completionTime: 0,
  speedBonus: 0,
  finalSubgameScore: 0,
};

export const INITIAL_TEAM_STATE: TeamState = {
  teamName: 'CyberPhantoms',
  teamId: 'AIG-8821',
  currentStage: 1,
  teamScore: 0,
  totalTime: 0,
  playerStatus: {
    1: 'ACTIVE',
    2: 'LOCKED',
    3: 'LOCKED',
    4: 'LOCKED',
  },
  playerScores: {
    1: { ...INITIAL_PLAYER_SCORE },
    2: { ...INITIAL_PLAYER_SCORE },
    3: { ...INITIAL_PLAYER_SCORE },
    4: { ...INITIAL_PLAYER_SCORE },
  },
  startTime: null,
  isFinished: false,
};

// Unified scoring helper: Base + Speed bonus
export function calculateSpeedBonus(timeLimit: number, timeTaken: number, multiplier: number = 10): number {
  return Math.max(0, Math.round((timeLimit - timeTaken) * multiplier));
}
