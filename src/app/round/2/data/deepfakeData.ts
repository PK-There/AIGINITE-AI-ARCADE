'use client'

export interface DeepfakeItem {
  id: string;
  type: 'binary' | 'multichoice';
  title: string;
  category: 'PORTRAIT' | 'HANDS & ANATOMY' | 'TEXT & SIGNAGE' | 'LIGHTING & SPECULAR' | 'HISTORICAL & VOICE' | 'ARCHITECTURAL SYNTHESIS';
  promptOrContext: string;
  singleImage?: {
    url: string;
    isAi: boolean;
    label: string;
  };
  correctAnswer: boolean | string;
  forensicTells: string[];
  detailedExplanation: string;
  zoomCoordinates?: { x: number; y: number; focusDesc: string };
  options?: {
    id: string;
    url: string;
    label: string;
    isAi: boolean;
    tellSnippet: string;
  }[];
}

export const DEEPFAKE_SCENARIOS: DeepfakeItem[] = [
  {
    "id": "DF-01",
    "type": "binary",
    "title": "Fact Verification Case #1: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "The 56th GST Council Meeting announced measures focused on rationalizing GST rates across certain goods and services and simplifying the refund mechanism for exporters. The Council confirmed no blanket GST refunds to all taxpayers but emphasized procedural reforms to ease compliance and expedite genuine refund claims. Official notifications and detailed minutes were published on the GST Portal (gst.gov.in), and major news outlets extensively covered the decisions emphasizing targeted relief for exporters and rate adjustments.",
    "correctAnswer": false,
    "forensicTells": [
      "Official government announcements publish scheme details on the GST Portal and issue gazette notifications.",
      "Major policy decisions like rate rationalization are widely reported by leading business news outlets.",
      "The 56th GST Council Meeting specifically focused on refund mechanism simplification for exporters, not blanket refunds."
    ],
    "detailedExplanation": "This is REAL. The GST Council's 56th meeting resulted in legitimate policy updates on rate rationalization and refund process reforms officially announced on gst.gov.in and covered extensively by credible news sources. Such reforms target improving compliance and transparency rather than issuing one-time blanket refunds.\n\nDetection Tip: Always verify GST Council decisions from official documents on gst.gov.in and trusted news agencies. Genuine announcements feature detailed government notifications and broad media coverage."
  },
  {
    "id": "DF-02",
    "type": "binary",
    "title": "Motion Synthesis Case #2: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/videos/fake1.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is FAKE - an AI-generated deepfake video. Modern deepfake technology can create convincing videos, but telltale signs include video-visual sync issues, lighting mismatches, and unnatural facial movements. Professional video production maintains consistent lighting and perfect video sync.\n\nDetection Tip: Watch for subtle desync between video and lip movements, check if lighting appears natural, and observe whether eye movements and blinking patterns seem human-like."
  },
  {
    "id": "DF-03",
    "type": "binary",
    "title": "Visual Authenticity Case #3: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/1.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This is REAL - an realimage. AI image generators often struggle with creating large crowds without repeating patterns and can produce anatomical errors like extra fingers or distorted proportions. Real photographs maintain consistent perspective and unique individuals.\n\nDetection Tip: Zoom in and check for repeated faces or patterns. Look for anatomical impossibilities like extra or missing fingers, asymmetrical eyes, or distorted body proportions. Check if the perspective and scale remain consistent throughout the image."
  },
  {
    "id": "DF-04",
    "type": "binary",
    "title": "Textual Forensic Case #4: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "An article claims a new scientific study proves that humans only use 10% of their brain capacity. The article includes impressive-sounding citations like 'Journal of Cognitive Neuroscience, Volume 42, 2024' and quotes from 'Dr. Sarah Mitchell, leading neuroscientist at Stanford.' The writing is polished and professional.",
    "correctAnswer": true,
    "forensicTells": [
      "The '10% brain myth' has been scientifically debunked for decades",
      "Real scientific articles have verifiable authors and institutions",
      "Fake articles often perpetuate well-known myths without new evidence"
    ],
    "detailedExplanation": "This is FAKE - AI-generated misinformation. AI language models can create convincing-sounding articles with fabricated citations and non-existent experts. The '10% brain myth' has been scientifically debunked for decades. Real scientific articles have verifiable authors, institutions, and DOI numbers.\n\nDetection Tip: Verify scientific claims by checking if the journal exists, searching for the cited researchers, and confirming the study with independent sources. Be wary of articles that perpetuate well-known myths and always cross-reference with established scientific institutions."
  },
  {
    "id": "DF-05",
    "type": "binary",
    "title": "Fact Verification Case #5: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A viral post on Instagram and Twitter claims that a top Bollywood actor has announced their retirement from films, citing health reasons. The post includes a screenshot of a WhatsApp message allegedly from the actor's personal assistant, stating that the actor will be stepping away from all future projects after their next film. The message is shared by several entertainment news accounts and even a few verified fan pages. The post urges followers to share their favorite memories and wishes for the actor, and some influencers have started trending hashtags in tribute.",
    "correctAnswer": true,
    "forensicTells": [
      "Major celebrity announcements are never made through WhatsApp screenshots",
      "Verified actors always use their official social media accounts for important announcements",
      "The actor's official social media remains active with no mention of retirement"
    ],
    "detailedExplanation": "This is FAKE. Major celebrity retirement announcements are always made through official channels—such as the actor's verified social media accounts, press conferences, or interviews with leading entertainment news outlets. Retirement is a significant career event and would be accompanied by a formal statement, not just a screenshot of a WhatsApp message shared by unofficial accounts. In reality, the actor has not made any such announcement, and their official social media remains active with no mention of retirement.\n\nDetection Tip: Always verify major celebrity news by checking the official social media profiles of the celebrity and reputable entertainment news sources. Be cautious of posts that rely on screenshots, private messages, or unverified accounts, especially if they lack direct links to official statements or press releases."
  },
  {
    "id": "DF-06",
    "type": "binary",
    "title": "Motion Synthesis Case #6: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/videos/fake23.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This is a REAL video showing a genuine product demonstration. The content showcases actual features and functionality of a consumer product. The video quality, lighting, and presentation are consistent with professional marketing content.\n\nDetection Tip: Authentic product demonstration videos typically have consistent lighting, natural movements, and high production quality. Look for realistic details like natural hand movements, consistent reflections, and professional editing."
  },
  {
    "id": "DF-07",
    "type": "binary",
    "title": "Visual Authenticity Case #7: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/2.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE photograph taken by a professional photographer. The image shows an authentic scene with natural lighting, realistic textures, and consistent perspective. There are no signs of digital manipulation or AI generation.\n\nDetection Tip: Authentic photographs typically have natural lighting, realistic textures, and consistent depth of field. Look for realistic details like natural shadows, realistic skin textures, and consistent reflections."
  },
  {
    "id": "DF-08",
    "type": "binary",
    "title": "Textual Forensic Case #8: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A blog post discusses the benefits of a new health supplement, claiming it can boost energy, improve focus, and enhance immune function. The post includes testimonials from users with dramatic before-and-after results.",
    "correctAnswer": true,
    "forensicTells": [
      "Exaggerated health claims are often a sign of fake content",
      "Real health information is backed by peer-reviewed research",
      "Posts with only positive testimonials and no scientific backing are suspicious"
    ],
    "detailedExplanation": "This is FAKE - AI-generated marketing content. The claims are exaggerated and not supported by scientific evidence. Real health information is typically backed by peer-reviewed research and includes disclaimers about individual results may vary.\n\nDetection Tip: Be skeptical of health products that promise dramatic results or claim to cure multiple conditions. Verify health claims with reputable medical sources and be wary of posts with only positive testimonials and no scientific backing."
  },
  {
    "id": "DF-09",
    "type": "binary",
    "title": "Fact Verification Case #9: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A widely shared news article claims that the Ministry of Education has decided to phase out final exams in all Indian universities, replacing them with only internal assessments, effective from the next academic year. The article includes fake statements attributed to government officials and a fabricated 'Ministry of Education Circular' without any official notification on the ministry’s website or coverage by recognized education news outlets.",
    "correctAnswer": true,
    "forensicTells": [
      "Major education policy changes are formally announced via official notifications and press releases.",
      "No official circular or government website references this decision.",
      "Leading education news sources have no such report."
    ],
    "detailedExplanation": "This is FAKE. Major structural changes in the Indian education system, such as the removal of final exams, would require official circulars, public consultations, and broad coverage by reputed news agencies. The lack of any statement on official channels and the reliance on forged documents make this claim false.\n\nDetection Tip: Always check the official Ministry of Education website and reputable news portals for announcements about major policy changes. Be wary of screenshots or PDFs with no verifiable links or supporting reports from known authorities."
  },
  {
    "id": "DF-10",
    "type": "binary",
    "title": "Motion Synthesis Case #10: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "An video clip will be played, purportedly featuring a well-known politician making controversial remarks. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/videos/fake3.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE video clip generated using AI voice synthesis. The tone and inflection may sound convincing, but digital artifacts and unnatural pacing reveal it as artificial.\n\nDetection Tip: Pay attention to unnatural pauses, inconsistent tone, and any background artifacts. Authentic public statements by politicians are covered by major news outlets and are usually accompanied by video or transcripts on official platforms."
  },
  {
    "id": "DF-11",
    "type": "binary",
    "title": "Visual Authenticity Case #11: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/fake3.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE image produced using generative AI. Subtle inconsistencies in lighting, blurred edges, or unnatural facial features can give away its origin.\n\nDetection Tip: Look for visual anomalies—unrealistic backgrounds, mismatched reflections, or details such as misshapen hands and ears often suggest AI creation."
  },
  {
    "id": "DF-12",
    "type": "binary",
    "title": "Textual Forensic Case #12: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A legitimate government press release details a new policy offering subsidized data plans for all college students in India as part of a nationwide digital literacy initiative. Major national news outlets and the official Ministry of Electronics & IT website have published articles and notifications confirming the approved plan, including application details and a dedicated helpline.",
    "correctAnswer": false,
    "forensicTells": [
      "The press release appears on official government and ministry websites.",
      "Major news outlets report the same story with consistent details.",
      "The scheme offers tangible details like a specific helpline and application process."
    ],
    "detailedExplanation": "This is REAL. The implementation of a national digital literacy initiative for students has been covered on official government websites and confirmed by leading news agencies. The announcement provides clear, actionable information consistent across trusted platforms.\n\nDetection Tip: For government policy news, look for official statements on ministry websites and corroborating reports from multiple top-tier news outlets to ensure authenticity."
  },
  {
    "id": "DF-13",
    "type": "binary",
    "title": "Fact Verification Case #13: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A trending Facebook post claims that grocery prices will be halved starting next month as the government is introducing a new 'Subsidy Act.' The post shows a blurry screenshot of a supposed government notification with several spelling mistakes, but there’s no mention of this act on any official government portals or news channels.",
    "correctAnswer": true,
    "forensicTells": [
      "Official notifications are not blurry and do not have spelling mistakes.",
      "Major economic policies appear on reputable news and official portals.",
      "No coverage or press release from the government."
    ],
    "detailedExplanation": "This is FAKE. Genuine government acts or subsidies are always announced through formal, error-free notifications distributed by official websites and major news agencies. Viral posts with blurry photos and spelling errors lack credibility.\n\nDetection Tip: Always check for official sources and look for coverage by trusted news portals before believing viral economic claims."
  },
  {
    "id": "DF-14",
    "type": "binary",
    "title": "Motion Synthesis Case #14: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "An video clip will be played, Check if it's real or fake.",
    "singleImage": {
      "url": "/media/videos/fake4.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This is a REAL video clip. AI tools can't mimic voices, but inconsistencies in tone, unnatural pacing, or robotic inflection can reveal it as artificial. Such confessions from celebrities would make headlines if real.\n\nDetection Tip: Cross-check major claims against real interviews or press releases. REAL video may sound slightly off or lack supporting credible news."
  },
  {
    "id": "DF-15",
    "type": "binary",
    "title": "Visual Authenticity Case #15: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/fake4.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE image produced using AI generation. Difficulties with hands, backgrounds, or lighting often signal manipulation.\n\nDetection Tip: Look for subtle distortions—strange hands, mismatched shadows, or other odd details."
  },
  {
    "id": "DF-16",
    "type": "binary",
    "title": "Textual Forensic Case #16: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A science blog announces an international research team's discovery of a bacteria that can rapidly digest plastic waste, with results published in a leading peer-reviewed journal. The discovery is reported by several science news outlets and references a specific article DOI in 'Nature Environment.'",
    "correctAnswer": false,
    "forensicTells": [
      "The news is published in a peer-reviewed scientific journal.",
      "Multiple reputable science news agencies have covered the story.",
      "A verifiable journal DOI is provided for further reading."
    ],
    "detailedExplanation": "This is REAL. Major scientific breakthroughs are confirmed by reputable journal publications and corresponding widespread news coverage.\n\nDetection Tip: Check for peer-reviewed sources, journal references, and confirmation by more than one trustworthy science news organization."
  },
  {
    "id": "DF-17",
    "type": "binary",
    "title": "Fact Verification Case #17: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A widely forwarded WhatsApp message claims that the government has banned all video-sharing apps after midnight due to a new 'Digital Security Emergency.' The message references an 'urgent order' but provides no link to an official document, and no major websites report the news.",
    "correctAnswer": true,
    "forensicTells": [
      "Major app bans are widely reported by official government and news sites.",
      "No reputable news portal or government source confirms the claim.",
      "Emergency digital orders are published with clear documentation."
    ],
    "detailedExplanation": "This is FAKE. App bans or digital restrictions are urgent and newsworthy events that are always announced by official authorities and widely covered by trusted media. A WhatsApp message without links or news is never proof.\n\nDetection Tip: Confirm any bans by checking government press releases and top news sources before forwarding such messages."
  },
  {
    "id": "DF-18",
    "type": "binary",
    "title": "Motion Synthesis Case #18: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A brief recording will played. Decide if the video is real or fake.",
    "singleImage": {
      "url": "/media/videos/fake5.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE video. Cloning apps can easily fabricate statements. Such admissions, if true, would be instantly investigated and reported in the press.\n\nDetection Tip: Search for evidence in established business news and legal filings—ignore isolated clips unless supported by the news."
  },
  {
    "id": "DF-19",
    "type": "binary",
    "title": "Visual Authenticity Case #19: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/fake18.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE, AI-generated image. Tell-tale signs include odd textures, mismatched lighting, or impossible details in complex backgrounds.\n\nDetection Tip: Zoom in for visual anomalies—strange object shapes or blurry areas reveal digital manipulation easily."
  },
  {
    "id": "DF-20",
    "type": "binary",
    "title": "Textual Forensic Case #20: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A tech update blog says the UPI payment system will undergo routine maintenance on Sunday from 1 AM to 4 AM, as officially announced by the National Payments Corporation of India (NPCI). The update is also reflected on the NPCI website and confirmed by several banking apps.",
    "correctAnswer": false,
    "forensicTells": [
      "Official maintenance updates appear on the NPCI website and banking apps.",
      "Multiple trusted banks and payment apps notify about planned downtime.",
      "The information is consistent across several tech and banking sources."
    ],
    "detailedExplanation": "This is REAL. Planned maintenance for national payment systems is published on official channels and matched by bank notifications. Routine updates with consistent timing and multiple confirmations signal genuine information.\n\nDetection Tip: Always verify instructions related to financial services by checking the official websites of payment networks and your bank, especially before believing downtime or update rumors."
  },
  {
    "id": "DF-21",
    "type": "binary",
    "title": "Fact Verification Case #21: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A widely circulated online article claims that the recently announced National Electric Vehicle Policy includes free EV charging stations for all vehicles indefinitely from next year. The article lacks references to any official government document or press release and contradicts statements from the Ministry of Power.",
    "correctAnswer": true,
    "forensicTells": [
      "Major policy details are clarified through official government releases and ministry updates.",
      "The Ministry of Power has publicly stated phased subsidies but not free unlimited charging.",
      "No verified press release or government website mentions such an offer."
    ],
    "detailedExplanation": "This is FAKE. Official electric vehicle policies specify subsidies and support but do not include free unlimited charging. Any claims lacking government confirmation or contradicting official statements should be doubted.\n\nDetection Tip: Verify policy facts by checking government portals such as the Ministry of Power and trusted news outlets before sharing."
  },
  {
    "id": "DF-22",
    "type": "binary",
    "title": "Motion Synthesis Case #22: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video clip will be shown, allegedly featuring a top climate scientist revealing suppressed data on global warming. Decide if the video is authentic or an AI-generated deepfake.",
    "singleImage": {
      "url": "/media/videos/fake6.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is a FAKE AI-generated video. Authentic scientific statements are published in peer-reviewed papers and official communications, not secretly leaked videos. The video shows subtle deepfake signs like unnatural facial movements.\n\nDetection Tip: Look for inconsistencies in lighting, unnatural facial expressions, and check for source credibility before trusting such videos."
  },
  {
    "id": "DF-23",
    "type": "binary",
    "title": "Visual Authenticity Case #23: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Check if it's real or fake.",
    "singleImage": {
      "url": "/media/images/fake6.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This is a REAL image with signs like inconsistent shadows and blurry edges.\n\nDetection Tip: Look for unrealistic details typical of AI synthesis."
  },
  {
    "id": "DF-24",
    "type": "binary",
    "title": "Textual Forensic Case #24: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A well-written essay discussing the importance of biodiversity conservation, highlighting its positive effects on ecosystem health, food security, and climate stability, published on an educational website with references to scientific reports and conservation initiatives.",
    "correctAnswer": false,
    "forensicTells": [
      "The essay cites scientific studies and official conservation programs.",
      "The writing style is consistent with educational content.",
      "Published on a recognized educational or environmental platform."
    ],
    "detailedExplanation": "This is REAL. Credible essays on environmental topics are backed by scientific evidence and hosted by trusted educational websites.\n\nDetection Tip: Look for cited sources, consistent language, and reputable publication platforms to verify text authenticity."
  },
  {
    "id": "DF-25",
    "type": "binary",
    "title": "Fact Verification Case #25: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A viral social media post falsely claims that the government is launching a nationwide scheme offering free smartphones to all citizens starting next month. The post includes an unofficial flyer with pixelated logos and no official sources.",
    "correctAnswer": true,
    "forensicTells": [
      "No official announcements or press releases support the claim.",
      "Official logos on the flyer are distorted, indicating fabrication.",
      "Reliable news and government websites have not reported this."
    ],
    "detailedExplanation": "This is FAKE. Large government giveaways are publicly announced through official channels, and visual quality with logo authenticity matters in identification.\n\nDetection Tip: Always check official government announcements and verified news platforms for confirmation."
  },
  {
    "id": "DF-26",
    "type": "binary",
    "title": "Motion Synthesis Case #26: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A promotional video purportedly features a celebrity endorsing a new product. Decide if the video is authentic or AI-generated.",
    "singleImage": {
      "url": "/media/videos/fake7.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This is an AI-generated fake video. Authentic celebrity endorsements are announced officially or shown in controlled campaigns.\n\nDetection Tip: Look for verification on official celebrity channels or trusted brand social media."
  },
  {
    "id": "DF-27",
    "type": "binary",
    "title": "Visual Authenticity Case #27: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image is presented. Determine if it's real or created by AI.",
    "singleImage": {
      "url": "/media/images/fake7.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This REAL image exhibits minor errors in lighting and object shapes typical of real images.\n\nDetection Tip: Spot inconsistencies and unnatural details to detect fakes."
  },
  {
    "id": "DF-28",
    "type": "binary",
    "title": "Textual Forensic Case #28: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A detailed paragraph on advancements in renewable energy technology, focusing on solar and wind energy, discussing challenges such as storage and grid integration, published on a technology news website.",
    "correctAnswer": false,
    "forensicTells": [
      "Text is detailed with industry terminology and challenges.",
      "Published on a known technology news or educational platform.",
      "References recent developments and real-world applications."
    ],
    "detailedExplanation": "This is REAL. Well-researched content hosted on reputable platforms with technical depth is reliable.\n\nDetection Tip: Check for publication source credibility and factual consistency."
  },
  {
    "id": "DF-29",
    "type": "binary",
    "title": "Fact Verification Case #29: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A misleading news piece claims that the Supreme Court has banned all cryptocurrency trading in India starting today, referencing a non-existent court order. Major financial news outlets contradict this claim.",
    "correctAnswer": true,
    "forensicTells": [
      "No official Supreme Court ruling exists on this topic.",
      "Contradicted by leading financial news organizations.",
      "Court orders are published on official judiciary websites."
    ],
    "detailedExplanation": "This is FAKE. Court decisions are public records and widely covered by credible media. Fake orders on social media should be verified.\n\nDetection Tip: Cross-check legal claims with official judiciary websites and reputable news sources."
  },
  {
    "id": "DF-30",
    "type": "binary",
    "title": "Motion Synthesis Case #30: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video clip allegedly reveals an executive admitting corporate fraud. Decide if it’s genuine or fabricated.",
    "singleImage": {
      "url": "/media/videos/fake8.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This video is AI-generated and not supported by any official investigations or reporting.\n\nDetection Tip: Verify with trustworthy news and official disclosures."
  },
  {
    "id": "DF-31",
    "type": "binary",
    "title": "Visual Authenticity Case #31: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image will be shown. Identify if it’s real or AI-created.",
    "singleImage": {
      "url": "/media/images/fake8.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "Typical REAL artifacts such as texture inconsistencies and distortion are visible.\n\nDetection Tip: Spot unnatural features and verify image sources."
  },
  {
    "id": "DF-32",
    "type": "binary",
    "title": "Textual Forensic Case #32: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A concise essay on the benefits of urban gardening, discussing mental health improvements, environmental impact, and community building, hosted on a local NGO website.",
    "correctAnswer": false,
    "forensicTells": [
      "Hosted on an NGO website with relevant environmental mission.",
      "References studies on mental health and sustainability.",
      "Written in a clear, accessible style."
    ],
    "detailedExplanation": "This is REAL. Community NGO content on urban gardening typically includes evidence-based benefits and community focus.\n\nDetection Tip: Look for website credibility and scientific backing of claims."
  },
  {
    "id": "DF-33",
    "type": "binary",
    "title": "Fact Verification Case #33: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A social media post claims India will ban single-use plastics nationwide starting next week without exceptions. No official government sources confirm this.",
    "correctAnswer": true,
    "forensicTells": [
      "Official bans include phased timelines and exemptions.",
      "No government notification for immediate, unqualified ban."
    ],
    "detailedExplanation": "This is FAKE. Plastic bans are implemented gradually with exemptions clearly outlined in official notifications. Immediate blanket bans are not supported by government policy.\n\nDetection Tip: Refer to Ministry of Environment statements and official government portals to verify plastic ban news."
  },
  {
    "id": "DF-34",
    "type": "binary",
    "title": "Motion Synthesis Case #34: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video allegedly shows a politician making inflammatory remarks. Verify its authenticity.",
    "singleImage": {
      "url": "/media/videos/fake9.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "The video contains no signs of AI manipulation including inconsistent lighting and unnatural facial expressions typical of real videos.\n\nDetection Tip: Compare with verified statements and consult trusted news sources before accepting such videos as genuine."
  },
  {
    "id": "DF-35",
    "type": "binary",
    "title": "Visual Authenticity Case #35: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image purportedly of a recent summit is shown. Check if it’s real.",
    "singleImage": {
      "url": "/media/images/fake9.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "The image exhibits visual inconsistencies such as unnatural edges and odd shadows typical of AI-generated images.\n\nDetection Tip: Search for official photos from the event and compare lighting and details."
  },
  {
    "id": "DF-36",
    "type": "binary",
    "title": "Textual Forensic Case #36: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "An article discusses the Indian government's new subsidy scheme promoting solar panel installations in rural areas. It details the program objectives, eligibility criteria, and expected environmental benefits, citing official sources and expert opinions.",
    "correctAnswer": false,
    "forensicTells": [
      "The text cites government sources and expert statements.",
      "Published in a style consistent with reputable environmental blogs.",
      "Details match current renewable energy policies."
    ],
    "detailedExplanation": "This article is REAL. The subsidy program is part of India's ongoing commitment to expand renewable energy access. Official government portals and credible news outlets corroborate these details, making the article a trustworthy source.\n\nDetection Tip: Always corroborate policy-related articles with official government websites and recognized environmental news outlets."
  },
  {
    "id": "DF-37",
    "type": "binary",
    "title": "Fact Verification Case #37: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A viral regional news post falsely claims nationwide monsoon delays by an entire month. Meteorological forecasts contradict this with detailed weekly updates.",
    "correctAnswer": true,
    "forensicTells": [
      "Weather forecasts are transparent and frequently updated by official agencies.",
      "No support for the claim across recognized meteorological channels."
    ],
    "detailedExplanation": "This claim is FAKE. Monsoon timings are predicted by the India Meteorological Department and updated regularly. False rumors circulate easily but can be debunked by official weather reports.\n\nDetection Tip: Always check the India Meteorological Department’s official website or verified weather news before accepting such claims."
  },
  {
    "id": "DF-38",
    "type": "binary",
    "title": "Motion Synthesis Case #38: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A viral wildlife conservation success story video is circulating widely. Assess whether this video is authentic.",
    "singleImage": {
      "url": "/media/videos/fake10.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "Despite its convincing appearance, the video has been identified as real content lacking verifiable sources. Reliable conservation success videos are typically shared by bona fide environmental organizations.\n\nDetection Tip: Confirm such videos with known conservation agencies or NGOs for authenticity."
  },
  {
    "id": "DF-39",
    "type": "binary",
    "title": "Visual Authenticity Case #39: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image featuring a new urban architectural project is presented. Verify its authenticity.",
    "singleImage": {
      "url": "/media/images/fake10.png",
      "isAi": true,
      "label": "Inspection Photograph"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "Signs of AI generation include inconsistent shadows, odd proportions, and missing fine architectural details. Genuine images of urban projects are usually published by the developers or city authorities.\n\nDetection Tip: Compare images with official releases from architects or municipal websites."
  },
  {
    "id": "DF-40",
    "type": "binary",
    "title": "Textual Forensic Case #40: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A blog post claims a miracle herbal supplement cures all viral infections without side effects. It features emotional testimonials but no scientific references.",
    "correctAnswer": true,
    "forensicTells": [
      "Lacks citations of peer-reviewed medical studies.",
      "Makes broad, unproven health claims common in marketing scams.",
      "Testimonials are unverifiable and exaggerated."
    ],
    "detailedExplanation": "This post is FAKE health information likely generated by AI tools or marketing attempts. Legitimate medical claims require rigorous scientific validation, which this post lacks.\n\nDetection Tip: Always consult verified medical sources and regulatory approvals before trusting health-related products."
  },
  {
    "id": "DF-41",
    "type": "binary",
    "title": "Fact Verification Case #41: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A news story wrongly claims abrupt nationwide shutdown of all coal-fired power plants within six months.",
    "correctAnswer": true,
    "forensicTells": [
      "No official energy policy supports immediate shutdown.",
      "Actual transition plans emphasize phased approaches."
    ],
    "detailedExplanation": "This is FAKE. The government’s energy transition involves gradual measures. Sudden shutdown claims are misinformation.\n\nDetection Tip: Cross verify with Ministry of Power and energy policy documents."
  },
  {
    "id": "DF-42",
    "type": "binary",
    "title": "Motion Synthesis Case #42: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video surfaces with a CEO allegedly confessing financial misconduct. Analyze its legitimacy.",
    "singleImage": {
      "url": "/media/videos/fake11.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This video is a fabricated deepfake with no corroboration from credible news or legal sources.\n\nDetection Tip: Look for confirmations in Court documents or verified media before believing such videos."
  },
  {
    "id": "DF-43",
    "type": "binary",
    "title": "Visual Authenticity Case #43: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image allegedly from a diplomatic summit is shown. Assess its validity.",
    "singleImage": {
      "url": "/media/images/fake27.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "Digital artifacts and unnatural appearance betray real manipulation in this image.\n\nDetection Tip: Check for authentic summit photos from official government portals."
  },
  {
    "id": "DF-44",
    "type": "binary",
    "title": "Textual Forensic Case #44: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A detailed examination of hydrogen fuel cells explaining their emission of only water vapor and their role as a clean energy alternative.",
    "correctAnswer": false,
    "forensicTells": [
      "References scientific research and industry applications.",
      "Language matches educational materials."
    ],
    "detailedExplanation": "This is REAL content. Hydrogen fuel cells are studied extensively as eco-friendly energy sources emitting water.\n\nDetection Tip: Validate with academic and industry publications."
  },
  {
    "id": "DF-45",
    "type": "binary",
    "title": "Fact Verification Case #45: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A misleading post claims a sudden fare hike for public transportation across all Indian states without prior notice.",
    "correctAnswer": true,
    "forensicTells": [
      "Fare changes are scheduled and published by transport authorities.",
      "No official communications about sudden fare increases."
    ],
    "detailedExplanation": "This is FAKE. Transport fare changes follow official notification processes with advance public information.\n\nDetection Tip: Refer to local transport department releases and news."
  },
  {
    "id": "DF-46",
    "type": "binary",
    "title": "Motion Synthesis Case #46: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A digitally manipulated video allegedly showing a famous athlete making controversial political statements.",
    "singleImage": {
      "url": "/media/videos/fake12.mp4",
      "isAi": false,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "This is not an AI-generated deepfake video crafted to mislead audiences.\n\nDetection Tip: Verify with the athlete’s official channels and trusted news."
  },
  {
    "id": "DF-47",
    "type": "binary",
    "title": "Visual Authenticity Case #47: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An AI-generated image purportedly showing a new product launch event.",
    "singleImage": {
      "url": "/media/images/fake12.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "The image contains typical not AI generation flaws such as blurry areas and inconsistent lighting.\n\nDetection Tip: Compare with official product launch images from the company website."
  },
  {
    "id": "DF-48",
    "type": "binary",
    "title": "Textual Forensic Case #48: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "An informative post detailing the benefits of urban gardening including improved mental health, community cohesion, and environmental advantages.",
    "correctAnswer": false,
    "forensicTells": [
      "Supported by research and environmental organizations.",
      "Written in a clear, informative style typical of NGO articles."
    ],
    "detailedExplanation": "This is REAL content. Urban gardening is widely recognized as beneficial for health and communities, documented by research.\n\nDetection Tip: Confirm with environmental groups and studies."
  },
  {
    "id": "DF-49",
    "type": "binary",
    "title": "Fact Verification Case #49: Press Statement",
    "category": "TEXT & SIGNAGE",
    "promptOrContext": "A detailed article claims that India’s new National AI Policy announced last month includes an immediate nationwide ban on all facial recognition technologies due to privacy concerns, citing anonymous government insiders. It references existing debates on data privacy and surveillance laws but falsely states an official ban is already in effect.",
    "correctAnswer": true,
    "forensicTells": [
      "No official ministry or government website reports such an immediate ban.",
      "Current policies still allow regulated use; no full ban declared.",
      "The article mixes real privacy debates with fabricated policy claims."
    ],
    "detailedExplanation": "Although the article references real data privacy discussions and the recent National AI Policy introduction, the claim of an immediate facial recognition ban is false. No government source confirms this, and authoritative portals clarify ongoing policy development without such a ban.\n\nDetection Tip: Verify AI-related policy claims solely through the official Ministry of Electronics and IT portals and government announcements."
  },
  {
    "id": "DF-50",
    "type": "binary",
    "title": "Motion Synthesis Case #50: AI Video Forensic Analysis",
    "category": "HISTORICAL & VOICE",
    "promptOrContext": "A video clip purportedly shows a leading environmental scientist claiming climate change is a hoax and that carbon emissions have no detrimental effects. The scientist in the video appears authentic but the message contradicts mainstream scientific consensus.",
    "singleImage": {
      "url": "/media/videos/fake13.mp4",
      "isAi": true,
      "label": "Video Evidence Clip"
    },
    "correctAnswer": true,
    "forensicTells": [],
    "detailedExplanation": "This video is an AI-manipulated deepfake spreading misinformation. Leading climate scientists universally agree on the scientific consensus regarding climate change and carbon emissions.\n\nDetection Tip: Cross-check statements with peer-reviewed publications and official scientific bodies like IPCC and NASA."
  },
  {
    "id": "DF-51",
    "type": "binary",
    "title": "Visual Authenticity Case #51: Generative Diffusion Image",
    "category": "PORTRAIT",
    "promptOrContext": "An image shows what appears to be a secret meeting between two world leaders discussing confidential climate accords. The photo is realistic but verification is required.",
    "singleImage": {
      "url": "/media/images/fake13.png",
      "isAi": false,
      "label": "Inspection Photograph"
    },
    "correctAnswer": false,
    "forensicTells": [],
    "detailedExplanation": "Close inspection reveals anomalies in shadows and proportions—signs of not AI-generated image synthesis, making this picture fake.\n\nDetection Tip: Check trustworthy diplomatic communications and official photo releases for confirmation."
  },
  {
    "id": "DF-52",
    "type": "binary",
    "title": "Textual Forensic Case #52: Generative Article Review",
    "category": "ARCHITECTURAL SYNTHESIS",
    "promptOrContext": "A comprehensive blog post argues that a recently published patent filed by a major tech corporation reveals a new quantum computing method capable of breaking current encryption protocols within days, implying imminent security vulnerabilities. The article cites patent numbers and explains technical concepts correctly but the patent discussed is speculative and not yet validated for practical use.",
    "correctAnswer": true,
    "forensicTells": [
      "Patent filings describe potential inventions but do not guarantee real-world deployment.",
      "No credible cybersecurity firm confirms urgent vulnerabilities.",
      "Technical explanations merge real quantum computing ideas with speculative claims."
    ],
    "detailedExplanation": "The post uses real patent references and factual background but exaggerates speculative technology into an alarmist narrative. Quantum cryptography breakthroughs are promising but unproven at large scale and not an immediate threat.\n\nDetection Tip: Interpret patent-based news carefully and verify with multiple cybersecurity experts and institutions."
  }
];
