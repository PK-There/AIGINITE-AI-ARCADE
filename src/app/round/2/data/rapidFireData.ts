'use client'

export type RapidChallengeType =
  | 'sequence'
  | 'logo'
  | 'reflex'
  | 'matching'
  | 'logic'
  | 'math'
  | 'boolean'
  | 'acronym';

export interface RapidChallenge {
  id: number;
  type: RapidChallengeType;
  title: string;
  subtitle: string;
  timeLimit: number; // 6 to 10 seconds for rapid rush
  points: number;
  
  // Specific data for each challenge type:
  sequenceData?: {
    sequence: (number | string)[];
    missingIndex: number;
    options: number[];
    correctAnswer: number;
  };
  
  logoData?: {
    prompt: string;
    logos: {
      id: string;
      name: string;
      svgKey: 'openai' | 'anthropic' | 'nvidia' | 'python' | 'github' | 'react';
    }[];
    correctId: string;
  };
  
  reflexData?: {
    targetSequence: ('CYAN' | 'MAGENTA' | 'LIME' | 'AMBER')[];
    instructions: string;
  };
  
  matchingData?: {
    pioneer: string;
    roleDesc: string;
    options: string[];
    correctOption: string;
  };
  
  logicData?: {
    gate: 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR';
    inputA: number;
    inputB: number;
    options: number[];
    correctAnswer: number;
    explanation: string;
  };

  mathData?: {
    question: string;
    options: string[];
    correctIndex: number;
  };

  booleanData?: {
    expression: string;
    options: ('TRUE' | 'FALSE')[];
    correctAnswer: 'TRUE' | 'FALSE';
  };

  acronymData?: {
    acronym: string;
    prompt: string;
    options: string[];
    correctIndex: number;
  };
}

export const RAPID_FIRE_CHALLENGES: RapidChallenge[] = [
  {
    id: 1,
    type: 'sequence',
    title: 'NEURAL SEQUENCE PREDICTOR',
    subtitle: 'Identify the next token in the exponential scaling sequence',
    timeLimit: 8,
    points: 150,
    sequenceData: {
      sequence: [2, 4, 8, 16, '?'],
      missingIndex: 4,
      options: [24, 30, 32, 64],
      correctAnswer: 32,
    },
  },
  {
    id: 2,
    type: 'logo',
    title: 'SILICON BRAND IDENTIFIER',
    subtitle: 'Which vector silhouette represents the company behind Claude AI?',
    timeLimit: 8,
    points: 150,
    logoData: {
      prompt: 'Identify ANTHROPIC',
      logos: [
        { id: 'logo-openai', name: 'OpenAI Spiral', svgKey: 'openai' },
        { id: 'logo-anthropic', name: 'Anthropic Geometric A', svgKey: 'anthropic' },
        { id: 'logo-nvidia', name: 'NVIDIA Eye', svgKey: 'nvidia' },
        { id: 'logo-python', name: 'Python Snakes', svgKey: 'python' },
      ],
      correctId: 'logo-anthropic',
    },
  },
  {
    id: 3,
    type: 'reflex',
    title: 'SYNAPTIC REFLEX RUSH',
    subtitle: 'Tap the neon nodes in exact chronological order before the clock runs out!',
    timeLimit: 7,
    points: 200,
    reflexData: {
      targetSequence: ['CYAN', 'MAGENTA', 'LIME', 'AMBER'],
      instructions: 'TAP: CYAN ➔ MAGENTA ➔ LIME ➔ AMBER',
    },
  },
  {
    id: 4,
    type: 'matching',
    title: 'AI TITAN ARCHITECTS',
    subtitle: 'Who co-founded Google DeepMind and was awarded the 2024 Nobel Prize in Chemistry for AlphaFold?',
    timeLimit: 8,
    points: 150,
    matchingData: {
      pioneer: 'Nobel Laureate & DeepMind CEO',
      roleDesc: 'Created AlphaGo and AlphaFold protein folding engine',
      options: ['Demis Hassabis', 'Sam Altman', 'Yann LeCun', 'Jensen Huang'],
      correctOption: 'Demis Hassabis',
    },
  },
  {
    id: 5,
    type: 'logic',
    title: 'BOOLEAN QUANTUM GATE',
    subtitle: 'Evaluate digital circuit logic output in real-time',
    timeLimit: 8,
    points: 150,
    logicData: {
      gate: 'XOR',
      inputA: 1,
      inputB: 1,
      options: [0, 1],
      correctAnswer: 0,
      explanation: 'XOR (Exclusive OR) outputs 1 only when inputs differ. When both inputs are 1, output is 0.',
    },
  },
  {
    id: 6,
    type: 'math',
    title: 'MEMORY & HARDWARE MATH',
    subtitle: 'How many bytes are in a single 64-bit IEEE-754 floating point number?',
    timeLimit: 8,
    points: 150,
    mathData: {
      question: '64 bits = ___ bytes',
      options: ['4 Bytes', '8 Bytes', '16 Bytes', '64 Bytes'],
      correctIndex: 1, // 8 Bytes
    },
  },
  {
    id: 7,
    type: 'boolean',
    title: 'LOGICAL SHORT-CIRCUIT',
    subtitle: 'Evaluate the compound boolean evaluation instantly',
    timeLimit: 7,
    points: 150,
    booleanData: {
      expression: '!( (true && false) || (!true) )',
      options: ['TRUE', 'FALSE'],
      correctAnswer: 'TRUE',
    },
  },
  {
    id: 8,
    type: 'acronym',
    title: 'DEEP TECH DECRYPTION',
    subtitle: 'What does "RLHF" stand for in modern AI alignment training?',
    timeLimit: 8,
    points: 200,
    acronymData: {
      acronym: 'RLHF',
      prompt: 'Identify the exact training methodology phrase:',
      options: [
        'Reinforcement Learning from Human Feedback',
        'Real-time Latent Hyperparameter Fine-tuning',
        'Recursive Layered Heuristic Filtering',
        'Randomized Loss Hessian Framework'
      ],
      correctIndex: 0,
    },
  },
];
