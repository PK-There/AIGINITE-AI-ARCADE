'use client'

import { Team, LeaderboardEntry, ScoringConfig } from '../types';

export const ROUND_CONFIG = {
  roundName: 'ROUND 2',
  roundTitle: 'AI WHO AM I?',
  tagline: 'Ask smart. Think smarter.',
  roundDurationSeconds: 120, // 2 minutes
  maxQuestions: 5,
  questionOptionCount: 6,
  warningTimeThresholdSeconds: 30,
};

export const SCORING_CONFIG: ScoringConfig = {
  baseCorrectScore: 500,
  bonusPerUnusedQuestion: {
    1: 450, // 1 question used: total 950 base
    2: 380, // 2 questions used: total 880 base
    3: 280, // 3 questions used: total 780 base
    4: 150, // 4 questions used: total 650 base
    5: 0,   // 5 questions used: total 500 base
  },
  timeBonusFactor: 2, // 2 points per second saved
  wrongGuessPenalty: 0,
  maxPossibleScore: 1000,
};

export const SAMPLE_TEAMS: Team[] = [
  {
    id: 'team_neural_ninjas',
    name: 'NEURAL NINJAS',
    college: 'Dept. of Computer Science & AI',
    avatarSeed: 'ninja',
  },
  {
    id: 'team_ai_avengers',
    name: 'AI AVENGERS',
    college: 'Robotics & Automation Society',
    avatarSeed: 'avengers',
  },
  {
    id: 'team_code_titans',
    name: 'CODE TITANS',
    college: 'Dept. of Information Technology',
    avatarSeed: 'titans',
  },
  {
    id: 'team_byte_force',
    name: 'BYTE FORCE',
    college: 'ACM Student Chapter',
    avatarSeed: 'force',
  },
  {
    id: 'team_tech_warriors',
    name: 'TECH WARRIORS',
    college: 'IEEE Student Branch',
    avatarSeed: 'warriors',
  },
  {
    id: 'team_quantum_pulse',
    name: 'QUANTUM PULSE',
    college: 'Center for Data Intelligence',
    avatarSeed: 'quantum',
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb_1',
    rank: 1,
    teamName: 'AI AVENGERS',
    score: 890,
    questionsUsed: 2,
    timeTakenSec: 45,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat A',
  },
  {
    id: 'lb_2',
    rank: 2,
    teamName: 'CODE TITANS',
    score: 810,
    questionsUsed: 3,
    timeTakenSec: 62,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat A',
  },
  {
    id: 'lb_3',
    rank: 3,
    teamName: 'BYTE FORCE',
    score: 760,
    questionsUsed: 3,
    timeTakenSec: 88,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat B',
  },
  {
    id: 'lb_4',
    rank: 4,
    teamName: 'TECH WARRIORS',
    score: 720,
    questionsUsed: 4,
    timeTakenSec: 74,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat B',
  },
  {
    id: 'lb_5',
    rank: 5,
    teamName: 'QUANTUM PULSE',
    score: 560,
    questionsUsed: 5,
    timeTakenSec: 104,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat C',
  },
];
