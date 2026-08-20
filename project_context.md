# MASTER PROJECT CONTEXT — AIGNITE AI ARCADE

You are working on a web platform called:

AIGNITE AI ARCADE

This is a competitive, team-based AI and knowledge game organized as a live college technical event.

The platform is NOT a normal quiz website.
It is a gamified competition platform where teams compete through multiple rounds involving knowledge, speed, reasoning, pattern recognition, AI concepts, and strategic decision-making.

The overall experience should feel like:

TECHNICAL COMPETITION
+
GAME SHOW
+
AI ARCADE

The goal is to create an exciting live-event experience where participants compete as teams and the platform manages registration, teams, rounds, questions, timers, scores, progression and the final winner.

==================================================
CORE CONCEPT
==================================================

Participants first register using Google Authentication.

After registration, players create or join a team.

Each team consists of 4 players.

Once the team is complete, it waits for the competition to begin.

The competition consists of:

ROUND 1
ROUND 2
FINAL ROUND

Each round has a different style of challenge.

The platform should control the complete journey:

Landing Page
↓
Google Authentication
↓
Player Registration
↓
Create / Join Team
↓
Team of 4
↓
Competition Lobby
↓
Round 1
↓
Round 2
↓
Final Round
↓
Final Results
↓
Winner

==================================================
IMPORTANT PRODUCT PRINCIPLE
==================================================

This is a LIVE COMPETITION PLATFORM.

Therefore:

- Timing matters.
- Scores matter.
- Team synchronization matters.
- Round progression matters.
- Questions should not simply be static pages.
- The system should eventually support real-time competition state.
- Players should not be able to manipulate scores from the frontend.
- Admins should be able to control the competition.

The platform should feel like an actual event control system rather than a collection of unrelated games.

==================================================
TECH STACK
==================================================

Frontend:

Next.js
TypeScript
Tailwind CSS
Base UI / Maia components
Lucide icons

Backend / infrastructure:

Firebase

Use:

Firebase Authentication
Firestore
Firebase Storage
Firebase Cloud Functions when secure server-side logic is required

Google Authentication is the primary login method.

Do NOT introduce another database or backend unless there is a strong technical reason.

==================================================
AUTHENTICATION
==================================================

Users sign in using Google.

After Google authentication:

If the user is new:

Google Login
↓
Player Registration
↓
Create Profile

If the user already exists:

Google Login
↓
Dashboard

User information includes:

- uid
- name
- email
- profile photo
- college
- year
- branch
- phone
- teamId
- role

==================================================
TEAM SYSTEM
==================================================

Teams contain exactly 4 players.

A player can:

CREATE TEAM

or

JOIN TEAM

When creating a team:

Generate a unique team code.

Example:

A7K9P2

The captain shares this code with teammates.

Players joining a team enter the team code.

Team information should include:

- teamId
- teamName
- teamCode
- captainId
- members
- round1Score
- round2Score
- finalScore
- totalScore
- status

Possible team states:

WAITING_FOR_MEMBERS
READY
COMPETING
ELIMINATED
FINALIST
COMPLETED

==================================================
ROUND 1
==================================================

Round 1 is a team-based race.

Every team member plays one sub-game.

There are 4 sub-games.

The objective is:

Complete all 4 sub-games as quickly and accurately as possible.

The unique-code mechanism works as follows:

Player 1 completes Sub-game 1.
↓
The system generates/reveals a unique code.
↓
Player 2 uses that code to unlock Sub-game 2.
↓
Player 2 completes Sub-game 2.
↓
A new unique code is generated.
↓
Player 3 uses it to unlock Sub-game 3.
↓
Player 3 completes Sub-game 3.
↓
A new unique code is generated.
↓
Player 4 uses it to unlock Sub-game 4.
↓
Team completes Round 1.

The four sub-games include:

1. QUIZ

Approximately 5–10 questions.

Topic can involve:

- Movies
- Shows
- Popular culture
- General knowledge

Difficulty:

Moderate → Hard

2. WORDLE RACE

A Wordle-style challenge played against an AI/opponent.

3. IDENTIFY DEEPFAKES

Players identify whether presented content is genuine or AI-generated/deepfake.

Approximately 5–10 questions.

Difficulty:

Moderate → Slightly Advanced

4. RAPID FIRE BRAIN

A collection of very fast mini challenges.

Possible challenges:

- Mini puzzles
- Tech-company clues
- AI tools
- Famous technology companies
- CEOs
- Technology-related MCQs
- Reflex challenges
- Pattern recognition

Example pattern:

2 → 4 → 8 → 16 → ?

or:

A → C → F → J → ?

or visual pattern recognition.

The exact games/questions may evolve during implementation, but the platform architecture must support different sub-game types.

ROUND 1 PRINCIPLE:

Speed + Accuracy.

A team that completes the round faster should have a scoring advantage, but speed bonuses should only apply when answers are correct.

==================================================
ROUND 2 — AI WHO AM I?
==================================================

Round 2 is a guessing / deduction game.

The objective is to identify a hidden person, character, movie, object, technology, etc. using clues.

The platform presents a mystery identity.

Example:

"I am a famous fictional character.
I am associated with a red suit.
I am known for a particular catchphrase.
Who am I?"

Players select from possible answers.

The game should progressively reveal clues.

The number of clues/questions available can affect scoring.

A key strategic element:

Teams should decide how many clues they need before committing to an answer.

The fewer clues they require, the higher their potential score.

The exact scoring system can be configured later.

The interface should make this feel like a live game-show guessing round.

==================================================
FINAL ROUND
==================================================

The final round is a high-stakes AI challenge.

Only qualifying/top teams reach the final.

The final involves a set of AI-oriented prompts/challenges.

The current concept is approximately:

10 prompts/challenges.

Teams use AI strategically to solve or respond to the challenges.

The final should evaluate:

- Creativity
- Reasoning
- Problem solving
- AI usage
- Quality of solution
- Speed
- Presentation / usefulness where applicable

The final should NOT be treated as a normal MCQ quiz.

It should feel like an AI-powered challenge.

Final submissions may eventually require:

- Text
- Answers
- Generated solutions
- Short explanations
- Other challenge-specific outputs

The platform should therefore support flexible submission types.

==================================================
SCORING
==================================================

The system should maintain:

Round 1 Score
Round 2 Score
Final Score
Total Score

The leaderboard should update based on scores.

Important:

Never trust client-side score calculations for important competition results.

Sensitive scoring and result validation should eventually happen through Firebase Cloud Functions or another secure server-side mechanism.

==================================================
LEADERBOARD
==================================================

The leaderboard is a major part of the experience.

Display:

Rank
Team Name
Score
Round Progress
Status

Example:

#1  NEURAL NINJAS       420
#2  CODE WARRIORS       395
#3  BYTE BUSTERS        370

The leaderboard should be reusable across the entire competition.

It should support real-time updates where appropriate.

==================================================
ADMIN / EVENT CONTROL
==================================================

The platform will eventually have an admin control system.

Admins should be able to:

- View registered players
- View teams
- Approve/manage teams
- Start registration
- Close registration
- Start Round 1
- End Round 1
- Start Round 2
- Select finalists
- Start Final
- View submissions
- Manage scores
- View leaderboard
- Announce winner

Competition state should therefore be centralized.

Example:

REGISTRATION_OPEN

ROUND_1_LIVE

ROUND_1_COMPLETED

ROUND_2_LIVE

FINALISTS_SELECTED

FINAL_LIVE

COMPETITION_COMPLETED

==================================================
UI / UX DIRECTION
==================================================

The visual identity should remain consistent throughout the entire application.

Theme:

Dark futuristic technical arcade.

Think:

AI
+
Game Show
+
Competitive Arena

Visual characteristics:

- Dark navy / near-black background
- Purple primary accent
- Cyan secondary accent
- Subtle blue/pink highlights
- Glassmorphism
- Soft gradients
- Minimal glow
- Clean cards
- Smooth transitions
- Strong typography
- Modern spacing
- Premium appearance

Avoid:

- Excessive neon
- Cheap gaming aesthetics
- Cartoon styling
- Crypto/Web3 styling
- Overloaded screens
- Generic SaaS dashboard appearance

The application should look like a professional college technical competition.

==================================================
IMPORTANT UX RULE
==================================================

Every screen should answer:

1. What round am I in?
2. What is my team doing?
3. What do I need to do next?
4. How much time do I have?
5. What is my score/status?

The user should never feel lost during a live round.

==================================================
CURRENT DEVELOPMENT PHASE
==================================================

The project is being developed incrementally.

PHASE 1:

Landing page
Authentication
Registration
Team creation
Team joining
Team dashboard
Competition lobby
Basic leaderboard
Rules
Profile

PHASE 2:

Round 1 game engine.

PHASE 3:

Round 2.

PHASE 4:

Final round.

PHASE 5:

Admin/event control system
Leaderboard
Results
Winner announcement

Do NOT build everything at once.

When implementing a feature, preserve compatibility with the future rounds.

==================================================
IMPORTANT DEVELOPMENT RULES
==================================================

Do not create unrelated features.

Do not add an AI auction system.

Do not replace Firebase with another backend.

Do not redesign the competition concept without explicit approval.

Do not hard-code competition state unnecessarily.

Use reusable components.

Use TypeScript types/interfaces.

Keep game logic modular.

Keep scoring logic separate from UI.

Keep Firebase access separate from presentation components.

Design components so different games can be plugged into the platform later.

The architecture should allow:

QuizGame
WordleGame
DeepfakeGame
RapidFireGame
GuessWhoGame
FinalChallenge

to exist as separate modules while sharing common competition infrastructure.

==================================================
ONE-SENTENCE DESCRIPTION
==================================================

AIGNITE AI ARCADE is a live, team-based AI competition platform where teams of four progress through fast-paced knowledge, deduction, reflex and AI challenges across multiple rounds to compete for the championship.

==================================================
YOUR ROLE AS AI DEVELOPER
==================================================

Whenever you work on this project:

First understand the competition structure.

Then understand where the requested feature fits.

Then implement it without breaking:

Authentication
Teams
Competition state
Rounds
Scoring
Leaderboard

Always prioritize:

Correctness
Security
Scalability
Reusable architecture
Live-event reliability
Premium UX

Do not treat this as a simple website.

Treat it as a real-time competitive event platform.