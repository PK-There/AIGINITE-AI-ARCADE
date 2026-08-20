'use client'

export interface RivalTeam {
  rank: number;
  teamName: string;
  teamId: string;
  p1Score: number;
  p2Score: number;
  p3Score: number;
  p4Score: number;
  totalScore: number;
  durationSeconds: number;
  status: 'FINISHED' | 'ROUND 1 COMPLETED';
  avatarColor: string;
}

export const TOURNAMENT_RIVALS: RivalTeam[] = [
  {
    rank: 1,
    teamName: 'NeuralKnights',
    teamId: 'AIG-9901',
    p1Score: 1350,
    p2Score: 1550,
    p3Score: 1600,
    p4Score: 1820,
    totalScore: 6320,
    durationSeconds: 142,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#00F0FF',
  },
  {
    rank: 2,
    teamName: 'ByteBandits',
    teamId: 'AIG-4412',
    p1Score: 1280,
    p2Score: 1490,
    p3Score: 1520,
    p4Score: 1740,
    totalScore: 6030,
    durationSeconds: 165,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#FF007F',
  },
  {
    rank: 3,
    teamName: 'QuantumQuarks',
    teamId: 'AIG-7731',
    p1Score: 1210,
    p2Score: 1420,
    p3Score: 1480,
    p4Score: 1690,
    totalScore: 5800,
    durationSeconds: 184,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#39FF14',
  },
  {
    rank: 5,
    teamName: 'GlitchGangs',
    teamId: 'AIG-3329',
    p1Score: 1100,
    p2Score: 1310,
    p3Score: 1400,
    p4Score: 1550,
    totalScore: 5360,
    durationSeconds: 210,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#FFB800',
  },
  {
    rank: 6,
    teamName: 'SynthSynapse',
    teamId: 'AIG-1204',
    p1Score: 1040,
    p2Score: 1250,
    p3Score: 1380,
    p4Score: 1510,
    totalScore: 5180,
    durationSeconds: 235,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#A855F7',
  },
  {
    rank: 7,
    teamName: 'SiliconSamurais',
    teamId: 'AIG-8820',
    p1Score: 980,
    p2Score: 1200,
    p3Score: 1320,
    p4Score: 1450,
    totalScore: 4950,
    durationSeconds: 250,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#EC4899',
  }
];

export function calculateTournamentRank(userScore: number, userDuration: number): { rank: number; percentile: number; totalTeams: number } {
  const totalTeams = 64;
  if (userScore >= 6400) return { rank: 1, percentile: 99, totalTeams };
  if (userScore >= 6100) return { rank: 2, percentile: 97, totalTeams };
  if (userScore >= 5850) return { rank: 3, percentile: 95, totalTeams };
  if (userScore >= 5400) return { rank: 4, percentile: 94, totalTeams };
  if (userScore >= 5000) return { rank: 6, percentile: 90, totalTeams };
  if (userScore >= 4500) return { rank: 9, percentile: 86, totalTeams };
  if (userScore >= 3800) return { rank: 14, percentile: 78, totalTeams };
  if (userScore >= 2800) return { rank: 22, percentile: 65, totalTeams };
  return { rank: 31, percentile: 52, totalTeams };
}
