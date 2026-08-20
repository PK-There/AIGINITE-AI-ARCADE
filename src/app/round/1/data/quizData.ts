'use client'

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timeLimit: number; // in seconds, default 15
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'AI & SCI-FI CINEMA',
    question: 'In Stanley Kubrick’s "2001: A Space Odyssey", what is the iconic AI supercomputer that malfunctions called?',
    options: ['SKYNET', 'HAL 9000', 'WOPR', 'GERTY'],
    correctIndex: 1,
    explanation: 'HAL (Heuristically programmed ALgorithmic computer) 9000 is the sentient AI antagonist aboard Discovery One.',
    difficulty: 'EASY',
    timeLimit: 15,
  },
  {
    id: 2,
    category: 'NEURAL ARCHITECTURES',
    question: 'The groundbreaking 2017 Google paper introducing the Transformer architecture is titled:',
    options: [
      'Transformers: More Than Meets The Eye',
      'Attention Is All You Need',
      'Deep Residual Learning for Vision',
      'Scaling Laws for Neural Language Models'
    ],
    correctIndex: 1,
    explanation: '"Attention Is All You Need" by Vaswani et al. (2017) revolutionized modern NLP and paved the way for LLMs.',
    difficulty: 'MEDIUM',
    timeLimit: 15,
  },
  {
    id: 3,
    category: 'CYBERPUNK LORE & GAMING',
    question: 'In the Cyberpunk 2077 universe and Neuromancer lore, what is the term for the rogue digital frontier containing hostile feral AIs?',
    options: ['The Deep Web', 'The Blackwall', 'NetZero', 'The Matrix Gateway'],
    correctIndex: 1,
    explanation: 'The Blackwall is the defensive ICE barrier erected by NetWatch to quarantine deadly rogue military AIs from the Old Net.',
    difficulty: 'MEDIUM',
    timeLimit: 15,
  },
  {
    id: 4,
    category: 'TECH HISTORY & CHIPS',
    question: 'Which chipmaker introduced the concept of the GPU in 1999 with the GeForce 256 and now powers majority AI clusters?',
    options: ['Intel', 'NVIDIA', 'AMD', 'Qualcomm'],
    correctIndex: 1,
    explanation: 'NVIDIA launched the GeForce 256 in 1999, defining the term GPU and later transitioning to dominate deep learning hardware with CUDA.',
    difficulty: 'EASY',
    timeLimit: 15,
  },
  {
    id: 5,
    category: 'AI PIONEERS',
    question: 'Who formulated the famous imitation game test in 1950 to evaluate if a machine exhibits human-equivalent intelligence?',
    options: ['John von Neumann', 'Alan Turing', 'Claude Shannon', 'Marvin Minsky'],
    correctIndex: 1,
    explanation: 'Alan Turing proposed the "Turing Test" in his seminal 1950 paper "Computing Machinery and Intelligence".',
    difficulty: 'EASY',
    timeLimit: 15,
  },
  {
    id: 6,
    category: 'LLM TERMINOLOGY',
    question: 'In modern generative models, what does "Temperature" parameter control in text generation?',
    options: [
      'The physical CPU thermal temperature',
      'The randomness and creative variance of generated tokens',
      'The speed of token inference in milliseconds',
      'The maximum memory allocated for KV cache'
    ],
    correctIndex: 1,
    explanation: 'Temperature scales the logits before Softmax: lower values produce deterministic outputs, higher values increase creativity/randomness.',
    difficulty: 'HARD',
    timeLimit: 15,
  },
  {
    id: 7,
    category: 'AUTONOMOUS AGENTS',
    question: 'What technique allows an LLM to dynamically fetch external real-time documents before generating its response?',
    options: ['RLHF', 'RAG (Retrieval-Augmented Generation)', 'LoRA', 'Quantization'],
    correctIndex: 1,
    explanation: 'RAG retrieves relevant domain information from vector vectorstores to ground the model and avoid hallucinations.',
    difficulty: 'MEDIUM',
    timeLimit: 15,
  },
];
