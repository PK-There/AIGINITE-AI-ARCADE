// Automatically generated from TECHNOLOGY.docx
'use client';

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timeLimit: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": 1,
    "category": "SET 01",
    "question": "What does the \"GPT\" in OpenAI's ChatGPT stand for?",
    "options": [
      "General Purpose Technology",
      "Generative Pre-trained Transformer",
      "Global Programmed Tasker",
      "Guided Pattern Tracking"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Generative Pre-trained Transformer",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 2,
    "category": "SET 01",
    "question": "Who co-founded Apple Computer alongside Steve Jobs in 1976?",
    "options": [
      "Steve Wozniak",
      "Bill Gates",
      "Paul Allen",
      "Tim Cook"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Steve Wozniak",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 3,
    "category": "SET 01",
    "question": "In The Matrix (1999), what color pill does Morpheus offer Neo to learn the truth about reality?",
    "options": [
      "Green",
      "Blue",
      "Red",
      "Yellow"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Red",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 4,
    "category": "SET 01",
    "question": "Which streaming platform originally produced the viral global hit series Squid Game?",
    "options": [
      "Prime Video",
      "HBO Max",
      "Disney+",
      "Netflix"
    ],
    "correctIndex": 3,
    "explanation": "Correct Answer: D) Netflix",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 5,
    "category": "SET 01",
    "question": "What computer science test, proposed in 1950, evaluates a machine's ability to exhibit human-like intelligence?",
    "options": [
      "Turing Test",
      "Lovelace Test",
      "Asimov Evaluation",
      "Shannon Entropy Benchmark"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Turing Test",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 6,
    "category": "SET 01",
    "question": "Which gaming console introduced the revolutionary \"Wii Remote\" motion controller in 2006?",
    "options": [
      "Sony PlayStation 3",
      "Nintendo Wii",
      "Microsoft Xbox 360",
      "Sega Dreamcast"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Nintendo Wii",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 7,
    "category": "SET 01",
    "question": "What does \"URL\" stand for in web browsing?",
    "options": [
      "Universal Route Link",
      "Uniform Resource Locator",
      "Unified Real-time Language",
      "User Request Location"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Uniform Resource Locator",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 8,
    "category": "SET 01",
    "question": "Which tech giant acquired the mobile operating system Android in 2005?",
    "options": [
      "Google",
      "Microsoft",
      "Samsung",
      "IBM"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Google",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 9,
    "category": "SET 01",
    "question": "In Iron Man, what is the name of Tony Stark's primary AI assistant voiced by Paul Bettany?",
    "options": [
      "F.R.I.D.A.Y.",
      "J.A.R.V.I.S.",
      "K.A.R.E.N.",
      "H.O.M.E.R."
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) J.A.R.V.I.S.",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 10,
    "category": "SET 01",
    "question": "Which programming language is most widely used for training modern deep learning frameworks like PyTorch and TensorFlow?",
    "options": [
      "C#",
      "PHP",
      "Python",
      "Ruby"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Python",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 11,
    "category": "SET 02",
    "question": "Which tech entrepreneur serves as the CEO of OpenAI?",
    "options": [
      "Sam Altman",
      "Demis Hassabis",
      "Satya Nadella",
      "Dario Amodei"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sam Altman",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 12,
    "category": "SET 02",
    "question": "What is the fundamental unit of information in quantum computing, analogous to a classical bit?",
    "options": [
      "Qubit",
      "Flop",
      "Nanobit",
      "Vector"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Qubit",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 13,
    "category": "SET 02",
    "question": "In Interstellar (2014), what is the name of the boxy military AI robot companion?",
    "options": [
      "TARS",
      "HAL",
      "AUTO",
      "GErTY"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) TARS",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 14,
    "category": "SET 02",
    "question": "What is the highest-grossing film at the global box office of all time (unadjusted for inflation)?",
    "options": [
      "Titanic",
      "Avengers: Endgame",
      "Avatar",
      "Star Wars: The Force Awakens"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Avatar",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 15,
    "category": "SET 02",
    "question": "What neural network architecture introduced in the 2017 paper \"Attention Is All You Need\" revolutionized NLP?",
    "options": [
      "Convolutional Neural Network (CNN)",
      "Transformer",
      "Recurrent Neural Network (RNN)",
      "Multilayer Perceptron (MLP)"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Transformer",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 16,
    "category": "SET 02",
    "question": "Which video game franchise features the battle between Assassins and the Templar Order?",
    "options": [
      "The Witcher",
      "Dark Souls",
      "Assassin's Creed",
      "Dishonored"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Assassin's Creed",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 17,
    "category": "SET 02",
    "question": "What networking protocol secures web traffic by encrypting data between client and server?",
    "options": [
      "HTTP",
      "HTTPS",
      "FTP",
      "SMTP"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) HTTPS",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 18,
    "category": "SET 02",
    "question": "Which computer pioneer is widely celebrated as the world's first computer programmer for her work on the Analytical Engine?",
    "options": [
      "Ada Lovelace",
      "Grace Hopper",
      "Katherine Johnson",
      "Margaret Hamilton"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Ada Lovelace",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 19,
    "category": "SET 02",
    "question": "In HBO's sci-fi series Westworld, what kind of synthetic beings inhabit the theme park?",
    "options": [
      "Replicants",
      "Hosts",
      "Cylons",
      "Synthetics"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Hosts",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 20,
    "category": "SET 02",
    "question": "What does the tech acronym \"GPU\" stand for?",
    "options": [
      "General Processing Utility",
      "Graphics Processing Unit",
      "Grid Performance Unit",
      "Guided Program Utility"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Graphics Processing Unit",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 21,
    "category": "SET 03",
    "question": "Which company developed the AI image generation model known as \"DALL-E\"?",
    "options": [
      "OpenAI",
      "Midjourney Inc.",
      "Stability AI",
      "Meta AI"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) OpenAI",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 22,
    "category": "SET 03",
    "question": "Who is the current CEO of Google and its parent company Alphabet Inc.?",
    "options": [
      "Sundar Pichai",
      "Larry Page",
      "Sergey Brin",
      "Eric Schmidt"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sundar Pichai",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 23,
    "category": "SET 03",
    "question": "In Avengers: Age of Ultron, which synthetic android Avenger is brought to life using the Mind Stone?",
    "options": [
      "Vision",
      "War Machine",
      "Falcon",
      "Quicksilver"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Vision",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 24,
    "category": "SET 03",
    "question": "Which artist broke records in 2023\u20132024 with the stadium-filling Eras Tour?",
    "options": [
      "Beyonc\u00e9",
      "Taylor Swift",
      "Dua Lipa",
      "Billie Eilish"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Taylor Swift",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 25,
    "category": "SET 03",
    "question": "What term in AI refers to when a large language model generates false or fabricated information with high confidence?",
    "options": [
      "Overfitting",
      "Hallucination",
      "Quantization",
      "Token Drift"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Hallucination",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 26,
    "category": "SET 03",
    "question": "Which popular sandbox game is made entirely of 3D voxel cubes and is the best-selling video game in history?",
    "options": [
      "Terraria",
      "Roblox",
      "Minecraft",
      "Fortnite"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Minecraft",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 27,
    "category": "SET 03",
    "question": "What open-source version control system was created by Linus Torvalds in 2005?",
    "options": [
      "SVN",
      "Git",
      "Mercurial",
      "Docker"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Git",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 28,
    "category": "SET 03",
    "question": "In what year did IBM's \"Deep Blue\" chess computer defeat reigning world champion Garry Kasparov?",
    "options": [
      "1989",
      "1997",
      "2001",
      "2011"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) 1997",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 29,
    "category": "SET 03",
    "question": "In Stranger Things, what is the name of the parallel dimension existing beneath the town of Hawkins?",
    "options": [
      "The Upside Down",
      "The Nether",
      "The Void",
      "The Shadow Realm"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) The Upside Down",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 30,
    "category": "SET 03",
    "question": "What does the acronym \"API\" stand for in software engineering?",
    "options": [
      "Automated Program Instruction",
      "Application Programming Interface",
      "Advanced Protocol Integrator",
      "Applied Process Index"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Application Programming Interface",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 31,
    "category": "SET 04",
    "question": "What is the primary semiconductor company dominant in manufacturing high-end AI chips like the H100 and B200?",
    "options": [
      "Intel",
      "NVIDIA",
      "AMD",
      "Qualcomm"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) NVIDIA",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 32,
    "category": "SET 04",
    "question": "Who is the CEO of NVIDIA, famously known for wearing a black leather jacket during keynote presentations?",
    "options": [
      "Jensen Huang",
      "Lisa Su",
      "Pat Gelsinger",
      "Morris Chang"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Jensen Huang",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 33,
    "category": "SET 04",
    "question": "In Ex Machina (2014), what is the name of the female humanoid AI undergoing the Turing test?",
    "options": [
      "Ava",
      "Samantha",
      "Maeve",
      "Rachael"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Ava",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 34,
    "category": "SET 04",
    "question": "What is the name of the fictional kingdom ruled by King T'Challa in Marvel's Black Panther?",
    "options": [
      "Latveria",
      "Wakanda",
      "Genosha",
      "Atlantis"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Wakanda",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 35,
    "category": "SET 04",
    "question": "What machine learning technique allows models to learn optimal behaviors by receiving rewards or penalties?",
    "options": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Transfer Learning"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Reinforcement Learning",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 36,
    "category": "SET 04",
    "question": "Which battle royale video game launched by Epic Games in 2017 features its iconic \"Battle Bus\"?",
    "options": [
      "PUBG",
      "Apex Legends",
      "Fortnite",
      "Warzone"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Fortnite",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 37,
    "category": "SET 04",
    "question": "What binary digit combination represents the decimal number 5?",
    "options": [
      "100",
      "101",
      "110",
      "111"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) 101",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 38,
    "category": "SET 04",
    "question": "Which tech giant launched the first iPhone in June 2007?",
    "options": [
      "Apple",
      "Motorola",
      "Nokia",
      "BlackBerry"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Apple",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 39,
    "category": "SET 04",
    "question": "In the 2013 sci-fi romance Her, who voices the AI operating system named Samantha?",
    "options": [
      "Scarlett Johansson",
      "Emma Stone",
      "Rooney Mara",
      "Amy Adams"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Scarlett Johansson",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 40,
    "category": "SET 04",
    "question": "What does the \"RAM\" in a computer hardware specification stand for?",
    "options": [
      "Read Access Memory",
      "Random Access Memory",
      "Rapid Array Module",
      "Real-time Allocated Memory"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Random Access Memory",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 41,
    "category": "SET 05",
    "question": "Which AI research lab developed the AlphaGo program that defeated world champion Go player Lee Sedol in 2016?",
    "options": [
      "Google DeepMind",
      "Meta FAIR",
      "OpenAI",
      "Baidu AI"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Google DeepMind",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 42,
    "category": "SET 05",
    "question": "Who founded the electric vehicle company Tesla alongside Martin Eberhard and Marc Tarpenning?",
    "options": [
      "Jeff Bezos",
      "Elon Musk",
      "Peter Thiel",
      "Marc Benioff"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Elon Musk",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 43,
    "category": "SET 05",
    "question": "In Star Wars, what type of astromech droid is R2-D2's gold-plated protocol droid companion?",
    "options": [
      "BB-8",
      "C-3PO",
      "K-2SO",
      "IG-11"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) C-3PO",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 44,
    "category": "SET 05",
    "question": "What social media platform popularized short-form vertical video clips before being acquired by ByteDance?",
    "options": [
      "Vine",
      "Musical.ly",
      "Dubsmash",
      "Keek"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Musical.ly",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 45,
    "category": "SET 05",
    "question": "What mathematical term describes the smallest individual component of text processed by an LLM?",
    "options": [
      "Token",
      "Bytecode",
      "Pixel",
      "Weight"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Token",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 46,
    "category": "SET 05",
    "question": "In The Last of Us, what mutated fungal organism destroys human civilization?",
    "options": [
      "Cordyceps",
      "Aspergillus",
      "Penicillium",
      "Candida"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Cordyceps",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 47,
    "category": "SET 05",
    "question": "Which port standard has officially become the universal mandatory charging connection across modern smartphones and laptops?",
    "options": [
      "Lightning",
      "Micro-USB",
      "USB Type-C",
      "Mini-USB"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) USB Type-C",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 48,
    "category": "SET 05",
    "question": "What was the name of the very first operational electronic general-purpose computer, completed in 1945?",
    "options": [
      "ENIAC",
      "UNIVAC",
      "Colossus",
      "Harvard Mark I"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) ENIAC",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 49,
    "category": "SET 05",
    "question": "In the series Severance, employees' brains are surgically altered to separate what two sets of memories?",
    "options": [
      "Work and Personal lives",
      "Childhood and Adulthood",
      "Digital and Physical skills",
      "Conscious and Subconscious thoughts"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Work and Personal lives",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 50,
    "category": "SET 05",
    "question": "What does \"SSD\" stand for in computer storage hardware?",
    "options": [
      "Solid State Drive",
      "System Storage Device",
      "Static Silicon Disk",
      "Synchronous Sector Drive"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Solid State Drive",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 51,
    "category": "SET 06",
    "question": "Which tech corporation created the multimodal AI family named \"Gemini\"?",
    "options": [
      "Microsoft",
      "Google",
      "Apple",
      "Amazon"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Google",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 52,
    "category": "SET 06",
    "question": "Who is the Indian-born CEO of Microsoft who took over leadership from Steve Ballmer in 2014?",
    "options": [
      "Satya Nadella",
      "Sundar Pichai",
      "Arvind Krishna",
      "Shantanu Narayen"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Satya Nadella",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 53,
    "category": "SET 06",
    "question": "In 2001: A Space Odyssey, what is the name of the antagonistic sentient computer onboard Discovery One?",
    "options": [
      "HAL 9000",
      "WOPR",
      "Mother",
      "Skynet"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) HAL 9000",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 54,
    "category": "SET 06",
    "question": "Which 2023 movie directed by Christopher Nolan tells the story of the father of the atomic bomb?",
    "options": [
      "Oppenheimer",
      "Tenet",
      "Dunkirk",
      "The Prestige"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Oppenheimer",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 55,
    "category": "SET 06",
    "question": "What is the process of adjusting a pre-trained AI model on a specific, smaller dataset called?",
    "options": [
      "Data scraping",
      "Fine-tuning",
      "Tokenization",
      "Vectorizing"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Fine-tuning",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 56,
    "category": "SET 06",
    "question": "Which video game company created iconic franchises including Super Mario, The Legend of Zelda, and Pok\u00e9mon?",
    "options": [
      "Nintendo",
      "Sony",
      "Capcom",
      "Square Enix"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Nintendo",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 57,
    "category": "SET 06",
    "question": "What layer of the Open Systems Interconnection (OSI) model handles physical routing of IP packets?",
    "options": [
      "Network Layer (Layer 3)",
      "Data Link Layer (Layer 2)",
      "Transport Layer (Layer 4)",
      "Application Layer (Layer 7)"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Network Layer (Layer 3)",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 58,
    "category": "SET 06",
    "question": "In what decade was the World Wide Web invented by British scientist Tim Berners-Lee?",
    "options": [
      "1970s",
      "1980s",
      "1990s",
      "2000s"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) 1980s",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 59,
    "category": "SET 06",
    "question": "In Blade Runner (1982), what test measures pupillary dilation and empathic response to detect Replicants?",
    "options": [
      "Voight-Kampff Test",
      "Turing Benchmark",
      "Asimov Evaluation",
      "Deckard Screen"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Voight-Kampff Test",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 60,
    "category": "SET 06",
    "question": "What does the tech abbreviation \"IoT\" stand for?",
    "options": [
      "Interface of Telecommunications",
      "Internet of Things",
      "Integrated Online Tools",
      "Internal Operating Transfer"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Internet of Things",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 61,
    "category": "SET 07",
    "question": "What open-weights LLM model family was developed and released by Meta AI starting in 2023?",
    "options": [
      "Claude",
      "LLaMA",
      "Mistral",
      "Falcon"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) LLaMA",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 62,
    "category": "SET 07",
    "question": "Who founded Amazon.com in 1994 as an online marketplace for books?",
    "options": [
      "Jeff Bezos",
      "Mark Zuckerberg",
      "Larry Ellison",
      "Reed Hastings"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Jeff Bezos",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 63,
    "category": "SET 07",
    "question": "In The Terminator franchise, what military artificial intelligence network becomes self-aware and triggers Judgment Day?",
    "options": [
      "Cyberdyne Mainframe",
      "Skynet",
      "Legion",
      "Sentinel"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Skynet",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 64,
    "category": "SET 07",
    "question": "What K-pop boy band became the first South Korean act to top the US Billboard Hot 100 with \"Dynamite\"?",
    "options": [
      "EXO",
      "Stray Kids",
      "BTS",
      "SEVENTEEN"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) BTS",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 65,
    "category": "SET 07",
    "question": "What AI concept refers to a system's ability to interpret and extract meaning from visual images and videos?",
    "options": [
      "Computer Vision",
      "Natural Language Processing",
      "Speech Synthesis",
      "Evolutionary Computation"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Computer Vision",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 66,
    "category": "SET 07",
    "question": "In League of Legends, what is the name of the primary three-lane competitive map?",
    "options": [
      "Summoner's Rift",
      "Howling Abyss",
      "Twisted Treeline",
      "Crystal Scar"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Summoner's Rift",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 67,
    "category": "SET 07",
    "question": "What programming paradigm treats computation as the evaluation of mathematical functions avoiding state changes?",
    "options": [
      "Object-Oriented Programming",
      "Functional Programming",
      "Procedural Programming",
      "Imperative Programming"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Functional Programming",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 68,
    "category": "SET 07",
    "question": "What popular open-source Linux operating system uses an African philosophy name meaning \"humanity to others\"?",
    "options": [
      "Fedora",
      "Debian",
      "Ubuntu",
      "Arch"
    ],
    "correctIndex": 2,
    "explanation": "Correct Answer: C) Ubuntu",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 69,
    "category": "SET 07",
    "question": "In Black Mirror episode \"Be Right Back\", a grieving woman buys an AI clone that mimics her late partner using what source data?",
    "options": [
      "His medical records",
      "His social media posts and chats",
      "His school diaries",
      "His work emails"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) His social media posts and chats",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 70,
    "category": "SET 07",
    "question": "What does the acronym \"DNS\" stand for in internet infrastructure?",
    "options": [
      "Domain Name System",
      "Dynamic Network Server",
      "Data Navigation Standard",
      "Digital Node Switch"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Domain Name System",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 71,
    "category": "SET 08",
    "question": "Which AI safety and research startup created the \"Claude\" conversational AI model family?",
    "options": [
      "Anthropic",
      "Cohere",
      "Character.ai",
      "Inflection AI"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Anthropic",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 72,
    "category": "SET 08",
    "question": "Who is the CEO of Meta (formerly Facebook), which he founded while a student at Harvard?",
    "options": [
      "Mark Zuckerberg",
      "Dustin Moskovitz",
      "Eduardo Saverin",
      "Sheryl Sandberg"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Mark Zuckerberg",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 73,
    "category": "SET 08",
    "question": "In WALL-E (2008), what is the primary mission directive of the reconnaissance robot EVE?",
    "options": [
      "Clean urban trash",
      "Detect living plant life on Earth",
      "Repair broken droids",
      "Guide the human spaceship back"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Detect living plant life on Earth",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 74,
    "category": "SET 08",
    "question": "Which streaming platform produces the hit fantasy series The Lord of the Rings: The Rings of Power?",
    "options": [
      "Netflix",
      "Amazon Prime Video",
      "Apple TV+",
      "HBO Max"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Amazon Prime Video",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 75,
    "category": "SET 08",
    "question": "What type of machine learning model pits a \"Generator\" against a \"Discriminator\" in an adversarial framework?",
    "options": [
      "GAN (Generative Adversarial Network)",
      "SVM (Support Vector Machine)",
      "Decision Forest",
      "Autoencoder"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) GAN (Generative Adversarial Network)",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 76,
    "category": "SET 08",
    "question": "In Cyberpunk 2077, what is the name of the mega-metropolis where the entire story unfolds?",
    "options": [
      "Night City",
      "Neo-Detroit",
      "Neo-Tokyo",
      "San Paro"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Night City",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 77,
    "category": "SET 08",
    "question": "What database query language is the global standard for managing relational databases?",
    "options": [
      "SQL",
      "NoSQL",
      "GraphQL",
      "SPARQL"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) SQL",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 78,
    "category": "SET 08",
    "question": "What iconic computer was released in 1984 with a famous Super Bowl television commercial directed by Ridley Scott?",
    "options": [
      "IBM Personal Computer",
      "Apple Macintosh",
      "Commodore 64",
      "Atari 2600"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Apple Macintosh",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 79,
    "category": "SET 08",
    "question": "In Dune, what is the name of the human individuals trained to perform complex calculations replacing banned computers?",
    "options": [
      "Bene Gesserit",
      "Mentats",
      "Fremen",
      "Sardaukar"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Mentats",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 80,
    "category": "SET 08",
    "question": "What does the tech acronym \"VPN\" stand for?",
    "options": [
      "Virtual Private Network",
      "Variable Path Node",
      "Visual Processing Network",
      "Vector Protocol Node"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Virtual Private Network",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 81,
    "category": "SET 09",
    "question": "What French AI startup founded in 2023 quickly became a major European leader with open-weight models like Mistral 7B?",
    "options": [
      "Mistral AI",
      "DeepL",
      "Aleph Alpha",
      "Hugging Face"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Mistral AI",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 82,
    "category": "SET 09",
    "question": "Who co-founded Microsoft alongside Bill Gates and was the original owner of the Seattle Seahawks?",
    "options": [
      "Paul Allen",
      "Steve Ballmer",
      "Marc Andreessen",
      "John Sculley"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Paul Allen",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 83,
    "category": "SET 09",
    "question": "In I, Robot (2004), what is the name of the NS-5 robot who exhibits genuine human emotions and dreams?",
    "options": [
      "Sonny",
      "David",
      "Roy",
      "Bishop"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sonny",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 84,
    "category": "SET 09",
    "question": "Which singer-songwriter swept the Grammy Awards in 2020 by winning Record, Album, Song of the Year, and Best New Artist?",
    "options": [
      "Billie Eilish",
      "Olivia Rodrigo",
      "Ariana Grande",
      "Lorde"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Billie Eilish",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 85,
    "category": "SET 09",
    "question": "What does the \"NLP\" subfield of artificial intelligence specifically focus on?",
    "options": [
      "Neural Logic Protocols",
      "Natural Language Processing",
      "Non-Linear Programming",
      "Numerical Linear Prediction"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Natural Language Processing",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 86,
    "category": "SET 09",
    "question": "In Overwatch, what is the name of the cybernetic time-jumping hero whose signature line is \"Cheers, love! The cavalry's here!\"?",
    "options": [
      "Tracer",
      "D.Va",
      "Pharah",
      "Mercy"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Tracer",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 87,
    "category": "SET 09",
    "question": "What popular client-side scripting language was created by Brendan Eich in just 10 days in 1995?",
    "options": [
      "Python",
      "JavaScript",
      "Java",
      "Perl"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) JavaScript",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 88,
    "category": "SET 09",
    "question": "What company created the first commercially successful graphical mouse-driven computer interface Xerox Alto, inspiring Apple and Microsoft?",
    "options": [
      "Xerox PARC",
      "Bell Labs",
      "Texas Instruments",
      "Fairchild Semiconductor"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Xerox PARC",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 89,
    "category": "SET 09",
    "question": "In science fiction writer Isaac Asimov's Three Laws of Robotics, what is the First Law?",
    "options": [
      "A robot must obey orders given by humans.",
      "A robot may not injure a human being or allow a human to come to harm.",
      "A robot must protect its own existence.",
      "A robot must never speak untruthfully."
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) A robot may not injure a human being or allow a human to come to harm.",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 90,
    "category": "SET 09",
    "question": "What does the acronym \"BIOS\" stand for on a computer motherboard?",
    "options": [
      "Binary Integrated Operating System",
      "Basic Input/Output System",
      "Built-in Optical Sensor",
      "Base Instruction Oscillator"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Basic Input/Output System",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 91,
    "category": "SET 10",
    "question": "What AI framework developed by Meta is the most widely adopted research library for deep learning and tensors?",
    "options": [
      "PyTorch",
      "TensorFlow",
      "Caffe",
      "Theano"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) PyTorch",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 92,
    "category": "SET 10",
    "question": "Who serves as the CEO of OpenAI rival startup Anthropic?",
    "options": [
      "Dario Amodei",
      "Demis Hassabis",
      "Ilya Sutskever",
      "Greg Brockman"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Dario Amodei",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 93,
    "category": "SET 10",
    "question": "In Big Hero 6, what inflatable healthcare robot turns into an armored superhero?",
    "options": [
      "Baymax",
      "Hiro",
      "Tadashi",
      "Wasabi"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Baymax",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 94,
    "category": "SET 10",
    "question": "Which 2023 movie made history by generating massive box-office pairing memes alongside Oppenheimer as \"Barbenheimer\"?",
    "options": [
      "Barbie",
      "The Marvels",
      "Wonka",
      "Mission: Impossible \u2013 Dead Reckoning"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Barbie",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 95,
    "category": "SET 10",
    "question": "What metric evaluates how closely an AI classification model predicts both True Positives and False Positives harmoniously?",
    "options": [
      "F1-Score",
      "Latency",
      "Token throughput",
      "Batch rate"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) F1-Score",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 96,
    "category": "SET 10",
    "question": "What is the name of the protagonist Witcher known as the \"White Wolf\"?",
    "options": [
      "Geralt of Rivia",
      "Vesemir",
      "Eskel",
      "Lambert"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Geralt of Rivia",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 97,
    "category": "SET 10",
    "question": "What distributed ledger technology underpins cryptocurrencies like Bitcoin and Ethereum?",
    "options": [
      "Relational Database",
      "Blockchain",
      "Hash Tree",
      "Raft Consensus"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) Blockchain",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 98,
    "category": "SET 10",
    "question": "Which computer manufacturer created the \"ThinkPad\" laptop brand before selling its PC division to Lenovo in 2005?",
    "options": [
      "IBM",
      "Dell",
      "HP",
      "Compaq"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) IBM",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 99,
    "category": "SET 10",
    "question": "In Avengers: Infinity War, what artificial planetoid is the homeworld of Thanos?",
    "options": [
      "Titan",
      "Vormir",
      "Knowhere",
      "Sakaar"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Titan",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 100,
    "category": "SET 10",
    "question": "What does the acronym \"LAN\" stand for in networking?",
    "options": [
      "Local Area Network",
      "Logical Array Node",
      "Linear Access Network",
      "Linked Audio Network"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Local Area Network",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 101,
    "category": "SET 11",
    "question": "What is the AI platform developed by GitHub and OpenAI that autocompletes source code in real time?",
    "options": [
      "GitHub Copilot",
      "Tabnine",
      "Codeium",
      "Replit Ghostwriter"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) GitHub Copilot",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 102,
    "category": "SET 11",
    "question": "Which tech executive is the CEO of Adobe Systems, guiding its integration of generative AI Firefly?",
    "options": [
      "Shantanu Narayen",
      "Arvind Krishna",
      "Nikesh Arora",
      "George Kurian"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Shantanu Narayen",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 103,
    "category": "SET 11",
    "question": "In Alien (1979), what is the name of the science officer who is secretly an android working for Weyland-Yutani?",
    "options": [
      "Ash",
      "Bishop",
      "David",
      "Walter"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Ash",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 104,
    "category": "SET 11",
    "question": "Which musical artist had the biggest global Billboard Hot 100 hit of 2020 with \"Blinding Lights\"?",
    "options": [
      "The Weeknd",
      "Drake",
      "Post Malone",
      "Justin Bieber"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) The Weeknd",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 105,
    "category": "SET 11",
    "question": "In AI terminology, what is a \"Vector Database\" primarily used for?",
    "options": [
      "Storing high-dimensional embeddings for semantic search",
      "Storing 3D video game assets",
      "Generating SVG image illustrations",
      "Managing CPU register caches"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Storing high-dimensional embeddings for semantic search",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 106,
    "category": "SET 11",
    "question": "Which video game franchise stars the Spartan super-soldier Master Chief?",
    "options": [
      "Halo",
      "Destiny",
      "Gears of War",
      "Doom"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Halo",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 107,
    "category": "SET 11",
    "question": "Which foundational Internet protocol assigns unique numerical identifiers to devices connected to a network?",
    "options": [
      "IP (Internet Protocol)",
      "UDP (User Datagram Protocol)",
      "SSH (Secure Shell)",
      "ICMP"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) IP (Internet Protocol)",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 108,
    "category": "SET 11",
    "question": "In what year was the first video uploaded to YouTube, titled \"Me at the zoo\"?",
    "options": [
      "2003",
      "2005",
      "2007",
      "2009"
    ],
    "correctIndex": 1,
    "explanation": "Correct Answer: B) 2005",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 109,
    "category": "SET 11",
    "question": "In the anime Ghost in the Shell, what is the term for a human brain integrated into a cybernetic chassis?",
    "options": [
      "Cyberbrain",
      "Neural Core",
      "Synthetic Cortex",
      "Bio-Processor"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Cyberbrain",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 110,
    "category": "SET 11",
    "question": "What does the abbreviation \"HTML\" stand for?",
    "options": [
      "Hypertext Markup Language",
      "Hyperlink Text Management Logic",
      "High Transfer Machine Language",
      "Hybrid Technology Markdown Level"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Hypertext Markup Language",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 111,
    "category": "SET 12",
    "question": "What AI company created the popular open-source image generation model \"Stable Diffusion\"?",
    "options": [
      "Stability AI",
      "Runway",
      "Midjourney",
      "ElevenLabs"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Stability AI",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 112,
    "category": "SET 12",
    "question": "Who founded Oracle Corporation in 1977 and remained its long-time CEO for over three decades?",
    "options": [
      "Larry Ellison",
      "Marc Benioff",
      "Scott McNealy",
      "Michael Dell"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Larry Ellison",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 113,
    "category": "SET 12",
    "question": "In Tron (1982), what arcade game developer is digitized and pulled directly into the computer mainframe?",
    "options": [
      "Kevin Flynn",
      "Alan Bradley",
      "Ed Dillinger",
      "Sam Flynn"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Kevin Flynn",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 114,
    "category": "SET 12",
    "question": "Which HBO drama series chronicles the high-stakes power struggle among the heirs of the Waystar RoyCo empire?",
    "options": [
      "Succession",
      "Billions",
      "The White Lotus",
      "Industry"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Succession",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 115,
    "category": "SET 12",
    "question": "What does the term \"Zero-shot learning\" describe in machine learning?",
    "options": [
      "A model performing a task without any specific training examples for it",
      "Training a neural network with zero computational weights",
      "Running code with no memory allocation",
      "Training an algorithm with zero parameters"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) A model performing a task without any specific training examples for it",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 116,
    "category": "SET 12",
    "question": "What is the name of the battle royale mode in Call of Duty released in 2020?",
    "options": [
      "Warzone",
      "Blackout",
      "Firestorm",
      "Danger Zone"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Warzone",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 117,
    "category": "SET 12",
    "question": "Which data format using key-value pairs has largely replaced XML as the standard for API communication?",
    "options": [
      "JSON",
      "CSV",
      "YAML",
      "TOML"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) JSON",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 118,
    "category": "SET 12",
    "question": "Which company acquired video game live-streaming platform Twitch for nearly $1 billion in 2014?",
    "options": [
      "Amazon",
      "Google",
      "Microsoft",
      "Sony"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Amazon",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 119,
    "category": "SET 12",
    "question": "In Minority Report, what are the three precognitive humans predicting crimes called?",
    "options": [
      "Precogs",
      "Oracles",
      "Seers",
      "Augurs"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Precogs",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 120,
    "category": "SET 12",
    "question": "What does the computing term \"CPU\" stand for?",
    "options": [
      "Central Processing Unit",
      "Core Performance Unit",
      "Computer Protocol Utility",
      "Central Program Utility"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Central Processing Unit",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 121,
    "category": "SET 13",
    "question": "What AI audio platform is globally known for state-of-the-art AI voice cloning and text-to-speech synthesis?",
    "options": [
      "ElevenLabs",
      "Suno",
      "Udio",
      "Descript"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) ElevenLabs",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 122,
    "category": "SET 13",
    "question": "Who is the co-founder and chief scientist who left OpenAI in 2024 to found Safe Superintelligence (SSI)?",
    "options": [
      "Ilya Sutskever",
      "Andrej Karpathy",
      "Greg Brockman",
      "Wojciech Zaremba"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Ilya Sutskever",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 123,
    "category": "SET 13",
    "question": "In Blade Runner 2049, what is the holographic A I companion played by Ana de Armas named?",
    "options": [
      "Joi",
      "Ava",
      "Rachael",
      "Pris"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Joi",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 124,
    "category": "SET 13",
    "question": "Which South Korean thriller became the first non-English film to win Best Picture at the Oscars in 2020?",
    "options": [
      "Parasite",
      "Train to Busan",
      "Oldboy",
      "The Handmaiden"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Parasite",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 125,
    "category": "SET 13",
    "question": "What does the term \"RAG\" stand for in enterprise generative AI architectures?",
    "options": [
      "Retrieval-Augmented Generation",
      "Recursive Automated Gradient",
      "Real-time Agent Gateway",
      "Randomized Algorithmic Generalization"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Retrieval-Augmented Generation",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 126,
    "category": "SET 13",
    "question": "What is the signature weapon used by Jedi and Sith in the Star Wars saga?",
    "options": [
      "Lightsaber",
      "Blaster",
      "Vibroblade",
      "Plasma Caster"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Lightsaber",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 127,
    "category": "SET 13",
    "question": "Which programming language, originally named \"Oak\", was created by James Gosling at Sun Microsystems?",
    "options": [
      "Java",
      "C++",
      "Kotlin",
      "Pascal"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Java",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 128,
    "category": "SET 13",
    "question": "What revolutionary communication platform was acquired by Elon Musk in 2022 and rebranded as \"X\"?",
    "options": [
      "Twitter",
      "Tumblr",
      "Reddit",
      "Discord"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Twitter",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 129,
    "category": "SET 13",
    "question": "In the film Free Guy (2021), what kind of video game character breaks his programming and becomes sentient?",
    "options": [
      "An NPC (Non-Player Character)",
      "The Final Boss",
      "A Playable Hero",
      "A Server Admin"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) An NPC (Non-Player Character)",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 130,
    "category": "SET 13",
    "question": "What does the abbreviation \"CSS\" stand for in web design?",
    "options": [
      "Cascading Style Sheets",
      "Creative System Scripts",
      "Computer Syntax Standards",
      "Core Stylistic Server"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Cascading Style Sheets",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 131,
    "category": "SET 14",
    "question": "What AI generative video model created by OpenAI produces photorealistic high-definition video clips from prompts?",
    "options": [
      "Sora",
      "Gen-2",
      "Pika",
      "Stable Video"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sora",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 132,
    "category": "SET 14",
    "question": "Who is the current CEO of Apple Inc. who succeeded Steve Jobs in August 2011?",
    "options": [
      "Tim Cook",
      "Craig Federighi",
      "Jony Ive",
      "Phil Schiller"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Tim Cook",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 133,
    "category": "SET 14",
    "question": "In RoboCop (1987), what fallen Detroit police officer is resurrected as a cybernetic law enforcer?",
    "options": [
      "Alex Murphy",
      "John Connor",
      "Rick Deckard",
      "Douglas Quaid"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Alex Murphy",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 134,
    "category": "SET 14",
    "question": "Which British musician released the global hit single \"As It Was\" on his album Harry's House?",
    "options": [
      "Harry Styles",
      "Ed Sheeran",
      "Zayn Malik",
      "Lewis Capaldi"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Harry Styles",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 135,
    "category": "SET 14",
    "question": "What type of neural network layer is primarily used in Computer Vision to detect edges and patterns through filters?",
    "options": [
      "Convolutional Layer",
      "Recurrent Layer",
      "Dense Linear Layer",
      "Embedding Layer"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Convolutional Layer",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 136,
    "category": "SET 14",
    "question": "Which video game holds the record for generating $1 billion in retail sales faster than any entertainment product in history (in 3 days)?",
    "options": [
      "Grand Theft Auto V",
      "Red Dead Redemption 2",
      "Call of Duty: Modern Warfare 2",
      "Cyberpunk 2077"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Grand Theft Auto V",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 137,
    "category": "SET 14",
    "question": "What is the fundamental time complexity of binary search on a sorted array of N elements?",
    "options": [
      "O(log N)",
      "O(N)",
      "O(N\u00b2)",
      "O(1)"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) O(log N)",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 138,
    "category": "SET 14",
    "question": "What company developed the widely used open-source mobile operating system \"Android\"?",
    "options": [
      "Android Inc. (later acquired by Google)",
      "Sun Microsystems",
      "Motorola",
      "HTC"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Android Inc. (later acquired by Google)",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 139,
    "category": "SET 14",
    "question": "In science fiction, what is the theoretical device capable of materializing any physical object or food from digital patterns called?",
    "options": [
      "Replicator",
      "Transporter",
      "Holodeck",
      "Synthesizer"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Replicator",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 140,
    "category": "SET 14",
    "question": "What does the acronym \"HTTP\" stand for?",
    "options": [
      "Hypertext Transfer Protocol",
      "High Transfer Text Platform",
      "Hybrid Text Tracking Protocol",
      "Hyperlink Transmission Program"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Hypertext Transfer Protocol",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 141,
    "category": "SET 15",
    "question": "What AI music creation tool went viral in 2024 for generating full radio-quality songs with vocals from short text prompts?",
    "options": [
      "Suno AI",
      "Stable Audio",
      "VoiceMod",
      "Splice"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Suno AI",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 142,
    "category": "SET 15",
    "question": "Who serves as the CEO of IBM, steering the company toward hybrid cloud computing and enterprise AI with watsonx?",
    "options": [
      "Arvind Krishna",
      "Ginni Rometty",
      "Lou Gerstner",
      "Thomas J. Watson"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Arvind Krishna",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 143,
    "category": "SET 15",
    "question": "In Pixar's WALL-E, what is the name of the rogue autopilot AI steering the Axiom starship?",
    "options": [
      "AUTO",
      "HAL",
      "GO-4",
      "BURN-E"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) AUTO",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 144,
    "category": "SET 15",
    "question": "What fantasy drama television series on HBO is the prequel to Game of Thrones, focusing on the Targaryen civil war?",
    "options": [
      "House of the Dragon",
      "The Witcher: Blood Origin",
      "The Wheel of Time",
      "Shadow and Bone"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) House of the Dragon",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 145,
    "category": "SET 15",
    "question": "What is the term for the numerical values in a neural network that are adjusted during the backpropagation training process?",
    "options": [
      "Weights and Biases",
      "Hyperlinks",
      "Tokens",
      "Kernels"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Weights and Biases",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 146,
    "category": "SET 15",
    "question": "What is the fastest land animal, and also the name of the world's most famous blue supersonic gaming hedgehog?",
    "options": [
      "Sonic",
      "Knuckles",
      "Tails",
      "Shadow"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sonic",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 147,
    "category": "SET 15",
    "question": "What logic gate outputs TRUE (1) only when both of its input signals are TRUE (1)?",
    "options": [
      "AND Gate",
      "OR Gate",
      "XOR Gate",
      "NOT Gate"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) AND Gate",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 148,
    "category": "SET 15",
    "question": "In what year did Wikipedia, the free collaborative online encyclopedia, officially launch?",
    "options": [
      "2001",
      "1998",
      "2004",
      "2006"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) 2001",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 149,
    "category": "SET 15",
    "question": "In The Matrix, what real-world underground city serves as the last stronghold of free human civilization?",
    "options": [
      "Zion",
      "Megacity",
      "Arcadia",
      "New Carthage"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Zion",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 150,
    "category": "SET 15",
    "question": "What does the acronym \"SDK\" stand for in software engineering?",
    "options": [
      "Software Development Kit",
      "System Diagnostic Kernel",
      "Standard Data Key",
      "Secure Developer Key"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Software Development Kit",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 151,
    "category": "SET 16",
    "question": "Which web browser engine developed by Google powers Chrome, Microsoft Edge, Brave, and Opera?",
    "options": [
      "Chromium (Blink)",
      "Gecko",
      "WebKit",
      "Trident"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Chromium (Blink)",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 152,
    "category": "SET 16",
    "question": "Who is the female CEO of semiconductor giant AMD who led the company's historic resurgence with Ryzen and EPYC chips?",
    "options": [
      "Lisa Su",
      "Safra Catz",
      "Sheryl Sandberg",
      "Meg Whitman"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Lisa Su",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 153,
    "category": "SET 16",
    "question": "In Chappie (2015), what South African rap-rave duo adopted and raised the sentient police robot?",
    "options": [
      "Die Antwoord",
      "Major Lazer",
      "Little Big",
      "The Prodigy"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Die Antwoord",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 154,
    "category": "SET 16",
    "question": "What 2022 movie starring Michelle Yeoh won 7 Oscars including Best Picture, exploring a whimsical multiverse?",
    "options": [
      "Everything Everywhere All at Once",
      "Doctor Strange in the Multiverse of Madness",
      "Past Lives",
      "The Whale"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Everything Everywhere All at Once",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 155,
    "category": "SET 16",
    "question": "What type of prompt engineering involves giving an AI model a step-by-step reasoning pattern to solve complex logic?",
    "options": [
      "Chain-of-Thought (CoT) Prompting",
      "Zero-Shot Prompting",
      "Adversarial Prompting",
      "Temperature Injection"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Chain-of-Thought (CoT) Prompting",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 156,
    "category": "SET 16",
    "question": "What popular sandbox video game platform allows players to create games using the Luau scripting language?",
    "options": [
      "Roblox",
      "Minecraft",
      "Core",
      "Rec Room"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Roblox",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 157,
    "category": "SET 16",
    "question": "What is the base-16 numerical numbering system widely used to represent colors and memory addresses in computing?",
    "options": [
      "Hexadecimal",
      "Octal",
      "Binary",
      "Decimal"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Hexadecimal",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 158,
    "category": "SET 16",
    "question": "What Japanese gaming company released the Game Boy handheld console in 1989?",
    "options": [
      "Nintendo",
      "Sega",
      "Bandai",
      "Konami"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Nintendo",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 159,
    "category": "SET 16",
    "question": "In Person of Interest, what is the name of the mass surveillance artificial intelligence that predicts violent crimes?",
    "options": [
      "The Machine",
      "Samaritan",
      "The Oracle",
      "Omniscience"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) The Machine",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 160,
    "category": "SET 16",
    "question": "What does the acronym \"IP\" stand for in computer networking?",
    "options": [
      "Internet Protocol",
      "Interface Port",
      "Internal Program",
      "Integrated Pathway"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Internet Protocol",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 161,
    "category": "SET 17",
    "question": "What parameter in generative AI inference controls the randomness or creativity of the output text?",
    "options": [
      "Temperature",
      "Learning Rate",
      "Batch Size",
      "Epoch Count"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Temperature",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 162,
    "category": "SET 17",
    "question": "Who founded SpaceX in 2002 with the goal of reducing space transportation costs to enable the colonization of Mars?",
    "options": [
      "Elon Musk",
      "Jeff Bezos",
      "Richard Branson",
      "Burt Rutan"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Elon Musk",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 163,
    "category": "SET 17",
    "question": "In Source Code (2011), how many minutes before a commuter train explosion does the protagonist repeatedly relive?",
    "options": [
      "8 minutes",
      "5 minutes",
      "12 minutes",
      "15 minutes"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) 8 minutes",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 164,
    "category": "SET 17",
    "question": "Which American singer had monumental chart-topping success with \"Drivers License\" and \"Vampire\"?",
    "options": [
      "Olivia Rodrigo",
      "Sabrina Carpenter",
      "Gracie Abrams",
      "Chappell Roan"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Olivia Rodrigo",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 165,
    "category": "SET 17",
    "question": "What does the abbreviation \"AGI\" stand for in artificial intelligence research?",
    "options": [
      "Artificial General Intelligence",
      "Automated Generative Interface",
      "Advanced Gradient Iteration",
      "Applied Global Inference"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Artificial General Intelligence",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 166,
    "category": "SET 17",
    "question": "In Minecraft, what mythical boss mob must be defeated in the End dimension to trigger the game's credit crawl?",
    "options": [
      "Ender Dragon",
      "Wither",
      "Warden",
      "Elder Guardian"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Ender Dragon",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 167,
    "category": "SET 17",
    "question": "Which common sorting algorithm operates by repeatedly swapping adjacent elements that are in the wrong order?",
    "options": [
      "Bubble Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Bubble Sort",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 168,
    "category": "SET 17",
    "question": "What video streaming subscription service was launched by The Walt Disney Company in late 2019?",
    "options": [
      "Disney+",
      "Hulu",
      "ESPN+",
      "Starz"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Disney+",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 169,
    "category": "SET 17",
    "question": "In The Hitchhiker's Guide to the Galaxy, what number did supercomputer Deep Thought reveal as the Answer to Life, the Universe, and Everything?",
    "options": [
      "42",
      "7",
      "101",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) 42",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 170,
    "category": "SET 17",
    "question": "What does the acronym \"SaaS\" stand for in cloud computing?",
    "options": [
      "Software as a Service",
      "Storage and Application Server",
      "System Automation and Security",
      "Synchronous API as a Service"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Software as a Service",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 171,
    "category": "SET 18",
    "question": "What AI alignment technique uses human feedback and ratings to steer language models toward safe responses?",
    "options": [
      "RLHF (Reinforcement Learning from Human Feedback)",
      "Gradient Descent",
      "Quantization",
      "Pruning"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) RLHF (Reinforcement Learning from Human Feedback)",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 172,
    "category": "SET 18",
    "question": "Who was the legendary co-founder of Intel known for his law predicting that transistor counts on microchips double roughly every two years?",
    "options": [
      "Gordon Moore",
      "Robert Noyce",
      "Andy Grove",
      "William Shockley"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Gordon Moore",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 173,
    "category": "SET 18",
    "question": "In I, Robot, what is the central supercomputer AI that takes control of US Robotics to enforce its own interpretation of the Laws of Robotics?",
    "options": [
      "VIKI",
      "Skynet",
      "Mother",
      "WOPR"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) VIKI",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 174,
    "category": "SET 18",
    "question": "Which hit Netflix animated series based on League of Legends lore won the Primetime Emmy Award for Outstanding Animated Program?",
    "options": [
      "Arcane",
      "Castlevania",
      "Cyberpunk: Edgerunners",
      "Blood of Zeus"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Arcane",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 175,
    "category": "SET 18",
    "question": "What mathematical activation function maps any real-valued number into a probability range between 0 and 1?",
    "options": [
      "Sigmoid",
      "ReLU",
      "Leaky ReLU",
      "Step Function"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sigmoid",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 176,
    "category": "SET 18",
    "question": "What is the name of the protagonist in Nintendo's The Legend of Zelda series who wields the Master Sword?",
    "options": [
      "Link",
      "Zelda",
      "Ganon",
      "Sheik"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Link",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 177,
    "category": "SET 18",
    "question": "What is the default port number used by unencrypted HTTP web traffic?",
    "options": [
      "80",
      "443",
      "22",
      "8080"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) 80",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 178,
    "category": "SET 18",
    "question": "What communication service founded by Jan Koum and Brian Acton in 2009 was acquired by Meta in 2014 for $19 billion?",
    "options": [
      "WhatsApp",
      "Telegram",
      "Signal",
      "Viber"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) WhatsApp",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 179,
    "category": "SET 18",
    "question": "In Ready Player One, what is the name of the virtual reality metaverse where billions of people live and play?",
    "options": [
      "The OASIS",
      "The Grid",
      "The Matrix",
      "Metaverse Prime"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) The OASIS",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 180,
    "category": "SET 18",
    "question": "What does the acronym \"GUI\" stand for in computing?",
    "options": [
      "Graphical User Interface",
      "General Utility Integration",
      "Global User Index",
      "Guided Unit Interface"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Graphical User Interface",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 181,
    "category": "SET 19",
    "question": "What open-source AI platform and repository hub, symbolized by a yellow smiling emoji, is often called the \"GitHub of Machine Learning\"?",
    "options": [
      "Hugging Face",
      "Kaggle",
      "Weights & Biases",
      "Replicate"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Hugging Face",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 182,
    "category": "SET 19",
    "question": "Who is the CEO of Dell Technologies who founded the company from his University of Texas dorm room in 1984?",
    "options": [
      "Michael Dell",
      "Marc Benioff",
      "Larry Ellison",
      "Steve Ballmer"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Michael Dell",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 183,
    "category": "SET 19",
    "question": "In Marvel's Iron Man 3, what experimental biochemical treatment created by AIM enables humans to regenerate limbs and generate extreme heat?",
    "options": [
      "Extremis",
      "Super Soldier Serum",
      "Vibranium Infusion",
      "Pym Particles"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Extremis",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 184,
    "category": "SET 19",
    "question": "What 2024 global pop single by Sabrina Carpenter dominated worldwide streaming charts with the hook \"Say you can't sleep, baby, I know that's that me, espresso\"?",
    "options": [
      "Espresso",
      "Please Please Please",
      "Feather",
      "Nonsense"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Espresso",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 185,
    "category": "SET 19",
    "question": "In training neural networks, what optimization algorithm computes the gradient of the loss function with respect to each weight via the chain rule?",
    "options": [
      "Backpropagation",
      "Linear Regression",
      "K-Means Clustering",
      "Random Forest"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Backpropagation",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 186,
    "category": "SET 19",
    "question": "What iconic battle royale map was the original setting for PlayerUnknown's Battlegrounds (PUBG)?",
    "options": [
      "Erangel",
      "Miramar",
      "Sanhok",
      "Vikendi"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Erangel",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 187,
    "category": "SET 19",
    "question": "What type of cyber attack floods a web server with massive volumes of fake traffic to knock it offline?",
    "options": [
      "DDoS (Distributed Denial of Service)",
      "Phishing",
      "SQL Injection",
      "Man-in-the-Middle"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) DDoS (Distributed Denial of Service)",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 188,
    "category": "SET 19",
    "question": "What video streaming platform was founded by three former PayPal employees (Chad Hurley, Steve Chen, Jawed Karim) in 2005?",
    "options": [
      "YouTube",
      "Vimeo",
      "Dailymotion",
      "Twitch"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) YouTube",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 189,
    "category": "SET 19",
    "question": "In The Matrix, what is the true nature of the energy source the machines harvest from humans?",
    "options": [
      "Bio-electric power and body heat",
      "Nuclear radiation",
      "Kinetic motion",
      "Neural wave frequencies"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Bio-electric power and body heat",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 190,
    "category": "SET 19",
    "question": "What does the abbreviation \"JSON\" stand for?",
    "options": [
      "JavaScript Object Notation",
      "Java Standard Output Network",
      "Joint Structured Online Node",
      "Justified System Object Network"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) JavaScript Object Notation",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 191,
    "category": "SET 20",
    "question": "What AI framework optimization technique reduces model weight precision (e.g. from 16-bit float to 4-bit integer) to run large models on consumer GPUs?",
    "options": [
      "Quantization",
      "Vectorization",
      "Tokenization",
      "Normalization"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Quantization",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 192,
    "category": "SET 20",
    "question": "Who serves as the Chief AI Scientist at Meta and is considered one of the \"Godfathers of AI\" for pioneering Convolutional Neural Networks?",
    "options": [
      "Yann LeCun",
      "Geoffrey Hinton",
      "Yoshua Bengio",
      "Andrew Ng"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Yann LeCun",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 193,
    "category": "SET 20",
    "question": "In Tenet (2020), what physical mechanism allows objects and people to travel backwards against the flow of time?",
    "options": [
      "Entropy Inversion",
      "Wormhole Dilation",
      "Quantum Tunneling",
      "Tachyonic Fusion"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Entropy Inversion",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 194,
    "category": "SET 20",
    "question": "Which artist released the 2024 viral pop/club album Brat, sparking a global summer internet aesthetic?",
    "options": [
      "Charli XCX",
      "Lorde",
      "Dua Lipa",
      "Chappell Roan"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Charli XCX",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 195,
    "category": "SET 20",
    "question": "What type of AI hallucination prevention system forces the model to fetch and cite external verified documents before generating a response?",
    "options": [
      "Grounding / RAG",
      "Temperature Scaling",
      "Dropout Regularization",
      "Batch Normalization"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Grounding / RAG",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 196,
    "category": "SET 20",
    "question": "Which video game development engine created by Epic Games is famous for Nanite geometry and Lumen lighting systems?",
    "options": [
      "Unreal Engine",
      "Unity",
      "Godot",
      "CryEngine"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Unreal Engine",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 197,
    "category": "SET 20",
    "question": "In computer memory hierarchy, which storage component is physically closest to the CPU core and has the fastest access speed?",
    "options": [
      "L1 CPU Cache",
      "RAM (DDR5)",
      "NVMe SSD",
      "Hard Disk Drive"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) L1 CPU Cache",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  },
  {
    "id": 198,
    "category": "SET 20",
    "question": "Which company created the original \"PlayStation\" video game console released in Japan in 1994?",
    "options": [
      "Sony",
      "Sega",
      "Nintendo",
      "Panasonic"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Sony",
    "difficulty": "HARD",
    "timeLimit": 15
  },
  {
    "id": 199,
    "category": "SET 20",
    "question": "In Alita: Battle Angel, what high-octane cyborg demolition sport is played by athletes in Iron City?",
    "options": [
      "Motorball",
      "Rollerball",
      "Cyberstrike",
      "Grid Clash"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Motorball",
    "difficulty": "EASY",
    "timeLimit": 15
  },
  {
    "id": 200,
    "category": "SET 20",
    "question": "What does the acronym \"GPU\" stand for in modern AI supercomputing clusters?",
    "options": [
      "Graphics Processing Unit",
      "General Program Utility",
      "Grid Performance Unit",
      "Guided Path Unit"
    ],
    "correctIndex": 0,
    "explanation": "Correct Answer: A) Graphics Processing Unit",
    "difficulty": "MEDIUM",
    "timeLimit": 15
  }
];
