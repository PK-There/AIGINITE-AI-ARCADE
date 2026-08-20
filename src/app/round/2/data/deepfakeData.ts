'use client'

export interface DeepfakeItem {
  id: string;
  type: 'binary' | 'multichoice';
  title: string;
  category: 'PORTRAIT' | 'HANDS & ANATOMY' | 'TEXT & SIGNAGE' | 'LIGHTING & SPECULAR' | 'HISTORICAL & VOICE' | 'ARCHITECTURAL SYNTHESIS';
  promptOrContext: string;
  // For binary:
  singleImage?: {
    url: string;
    isAi: boolean;
    label: string;
  };
  // For multichoice:
  options?: {
    id: string;
    url: string;
    label: string;
    isAi: boolean;
    tellSnippet: string;
  }[];
  // The correct answer:
  // For binary: true if AI, false if Real
  // For multichoice: option ID of the AI image
  correctAnswer: boolean | string;
  forensicTells: string[];
  detailedExplanation: string;
  zoomCoordinates?: { x: number; y: number; focusDesc: string };
}

export const DEEPFAKE_SCENARIOS: DeepfakeItem[] = [
  {
    id: 'DF-01',
    type: 'binary',
    title: 'Executive Studio Portrait: Authentic or Diffusion Model?',
    category: 'PORTRAIT',
    promptOrContext: 'High-resolution professional executive headshot with 85mm lens shallow depth of field.',
    singleImage: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      isAi: false,
      label: 'Studio Model Headshot',
    },
    correctAnswer: false, // It is REAL
    forensicTells: [
      'Natural asymmetric skin micropores and authentic peach fuzz around jawline',
      'Realistic light reflection (catchlight) in cornea matches single umbrella softbox source',
      'Hair strands have individual organic roots rather than plastic blend-together strands',
      'Earring and cartilage anatomy is completely symmetrical with zero melting'
    ],
    detailedExplanation: 'This is a genuine photograph. Modern generative diffusion models often render overly airbrushed skin with non-physical "plastic" sheen and inconsistent cornea catchlights. Real skin contains natural blemishes, cellular pores, and distinct specular specularities.',
    zoomCoordinates: { x: 52, y: 38, focusDesc: 'Notice crisp catchlight in both pupils and micro-texture on cheeks.' }
  },
  {
    id: 'DF-02',
    type: 'multichoice',
    title: 'Anatomical Precision: Identify the Synthetic AI Hand',
    category: 'HANDS & ANATOMY',
    promptOrContext: 'Hands holding a coffee mug / typing on keyboard. One of these images contains structural generative hallucinations.',
    options: [
      {
        id: 'opt-A',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        label: 'Subject A: Casual Wrist & Watch',
        isAi: false,
        tellSnippet: 'Natural bone knuckles and realistic veins'
      },
      {
        id: 'opt-B',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        label: 'Subject B: Natural Hand Gesture',
        isAi: false,
        tellSnippet: 'Consistent finger joint proportions and nail bed geometry'
      },
      {
        id: 'opt-C',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        label: 'Subject C: Generative Cyber Portrait with Extra Phalange',
        isAi: true,
        tellSnippet: 'Subtle finger fusion, impossible knuckle joint rotation, and mismatched fingernails'
      },
      {
        id: 'opt-D',
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
        label: 'Subject D: Portrait with Natural Grip',
        isAi: false,
        tellSnippet: 'Clean anatomical geometry and realistic skin creases'
      }
    ],
    correctAnswer: 'opt-C',
    forensicTells: [
      'AI diffusion models struggle with 3D kinematic hand priors',
      'Look for fingernail beds blending directly into the adjacent skin cuticle without a ridge',
      'Distorted joint counts or fingers merging into held props'
    ],
    detailedExplanation: 'Image C is synthetic. Despite recent improvements in flux and midjourney architectures, hand articulation, knuckle creasing, and fingernail perspective remain among the most frequent failure modes of latent diffusion models.',
  },
  {
    id: 'DF-03',
    type: 'binary',
    title: 'Neon Cyberpunk Shibuya Alley: Real Tokyo vs Latent Space?',
    category: 'TEXT & SIGNAGE',
    promptOrContext: 'Cyberpunk neon street at night with glowing kanji signs and reflective puddles.',
    singleImage: {
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
      isAi: false,
      label: 'Tokyo Alley Night Photography',
    },
    correctAnswer: false, // It is REAL
    forensicTells: [
      'Japanese Kanji neon signs contain authentic stroke orders and legitimate readable characters',
      'Electrical cables and air conditioning units have logical physical mounting brackets',
      'Puddle reflections perfectly mirror the geometry of overhead neon tubes without phase warping'
    ],
    detailedExplanation: 'This is a genuine photograph. AI-generated urban scenes frequently produce "pseudo-kanji" or garbled glyphs that mimic the aesthetic of text without coherent linguistic meaning, alongside unanchored power cables floating in mid-air.',
    zoomCoordinates: { x: 45, y: 25, focusDesc: 'Inspect neon Kanji typography and distinct hanging cable routing.' }
  },
  {
    id: 'DF-04',
    type: 'binary',
    title: 'Synthetic Voice & Speech Avatar: Lip-Sync Boundary Check',
    category: 'HISTORICAL & VOICE',
    promptOrContext: 'AI video generation inspection: Detect if this conference keynote avatar is digitally generated via neural talking-head synthesis.',
    singleImage: {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      isAi: false,
      label: 'Conference Keynote Speaker',
    },
    correctAnswer: false, // REAL
    forensicTells: [
      'Inner mouth oral cavity depth, tongue movement, and enamel lighting are physically accurate',
      'Zero temporal blurring or "teeth bar" homogenization often seen in GANs/Wav2Lip',
      'Micro-expressions in the zygomaticus major and orbicularis oculi muscles synchronise naturally'
    ],
    detailedExplanation: 'Deepfake video talking heads often generate a static, homogeneous "white row" for teeth rather than individual translucent teeth, accompanied by subtle boundary jitter around the chin and collar.',
    zoomCoordinates: { x: 50, y: 40, focusDesc: 'Check crisp dental separation and natural lip margin transitions.' }
  },
  {
    id: 'DF-05',
    type: 'multichoice',
    title: 'Architectural Glitch: Detect the Non-Euclidean AI Structure',
    category: 'ARCHITECTURAL SYNTHESIS',
    promptOrContext: 'Four futuristic architecture designs. One contains geometric impossibility and vanishing point collapse.',
    options: [
      {
        id: 'opt-arch-1',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        label: 'Option 1: Modern Cantilever Glass Villa',
        isAi: false,
        tellSnippet: 'Consistent parallel perspective vanishing lines'
      },
      {
        id: 'opt-arch-2',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        label: 'Option 2: Luxury Minimalist Home',
        isAi: false,
        tellSnippet: 'Coherent structural load-bearing beams'
      },
      {
        id: 'opt-arch-3',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        label: 'Option 3: Generative Parametric Pavilion (AI Inconsistency)',
        isAi: true,
        tellSnippet: 'Staircases leading directly into solid walls and columns terminating into thin air'
      },
      {
        id: 'opt-arch-4',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        label: 'Option 4: Coastal Geometric Residence',
        isAi: false,
        tellSnippet: 'True orthogonal perspective lines and consistent sun cast shadows'
      }
    ],
    correctAnswer: 'opt-arch-3',
    forensicTells: [
      'Stair tread depth becomes variable and leads into impossible dead ends',
      'Support columns float or blend into glass window panels',
      'Shadow angles on the ground conflict with the position of the primary sunlight vector'
    ],
    detailedExplanation: 'Option 3 is AI-generated. Neural generators optimize for local surface textures rather than global 3D spatial coherence, frequently generating stairs with unequal riser heights, non-functional doors, and non-Euclidean angles.',
  },
  {
    id: 'DF-06',
    type: 'binary',
    title: 'Specular Rim Lighting on Sci-Fi Armor: Real Prop vs 3D Neural Render?',
    category: 'LIGHTING & SPECULAR',
    promptOrContext: 'Cybernetic tactical helmet with visor HUD illumination and carbon fiber weave texture.',
    singleImage: {
      url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      isAi: false,
      label: 'Cyberpunk Cosplay & Practical Prop Studio Shot',
    },
    correctAnswer: false, // REAL practical prop
    forensicTells: [
      'Carbon fiber pattern maintains strict weave orientation across curvature without warping',
      'Visor LED light falloff follows the inverse-square law with realistic bloom on adjacent fabric',
      'Realistic mechanical screw threads and fabrication seam tooling marks'
    ],
    detailedExplanation: 'Real practical props feature genuine fabrication seams, consistent textural weaves across curved geometry, and mathematically physically-accurate photometric falloff on neighbouring surfaces.',
    zoomCoordinates: { x: 50, y: 45, focusDesc: 'Notice crisp mechanical tolerances and precise material seam joints.' }
  }
];
