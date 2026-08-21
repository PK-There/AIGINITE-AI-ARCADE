'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import {
  TeamState,
  PlayerId,
  PlayerScoreData,
  INITIAL_TEAM_STATE,
} from './types';
import { Navbar } from './components/Navbar';
import { FooterTelemetry } from './components/FooterTelemetry';
import { HubView } from './components/HubView';
import { Subgame1Quiz } from './components/Subgame1Quiz';
import { Subgame2Wordle } from './components/Subgame2Wordle';
import { Subgame3Deepfake } from './components/Subgame3Deepfake';
import { Subgame4RapidFire } from './components/Subgame4RapidFire';
import { VictoryView } from './components/VictoryView';
import { LockKeyhole } from 'lucide-react';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'aignite_arcade_round1_v1';

export default function Round1Page() {
  const router = useRouter();
  const [teamState, setTeamState] = useState<TeamState>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch {}
    return { ...INITIAL_TEAM_STATE, startTime: Date.now() };
  });

  const [activeView, setActiveView] = useState<'HUB' | PlayerId | 5>('HUB');
  const [isCrtOn, setIsCrtOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCaptain, setIsCaptain] = useState(true); // Default true, resolved via Firestore
  const [userTeamId, setUserTeamId] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [teamMemberNames, setTeamMemberNames] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeRound, setActiveRound] = useState<number>(0);

  // Listen to tournament settings (activeRound) in real-time
  useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, "settings", "tournament"), (docSnap) => {
      if (docSnap.exists()) {
        const active = docSnap.data().activeRound || 0;
        setActiveRound(active);
        
        // Auto-redirect to new round if host shifts phase
        if (active === 2) {
          router.push("/round/2");
        } else if (active === 3) {
          router.push("/round/3");
        } else if (active === 0) {
          router.push("/dashboard");
        }
      }
    });
    return () => unsubSettings();
  }, [router]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setCurrentUser(user);
      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        if (userSnap.exists()) {
          const tId = userSnap.data().teamId;
          if (tId) {
            setUserTeamId(tId);
          }
        }
      } catch (err) {
        console.error('Failed to verify team captain status:', err);
      }
    });
    return () => unsub();
  }, []);

  // Reset scroll to top whenever the active view changes (subgames vs HUB)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  // If the round has been finished, lock the view to the qualification scorecard (VictoryView)
  useEffect(() => {
    if (teamState?.isFinished) {
      setActiveView(5);
    } else if (activeView === 5) {
      setActiveView('HUB');
    }
  }, [teamState?.isFinished, activeView]);

  // Real-time Firestore Sync
  useEffect(() => {
    if (!userTeamId) return;

    const unsubTeam = onSnapshot(doc(db, 'teams', userTeamId), async (teamSnap) => {
      if (teamSnap.exists()) {
        const data = teamSnap.data();
        setTeamMembers(data.members || []);
        setTeamMemberNames(data.memberNames || []);
        setIsCaptain(data.captainId === auth.currentUser?.uid);

        const dbRound1State = data.round1State;
        if (dbRound1State) {
          setTeamState(dbRound1State);
        } else {
          // Initialize in Firestore if it doesn't exist yet
          const initialState = {
            ...INITIAL_TEAM_STATE,
            teamName: data.name || INITIAL_TEAM_STATE.teamName,
            teamId: data.code || INITIAL_TEAM_STATE.teamId,
            startTime: Date.now(),
          };
          try {
            await updateDoc(doc(db, 'teams', userTeamId), {
              round1State: initialState,
            });
          } catch (err) {
            console.error('Failed to initialize round1State in Firestore:', err);
          }
        }
      }
    });

    return () => unsubTeam();
  }, [userTeamId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamState));
    } catch {}
  }, [teamState]);

  if (activeRound < 1) {
    return (
      <div className="min-h-screen bg-[#0d1117] grid-lines flex flex-col items-center justify-center text-center px-6 gap-5 font-mono">
        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl">
          <LockKeyhole className="w-10 h-10 text-amber-500 mx-auto animate-pulse" />
        </div>
        <h1 className="font-display text-4xl font-bold uppercase text-white text-shadow-pop">
          ROUND 1 IS LOCKED
        </h1>
        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
          The simulation arena will unlock when the tournament organizer officially starts it. Please wait for the announcement.
        </p>
        <a href="/dashboard" className="font-mono-ui text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  const handleSubgameComplete = async (playerId: PlayerId, scoreData: PlayerScoreData) => {
    soundFx.playSuccessFanfare();

    const nextPlayerId = (playerId < 4 ? playerId + 1 : 5) as PlayerId | 5;
    const updatedPlayerStatus = { ...teamState.playerStatus, [playerId]: 'COMPLETED' as const };
    if (playerId < 4) {
      updatedPlayerStatus[(playerId + 1) as PlayerId] = 'ACTIVE';
    }
    const updatedScores = { ...teamState.playerScores, [playerId]: scoreData };
    const newTotalScore = (Object.values(updatedScores) as PlayerScoreData[]).reduce(
      (sum, s) => sum + (s?.finalSubgameScore || 0), 0
    );
    const newTotalTime = (Object.values(updatedScores) as PlayerScoreData[]).reduce(
      (sum, s) => sum + (s?.completionTime || 0), 0
    );

    const nextState: TeamState = {
      ...teamState,
      playerStatus: updatedPlayerStatus,
      playerScores: updatedScores,
      teamScore: newTotalScore,
      totalTime: newTotalTime,
      currentStage: nextPlayerId,
      isFinished: playerId === 4,
    };

    setTeamState(nextState);

    // Firestore score & state sync
    if (userTeamId) {
      try {
        await updateDoc(doc(db, 'teams', userTeamId), {
          round1State: nextState,
          teamScore: newTotalScore,
          totalTime: newTotalTime,
        });
      } catch (err) {
        console.error('Firestore score sync failed:', err);
      }
    }

    setActiveView(playerId < 4 ? 'HUB' : 5);
  };

  const handleLaunchGame = (playerId: PlayerId) => {
    soundFx.playKeypress();
    setActiveView(playerId);
  };

  const handleResetAll = async () => {
    const initialState = {
      ...INITIAL_TEAM_STATE,
      teamName: teamState.teamName,
      teamId: teamState.teamId,
      startTime: Date.now(),
    };
    setTeamState(initialState);
    setActiveView('HUB');
    try { localStorage.removeItem(STORAGE_KEY); } catch {}

    if (userTeamId) {
      try {
        await updateDoc(doc(db, 'teams', userTeamId), {
          round1State: initialState,
          teamScore: 0,
          totalTime: 0,
        });
      } catch (err) {
        console.error('Firestore reset failed:', err);
      }
    }
    soundFx.playKeypress();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-mono relative overflow-x-hidden flex flex-col">
      {/* Subtle scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)',
        }}
      />
      {isCrtOn && (
        <div className="fixed inset-0 z-50 pointer-events-none opacity-30"
          style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)' }}
        />
      )}

      {/* Back strip */}
      <div className="relative z-50 flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur">
        <a href="/dashboard" className="flex items-center gap-1.5 font-mono-ui text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
          ← Back to Hub
        </a>
        <span className="font-mono-ui text-[10px] text-zinc-700 ml-auto uppercase tracking-widest">Round 01 · Human vs Machine</span>
      </div>

      <Navbar
        teamState={teamState}
        onNavigateHub={() => setActiveView('HUB')}
        isCrtOn={isCrtOn}
        setIsCrtOn={setIsCrtOn}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Mobile-first single-column content */}
      <div className="flex-1 w-full max-w-xl mx-auto px-4 py-5 relative z-10">
        {activeView === 'HUB' && (
          <HubView
            teamState={teamState}
            setTeamState={setTeamState}
            onLaunchGame={handleLaunchGame}
            isCaptain={isCaptain}
            teamMembers={teamMembers}
            teamMemberNames={teamMemberNames}
            currentUserUid={currentUser?.uid}
          />
        )}
        {activeView === 1 && (
          <Subgame1Quiz onComplete={(data) => handleSubgameComplete(1, data)} onReturnToHub={() => setActiveView('HUB')} />
        )}
        {activeView === 2 && (
          <Subgame2Wordle onComplete={(data) => handleSubgameComplete(2, data)} onReturnToHub={() => setActiveView('HUB')} />
        )}
        {activeView === 3 && (
          <Subgame3Deepfake onComplete={(data) => handleSubgameComplete(3, data)} onReturnToHub={() => setActiveView('HUB')} />
        )}
        {activeView === 4 && (
          <Subgame4RapidFire onComplete={(data) => handleSubgameComplete(4, data)} onReturnToHub={() => setActiveView('HUB')} />
        )}
        {activeView === 5 && (
          <VictoryView teamState={teamState} onReturnToHub={() => setActiveView('HUB')} onResetRun={handleResetAll} />
        )}
      </div>

      <FooterTelemetry teamState={teamState} activeView={activeView} />
    </div>
  );
}
