// Automatically generated from SET 01.docx
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
  timeLimit: number;
  points: number;
  
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
    "id": 1,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $3 \\rightarrow 9 \\rightarrow 27 \\rightarrow 81 \\rightarrow ?$",
      "options": [
        "162",
        "243",
        "324",
        "729"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 2,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the current CEO of Microsoft?",
      "options": [
        "Satya Nadella",
        "Sundar Pichai",
        "Tim Cook",
        "Andy Jassy"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 3,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the Claude AI model family?",
      "options": [
        "OpenAI",
        "Anthropic",
        "Meta",
        "Google"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 4,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A stylized green chameleon/gecko logo belongs to which OS/tech brand?",
      "options": [
        "openSUSE",
        "Python",
        "Android",
        "Docker"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 5,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $15 \\times 14$?",
      "options": [
        "190",
        "210",
        "225",
        "240"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 6,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a relational database?",
      "options": [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Oracle"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 7,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: Identify the binary representation of decimal number 10:",
      "options": [
        "1010",
        "1100",
        "1001",
        "1110"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 8,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does TPU stand for in Google's AI infrastructure?",
      "options": [
        "Tensor Processing Unit",
        "Total Performance Unit",
        "Terminal Power Utility",
        "Transfer Protocol Unit"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 9,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which language uses the print function `System.out.println()`?",
      "options": [
        "C++",
        "Java",
        "C#",
        "Swift"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 10,
    "type": "math",
    "title": "RAPID FIRE - SET 01",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If all A are B, and all B are C, are all A guaranteed to be C?",
      "options": [
        "Yes",
        "No",
        "Only if B is non-empty",
        "Cannot be determined"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 11,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $2 \\rightarrow 6 \\rightarrow 12 \\rightarrow 20 \\rightarrow 30 \\rightarrow ?$",
      "options": [
        "40",
        "42",
        "44",
        "48"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 12,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO and co-founder of NVIDIA?",
      "options": [
        "Jensen Huang",
        "Lisa Su",
        "Pat Gelsinger",
        "Morris Chang"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 13,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company created the Sora text-to-video model?",
      "options": [
        "Runway",
        "OpenAI",
        "Pika Labs",
        "Midjourney"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 14,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A blue whale carrying shipping containers is the mascot for:",
      "options": [
        "Kubernetes",
        "Docker",
        "Linux",
        "Postman"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 15,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $2^8$?",
      "options": [
        "128",
        "256",
        "512",
        "1024"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 16,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a web browser engine?",
      "options": [
        "Blink",
        "Gecko",
        "WebKit",
        "Django"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 17,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the standard port number for HTTPS traffic?",
      "options": [
        "80",
        "443",
        "8080",
        "22"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 18,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does SSD stand for?",
      "options": [
        "Solid State Drive",
        "Silicon Storage Disk",
        "System Speed Drive",
        "Synchronous Static Drive"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 19,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In Python, what symbol is used to start a single-line comment?",
      "options": [
        "`//`",
        "`#`",
        "`/*`",
        "`--`"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 20,
    "type": "math",
    "title": "RAPID FIRE - SET 02",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: A bat and a ball cost $1.10 total. The bat costs $1.00 more than the ball. How much is the ball?",
      "options": [
        "$0.10",
        "$0.05",
        "$0.01",
        "$0.15"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 21,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $1 \\rightarrow 4 \\rightarrow 9 \\rightarrow 16 \\rightarrow 25 \\rightarrow ?$",
      "options": [
        "30",
        "36",
        "49",
        "64"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 22,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Alphabet & Google?",
      "options": [
        "Sundar Pichai",
        "Sergey Brin",
        "Larry Page",
        "Neal Mohan"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 23,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company is behind the image generation engine Midjourney?",
      "options": [
        "Midjourney, Inc.",
        "Stability AI",
        "Adobe",
        "OpenAI"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 24,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A white origami crane / bird on an orange square represents:",
      "options": [
        "GitLab",
        "Postman",
        "Claude",
        "Kaggle"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 25,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $75\\%$ of 240?",
      "options": [
        "160",
        "180",
        "190",
        "200"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 26,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an operating system?",
      "options": [
        "Ubuntu",
        "Fedora",
        "Apache",
        "Solaris"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 27,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: How many bits are in a single Byte?",
      "options": [
        "4",
        "8",
        "16",
        "32"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 28,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does VRAM stand for?",
      "options": [
        "Video Random Access Memory",
        "Virtual Read Access Module",
        "Variable Rate Allocation Memory",
        "Vector Random Array Module"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 29,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which data structure uses the First-In, First-Out (FIFO) principle?",
      "options": [
        "Stack",
        "Queue",
        "Tree",
        "Graph"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 30,
    "type": "math",
    "title": "RAPID FIRE - SET 03",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If 5 machines make 5 widgets in 5 minutes, how many minutes do 100 machines need to make 100 widgets?",
      "options": [
        "100 minutes",
        "5 minutes",
        "20 minutes",
        "1 minute"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 31,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $5 \\rightarrow 11 \\rightarrow 23 \\rightarrow 47 \\rightarrow ?$",
      "options": [
        "94",
        "95",
        "96",
        "101"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 32,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of OpenAI?",
      "options": [
        "Sam Altman",
        "Greg Brockman",
        "Mira Murati",
        "Dario Amodei"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 33,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company created the LLaMA family of open LLMs?",
      "options": [
        "Meta",
        "Microsoft",
        "Amazon",
        "Mistral"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 34,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A yellow smiling cartoon face emoji serves as the official icon for:",
      "options": [
        "Hugging Face",
        "Snap",
        "Lemonade",
        "Discord"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 35,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $17 \\times 6$?",
      "options": [
        "98",
        "102",
        "108",
        "112"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 36,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a compiled programming language?",
      "options": [
        "C++",
        "Rust",
        "Go",
        "JavaScript"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 37,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the hexadecimal representation of decimal 15?",
      "options": [
        "E",
        "F",
        "10",
        "A"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 38,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does NIC stand for in networking?",
      "options": [
        "Network Interface Card",
        "Node Interconnect Chip",
        "Network Integrated Controller",
        "Null Interface Channel"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 39,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which data structure operates on a Last-In, First-Out (LIFO) order?",
      "options": [
        "Queue",
        "Stack",
        "Array",
        "Linked List"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 40,
    "type": "math",
    "title": "RAPID FIRE - SET 04",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: Some cats are dogs. No dogs are birds. Can we conclude that no cats are birds?",
      "options": [
        "Yes",
        "No",
        "Only if all cats are dogs",
        "Cannot be evaluated"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 41,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $1 \\rightarrow 1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 5 \\rightarrow 8 \\rightarrow 13 \\rightarrow ?$",
      "options": [
        "18",
        "20",
        "21",
        "24"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 42,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Apple Inc.?",
      "options": [
        "Tim Cook",
        "Craig Federighi",
        "Jony Ive",
        "Eddy Cue"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 43,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the Copilot programming autocomplete tool with OpenAI?",
      "options": [
        "GitHub / Microsoft",
        "JetBrains",
        "Oracle",
        "Atlassian"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 44,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A three-pronged purple fork/pitchfork-style symbol represents:",
      "options": [
        "GraphQL",
        "Bitbucket",
        "Kubernetes",
        "Vite"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 45,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $\\sqrt{625}$?",
      "options": [
        "15",
        "25",
        "35",
        "45"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 46,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a JavaScript front-end library/framework?",
      "options": [
        "React",
        "Vue",
        "Angular",
        "Flask"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 47,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the default SSH port?",
      "options": [
        "21",
        "22",
        "23",
        "25"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 48,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does ALU stand for in CPU design?",
      "options": [
        "Arithmetic Logic Unit",
        "Automated Link Utility",
        "Array Linear Unit",
        "Algorithmic Logic Utility"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 49,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: What keyword is used to declare a constant in modern JavaScript?",
      "options": [
        "`var`",
        "`let`",
        "`const`",
        "`static`"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 50,
    "type": "math",
    "title": "RAPID FIRE - SET 05",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: How many birthdays does an average human have in a lifetime?",
      "options": [
        "1",
        "70+",
        "365",
        "12"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 51,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $100 \\rightarrow 96 \\rightarrow 88 \\rightarrow 72 \\rightarrow ?$",
      "options": [
        "40",
        "44",
        "48",
        "56"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 52,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Meta?",
      "options": [
        "Mark Zuckerberg",
        "Eduardo Saverin",
        "Dustin Moskovitz",
        "Sheryl Sandberg"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 53,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which startup created the text-to-music AI generator Suno?",
      "options": [
        "Suno, Inc.",
        "ElevenLabs",
        "Udio",
        "Boomy"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 54,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: An octagonal blue ship's wheel with 7 spokes is the logo of:",
      "options": [
        "Kubernetes",
        "Helm",
        "Docker",
        "OpenShift"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 55,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $18 \\times 12$?",
      "options": [
        "206",
        "216",
        "226",
        "236"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 56,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an Amazon Web Services (AWS) product?",
      "options": [
        "EC2",
        "S3",
        "Lambda",
        "BigQuery"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 57,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the binary value of the decimal number 8?",
      "options": [
        "0110",
        "1000",
        "1001",
        "1100"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 58,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does CMOS stand for in motherboard firmware?",
      "options": [
        "Complementary Metal-Oxide-Semiconductor",
        "Central Memory Operating System",
        "Core Micro-Optic Silicon",
        "Circuit Mode Optical Socket"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 59,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In SQL, which command extracts data from a database table?",
      "options": [
        "EXTRACT",
        "GET",
        "SELECT",
        "FETCH"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 60,
    "type": "math",
    "title": "RAPID FIRE - SET 06",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If you overtake the person in 2nd place in a sprint race, what position are you in?",
      "options": [
        "1st",
        "2nd",
        "3rd",
        "Last"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 61,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $4 \\rightarrow 9 \\rightarrow 19 \\rightarrow 39 \\rightarrow 79 \\rightarrow ?$",
      "options": [
        "149",
        "158",
        "159",
        "169"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 62,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Amazon?",
      "options": [
        "Andy Jassy",
        "Jeff Bezos",
        "Werner Vogels",
        "Brian Olsavsky"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 63,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the Gemini multimodal model?",
      "options": [
        "Google DeepMind",
        "Meta AI",
        "Anthropic",
        "Mistral"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 64,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A white ghost inside a bright yellow rounded square is the icon for:",
      "options": [
        "Snapchat",
        "Phantom",
        "Ghostery",
        "Telegram"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 65,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $144 \\div 12 \\times 5$?",
      "options": [
        "50",
        "60",
        "72",
        "84"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 66,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an asymmetric encryption algorithm?",
      "options": [
        "RSA",
        "ECC",
        "Diffie-Hellman",
        "AES"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 67,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the maximum decimal value of an 8-bit unsigned integer?",
      "options": [
        "128",
        "255",
        "256",
        "512"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 68,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does RAID stand for in data storage?",
      "options": [
        "Redundant Array of Independent Disks",
        "Rapid Access Integrated Drive",
        "Random Array of Input Data",
        "Reliable Automated Interface Disk"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 69,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which C++ operator is used to allocate dynamic memory on the heap?",
      "options": [
        "`malloc`",
        "`alloc`",
        "`new`",
        "`create`"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 70,
    "type": "math",
    "title": "RAPID FIRE - SET 07",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If a doctor gives you 3 pills and tells you to take one every 30 minutes, how long will the pills last?",
      "options": [
        "30 minutes",
        "60 minutes",
        "90 minutes",
        "120 minutes"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 71,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $7 \\rightarrow 14 \\rightarrow 28 \\rightarrow 56 \\rightarrow 112 \\rightarrow ?$",
      "options": [
        "214",
        "224",
        "234",
        "244"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 72,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of AMD?",
      "options": [
        "Lisa Su",
        "Jensen Huang",
        "Pat Gelsinger",
        "Renee James"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 73,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company created the AI voice generation tool ElevenLabs?",
      "options": [
        "ElevenLabs",
        "Resemble AI",
        "WellSaid Labs",
        "Murf AI"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 74,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A green circle with 3 curved black soundwaves represents:",
      "options": [
        "Spotify",
        "Soundcloud",
        "Deezer",
        "Pandora"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 75,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $35^2$?",
      "options": [
        "1125",
        "1225",
        "1325",
        "1425"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 76,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a cloud provider?",
      "options": [
        "AWS",
        "Microsoft Azure",
        "Google Cloud Platform",
        "Apache Kafka"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 77,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: Which DNS record type maps a domain name directly to an IPv4 address?",
      "options": [
        "A Record",
        "AAAA Record",
        "CNAME Record",
        "MX Record"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 78,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does DRAM stand for?",
      "options": [
        "Dynamic Random Access Memory",
        "Digital Read Array Module",
        "Direct Routing Access Module",
        "Dual Random Access Memory"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 79,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which Git command creates a copy of an existing remote repository onto your local machine?",
      "options": [
        "`git clone`",
        "`git pull`",
        "`git branch`",
        "`git fork`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 80,
    "type": "math",
    "title": "RAPID FIRE - SET 08",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What has cities, but no houses; forests, but no trees; and water, but no fish?",
      "options": [
        "A globe / map",
        "A computer screen",
        "A dream",
        "A painting"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 81,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $2 \\rightarrow 3 \\rightarrow 5 \\rightarrow 7 \\rightarrow 11 \\rightarrow 13 \\rightarrow ?$",
      "options": [
        "15",
        "16",
        "17",
        "19"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 82,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Tesla and SpaceX?",
      "options": [
        "Elon Musk",
        "JB Straubel",
        "Peter Thiel",
        "Drew Baglino"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 83,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the DALL-E image generation tool?",
      "options": [
        "OpenAI",
        "Stability AI",
        "Midjourney",
        "Google"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 84,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A white origami-folded fox face on an orange background represents:",
      "options": [
        "MetaMask",
        "Firefox",
        "GitLab",
        "Redis"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 85,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $13 \\times 13 + 31$?",
      "options": [
        "190",
        "200",
        "210",
        "220"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 86,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a container orchestration or management tool?",
      "options": [
        "Kubernetes",
        "Docker Swarm",
        "Nomad",
        "Redis"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 87,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the total number of bits in an IPv4 address?",
      "options": [
        "16 bits",
        "32 bits",
        "64 bits",
        "128 bits"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 88,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does NVMe stand for in fast solid-state storage?",
      "options": [
        "Non-Volatile Memory Express",
        "Network Virtual Module Extension",
        "Native Vector Memory Engine",
        "Node Variable Memory Express"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 89,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: What built-in method in Python returns the length of a list or string?",
      "options": [
        "`len()`",
        "`length()`",
        "`size()`",
        "`count()`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 90,
    "type": "math",
    "title": "RAPID FIRE - SET 09",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: How many 0.5 cm slices can you cut from a 10 cm loaf of bread?",
      "options": [
        "5",
        "10",
        "20",
        "25"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 91,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $1 \\rightarrow 8 \\rightarrow 27 \\rightarrow 64 \\rightarrow ?$",
      "options": [
        "100",
        "121",
        "125",
        "216"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 92,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Adobe Systems?",
      "options": [
        "Shantanu Narayen",
        "Arvind Krishna",
        "Nikesh Arora",
        "George Kurian"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 93,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the Stable Diffusion open generative image architecture?",
      "options": [
        "Stability AI",
        "Midjourney",
        "OpenAI",
        "Meta"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 94,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A bright blue bird silhouette that was historically the icon for Twitter represented:",
      "options": [
        "Larry the Bird",
        "Sparky",
        "Piper",
        "Sky"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 95,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $96 \\div 6$?",
      "options": [
        "14",
        "16",
        "18",
        "19"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 96,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a network protocol?",
      "options": [
        "TCP",
        "UDP",
        "ICMP",
        "JSON"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 97,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the total number of bits in an IPv6 address?",
      "options": [
        "32 bits",
        "64 bits",
        "128 bits",
        "256 bits"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 98,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does ASIC stand for in specialized crypto and AI chips?",
      "options": [
        "Application-Specific Integrated Circuit",
        "Advanced Silicon Interface Controller",
        "Automated Signal Integrated Component",
        "Array-Specific Instruction Core"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 99,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In web development, which HTML tag is used to link an external JavaScript file?",
      "options": [
        "`<script>`",
        "`<javascript>`",
        "`<js>`",
        "`<link>`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 100,
    "type": "math",
    "title": "RAPID FIRE - SET 10",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: You have a match and enter a dark room containing a candle, an oil lamp, and a wood stove. What do you light first?",
      "options": [
        "The candle",
        "The oil lamp",
        "The wood stove",
        "The match"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 101,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $3 \\rightarrow 6 \\rightarrow 11 \\rightarrow 18 \\rightarrow 27 \\rightarrow ?$",
      "options": [
        "36",
        "38",
        "39",
        "42"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 102,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of IBM?",
      "options": [
        "Arvind Krishna",
        "Satya Nadella",
        "Sundar Pichai",
        "Shantanu Narayen"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 103,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which open-source code autocomplete extension directly rivals GitHub Copilot?",
      "options": [
        "Tabnine / Codeium",
        "Postman",
        "Docker Desktop",
        "Jenkins"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 104,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A white play button inside a red rounded rectangle is the logo of:",
      "options": [
        "YouTube",
        "Netflix",
        "Vimeo",
        "Twitch"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 105,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $25 \\times 16$?",
      "options": [
        "350",
        "400",
        "450",
        "500"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 106,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an interpreted scripting language?",
      "options": [
        "Python",
        "Ruby",
        "C",
        "PHP"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 107,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the binary representation of decimal 7?",
      "options": [
        "0111",
        "1001",
        "1011",
        "1111"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 108,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does PCB stand for in electronics manufacturing?",
      "options": [
        "Printed Circuit Board",
        "Primary Core Bus",
        "Process Control Block",
        "Programmable Circuit Base"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 109,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which SQL keyword is used to remove duplicate rows from a query result set?",
      "options": [
        "UNIQUE",
        "DISTINCT",
        "DIFFERENT",
        "REMOVE"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 110,
    "type": "math",
    "title": "RAPID FIRE - SET 11",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If yesterday was tomorrow, today would be Friday. What day is it today?",
      "options": [
        "Sunday",
        "Saturday",
        "Wednesday",
        "Friday"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 111,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $80 \\rightarrow 40 \\rightarrow 20 \\rightarrow 10 \\rightarrow ?$",
      "options": [
        "0",
        "2.5",
        "5",
        "7.5"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 112,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Dell Technologies?",
      "options": [
        "Michael Dell",
        "Pat Gelsinger",
        "Chuck Robbins",
        "Antonio Neri"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 113,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which open AI research lab developed Whisper, the automatic speech recognition system?",
      "options": [
        "OpenAI",
        "DeepMind",
        "Meta FAIR",
        "Baidu"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 114,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A green robot Android mascot is officially named:",
      "options": [
        "Bugdroid",
        "Andy",
        "Botty",
        "Droidy"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 115,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $21 \\times 9 + 11$?",
      "options": [
        "190",
        "200",
        "210",
        "220"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 116,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a NoSQL database?",
      "options": [
        "Cassandra",
        "CouchDB",
        "PostgreSQL",
        "Redis"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 117,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What status code represents \"Internal Server Error\" in HTTP responses?",
      "options": [
        "404",
        "403",
        "500",
        "502"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 118,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does DSP stand for in specialized signal processors?",
      "options": [
        "Digital Signal Processor",
        "Direct System Protocol",
        "Dual Silicon Processor",
        "Dynamic Storage Path"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 119,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In Git, which command stages changes in files for the next commit?",
      "options": [
        "`git add`",
        "`git stage`",
        "`git push`",
        "`git save`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 120,
    "type": "math",
    "title": "RAPID FIRE - SET 12",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: Two fathers and two sons go fishing. Each catches one fish. Why do they bring home exactly 3 fish?",
      "options": [
        "One escaped",
        "They are grandfather, father, and son",
        "One didn't count",
        "A fish was thrown back"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 121,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $6 \\rightarrow 13 \\rightarrow 27 \\rightarrow 55 \\rightarrow ?$",
      "options": [
        "110",
        "111",
        "112",
        "115"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 122,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Oracle Corporation?",
      "options": [
        "Safra Catz",
        "Larry Ellison",
        "Marc Benioff",
        "Bill McDermott"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 123,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company released the FLUX generative text-to-image model family?",
      "options": [
        "Black Forest Labs",
        "Midjourney",
        "Runway",
        "Stability AI"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 124,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: An orange silhouette of a running mail carrier/courier is the logo of:",
      "options": [
        "Postman",
        "FastMail",
        "Zapier",
        "Courier"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 125,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $16 \\times 16 - 56$?",
      "options": [
        "190",
        "200",
        "210",
        "220"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 126,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an open-source license?",
      "options": [
        "MIT",
        "Apache 2.0",
        "GNU GPL",
        "OAuth 2.0"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 127,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What status code represents \"Unauthorized\" in HTTP?",
      "options": [
        "400",
        "401",
        "403",
        "404"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 128,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does DMA stand for in computer architecture?",
      "options": [
        "Direct Memory Access",
        "Dynamic Module Allocation",
        "Digital Media Array",
        "Dual Mode Access"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 129,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In Python, which collection type is immutable once created?",
      "options": [
        "List",
        "Dictionary",
        "Tuple",
        "Set"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 130,
    "type": "math",
    "title": "RAPID FIRE - SET 13",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: If you have 6 apples and you take away 4, how many apples do you have?",
      "options": [
        "2",
        "4",
        "6",
        "0"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 131,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $128 \\rightarrow 64 \\rightarrow 32 \\rightarrow 16 \\rightarrow 8 \\rightarrow ?$",
      "options": [
        "6",
        "4",
        "2",
        "1"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 132,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Salesforce?",
      "options": [
        "Marc Benioff",
        "Bret Taylor",
        "Parker Harris",
        "Keith Block"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 133,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which conversational AI model was created by Anthropic to focus on Constitutional AI?",
      "options": [
        "Claude",
        "Gemini",
        "Pi",
        "Grok"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 134,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A stylized blue snowflake is the icon for which cloud data platform?",
      "options": [
        "Snowflake",
        "Databricks",
        "Cloudera",
        "Teradata"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 135,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $125 \\times 8$?",
      "options": [
        "800",
        "900",
        "1000",
        "1200"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 136,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a continuous integration / deployment tool?",
      "options": [
        "Jenkins",
        "CircleCI",
        "GitHub Actions",
        "Nginx"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 137,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the default MySQL database connection port?",
      "options": [
        "3306",
        "5432",
        "27017",
        "6379"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 138,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does BIOS stand for?",
      "options": [
        "Basic Input/Output System",
        "Binary Integrated Operating System",
        "Base Instruction Optical Socket",
        "Built-in Output System"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 139,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which CSS property is used to change the text color of an element?",
      "options": [
        "`text-color`",
        "`font-color`",
        "`color`",
        "`text-style`"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 140,
    "type": "math",
    "title": "RAPID FIRE - SET 14",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What comes once in a minute, twice in a moment, but never in a thousand years?",
      "options": [
        "The letter 'M'",
        "A second",
        "A heartbeat",
        "Leap year"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 141,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $2 \\rightarrow 5 \\rightarrow 10 \\rightarrow 17 \\rightarrow 26 \\rightarrow ?$",
      "options": [
        "35",
        "37",
        "39",
        "41"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 142,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Uber?",
      "options": [
        "Dara Khosrowshahi",
        "Travis Kalanick",
        "Logan Green",
        "Tony Xu"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 143,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: Which company developed the conversational AI chatbot named Grok on X?",
      "options": [
        "xAI",
        "OpenAI",
        "Mistral",
        "Anthropic"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 144,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A three-dimensional cube made of orange wireframe lines represents:",
      "options": [
        "Webpack",
        "Babel",
        "Rollup",
        "Parcel"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 145,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $19 \\times 7$?",
      "options": [
        "123",
        "133",
        "143",
        "153"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 146,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an agile project management methodology?",
      "options": [
        "Scrum",
        "Kanban",
        "Extreme Programming",
        "Waterfall"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 147,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the default PostgreSQL port?",
      "options": [
        "5432",
        "3306",
        "1433",
        "8080"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 148,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does PCIe stand for in motherboard expansion slots?",
      "options": [
        "Peripheral Component Interconnect Express",
        "Primary Core Interface Extension",
        "Programmable Component Interface Express",
        "Peripheral Controller Integrated Engine"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 149,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: What function parses a string and returns an integer in JavaScript?",
      "options": [
        "`parseInt()`",
        "`toInteger()`",
        "`parseNumber()`",
        "`int()`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 150,
    "type": "math",
    "title": "RAPID FIRE - SET 15",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What gets wetter the more it dries?",
      "options": [
        "A sponge",
        "A towel",
        "A cloud",
        "Sand"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 151,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $5 \\rightarrow 10 \\rightarrow 20 \\rightarrow 40 \\rightarrow 80 \\rightarrow ?$",
      "options": [
        "120",
        "140",
        "160",
        "200"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 152,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Intel Corporation?",
      "options": [
        "Pat Gelsinger",
        "Bob Swan",
        "Brian Krzanich",
        "Paul Otellini"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 153,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: What is the name of GitHub's generative coding platform?",
      "options": [
        "GitHub Copilot",
        "GitHub Assistant",
        "GitHub Autocode",
        "GitHub IntelliSense"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 154,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A white origami crane-like bird on an orange square background is:",
      "options": [
        "GitLab",
        "Postman",
        "Apache",
        "Jenkins"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 155,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $50\\%$ of $50\\%$ of 800?",
      "options": [
        "100",
        "200",
        "300",
        "400"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 156,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an operating system kernel type?",
      "options": [
        "Monolithic kernel",
        "Microkernel",
        "Hybrid kernel",
        "Relational kernel"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 157,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the HTTP status code for \"Redirect / Moved Permanently\"?",
      "options": [
        "301",
        "302",
        "200",
        "400"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 158,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does ISP stand for in internet access?",
      "options": [
        "Internet Service Provider",
        "Integrated System Protocol",
        "Internal Silicon Pathway",
        "Interface Security Protocol"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 159,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: What is the index of the first element in standard C/C++ arrays?",
      "options": [
        "0",
        "1",
        "-1",
        "Null"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 160,
    "type": "math",
    "title": "RAPID FIRE - SET 16",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: Which word in the dictionary is always spelled incorrectly?",
      "options": [
        "Incorrectly",
        "Misspell",
        "Wrong",
        "Flabbergasted"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 161,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $11 \\rightarrow 22 \\rightarrow 44 \\rightarrow 88 \\rightarrow ?$",
      "options": [
        "166",
        "176",
        "186",
        "196"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 162,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Cisco Systems?",
      "options": [
        "Chuck Robbins",
        "John Chambers",
        "Antonio Neri",
        "Nikesh Arora"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 163,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: What is the primary AI chatbot interface created by Quora to access multiple LLMs?",
      "options": [
        "Poe",
        "Perplexity",
        "Pi",
        "Character.ai"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 164,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A blue diamond shaped like a stylized letter 'F' in Flutter is developed by:",
      "options": [
        "Google",
        "Facebook",
        "Microsoft",
        "Adobe"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 165,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $14 \\times 14 - 96$?",
      "options": [
        "90",
        "100",
        "110",
        "120"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 166,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a web development CSS preprocessor?",
      "options": [
        "SASS",
        "LESS",
        "Stylus",
        "Redux"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 167,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the default port for DNS queries?",
      "options": [
        "53",
        "80",
        "443",
        "21"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 168,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does EEPROM stand for?",
      "options": [
        "Electrically Erasable Programmable Read-Only Memory",
        "Electronic Erasable Program Real-time Memory",
        "Extended Embedded Programmable Read-Only Memory",
        "Electronically Encrypted Programmable Read-Only Memory"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 169,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In Python, what is the keyword used to create a function?",
      "options": [
        "`def`",
        "`function`",
        "`func`",
        "`define`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 170,
    "type": "math",
    "title": "RAPID FIRE - SET 17",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What has a head and a tail, but no body?",
      "options": [
        "A snake",
        "A coin",
        "A needle",
        "A comet"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 171,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $1 \\rightarrow 2 \\rightarrow 6 \\rightarrow 24 \\rightarrow 120 \\rightarrow ?$",
      "options": [
        "600",
        "720",
        "840",
        "960"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 172,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Netflix?",
      "options": [
        "Ted Sarandos & Greg Peters (Co-CEOs)",
        "Reed Hastings",
        "Bob Iger",
        "David Zaslav"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 173,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: What is the AI search engine that summarizes answers with inline web citations?",
      "options": [
        "Perplexity AI",
        "WolframAlpha",
        "Claude",
        "Mistral"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 174,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A three-color circular aperture shutter (red, green, yellow with blue center) is:",
      "options": [
        "Google Chrome",
        "Safari",
        "Opera",
        "Firefox"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 175,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $2^7 + 2^6$?",
      "options": [
        "160",
        "192",
        "224",
        "256"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 176,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an asymmetric cryptography standard?",
      "options": [
        "RSA",
        "ECC",
        "DSA",
        "DES"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 177,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the HTTP status code for \"Forbidden\"?",
      "options": [
        "401",
        "403",
        "404",
        "500"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 178,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does TFT stand for in LCD display screens?",
      "options": [
        "Thin-Film Transistor",
        "True Frequency Transfer",
        "Total Field Transmission",
        "Thermal Frequency Transistor"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 179,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which SQL clause is used to filter aggregated data generated by `GROUP BY`?",
      "options": [
        "WHERE",
        "HAVING",
        "ORDER BY",
        "LIMIT"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 180,
    "type": "math",
    "title": "RAPID FIRE - SET 18",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What can travel around the world while staying in a single corner?",
      "options": [
        "An airplane",
        "A postage stamp",
        "A satellite",
        "A postcard"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 181,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $9 \\rightarrow 18 \\rightarrow 36 \\rightarrow 72 \\rightarrow ?$",
      "options": [
        "108",
        "144",
        "162",
        "180"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 182,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Spotify?",
      "options": [
        "Daniel Ek",
        "Martin Lorentzon",
        "Jimmy Iovine",
        "Lucian Grainge"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 183,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: What is the name of Meta's AI research lab that pioneered LLaMA and PyTorch?",
      "options": [
        "FAIR (Fundamental AI Research)",
        "DeepMind",
        "OpenAI",
        "Brain"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 184,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A dark circular icon showing an abstract green eye / target is:",
      "options": [
        "Acer Predator",
        "NVIDIA GeForce",
        "Razer",
        "Alienware"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 185,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $45 \\times 4 + 20$?",
      "options": [
        "180",
        "200",
        "220",
        "240"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 186,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT a JavaScript package manager?",
      "options": [
        "npm",
        "yarn",
        "pnpm",
        "pip"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 187,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the binary value of decimal number 12?",
      "options": [
        "1010",
        "1100",
        "1101",
        "1110"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 188,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does SATA stand for in storage drives?",
      "options": [
        "Serial Advanced Technology Attachment",
        "Synchronous Array Transmission Architecture",
        "Solid Array Tech Attachment",
        "System Access Technology Adapter"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 189,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: In Java, which access modifier makes a variable accessible only within its own class?",
      "options": [
        "`public`",
        "`protected`",
        "`private`",
        "`default`"
      ],
      "correctIndex": 2
    }
  },
  {
    "id": 190,
    "type": "math",
    "title": "RAPID FIRE - SET 19",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: What has many keys but can't open a single lock?",
      "options": [
        "A piano",
        "A map legend",
        "A keychain",
        "A skeleton"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 191,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "PATTERN: $0 \\rightarrow 3 \\rightarrow 8 \\rightarrow 15 \\rightarrow 24 \\rightarrow ?$",
      "options": [
        "32",
        "35",
        "36",
        "48"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 192,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CEO MATCH: Who is the CEO of Palantir Technologies?",
      "options": [
        "Alex Karp",
        "Peter Thiel",
        "Joe Lonsdale",
        "Stephen Cohen"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 193,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "AI TOOL: What is the open-source web UI framework widely used by ML researchers to demo models in Python?",
      "options": [
        "Gradio / Streamlit",
        "Angular",
        "Laravel",
        "Spring Boot"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 194,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "LOGO IDENTIFIER: A minimalist white letter 'X' on a black square background replaced:",
      "options": [
        "Twitter",
        "Threads",
        "Mastodon",
        "Bluesky"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 195,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "QUICK MATH: What is $1000 - 355$?",
      "options": [
        "635",
        "645",
        "655",
        "745"
      ],
      "correctIndex": 1
    }
  },
  {
    "id": 196,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "TECH ODD-ONE-OUT: Which of the following is NOT an email communication protocol?",
      "options": [
        "SMTP",
        "IMAP",
        "POP3",
        "SNMP"
      ],
      "correctIndex": 3
    }
  },
  {
    "id": 197,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "REFLEX SPEED: What is the hexadecimal equivalent of decimal 10?",
      "options": [
        "A",
        "B",
        "C",
        "F"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 198,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "HARDWARE ACRONYM: What does SoC stand for in mobile computing chips?",
      "options": [
        "System on a Chip",
        "Silicon Output Controller",
        "Synchronous Optical Component",
        "Serial Operating Core"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 199,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "CODE TRIVIA: Which command-line utility tests network latency and round-trip reachability to a host?",
      "options": [
        "`ping`",
        "`traceroute`",
        "`netstat`",
        "`curl`"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": 200,
    "type": "math",
    "title": "RAPID FIRE - SET 20",
    "subtitle": "Answer quickly before time runs out!",
    "timeLimit": 8,
    "points": 150,
    "mathData": {
      "question": "RAPID LOGIC: Feed me and I live, yet give me a drink and I die. What am I?",
      "options": [
        "Fire",
        "Plant",
        "Machine",
        "River"
      ],
      "correctIndex": 0
    }
  }
];
