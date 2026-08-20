"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Trophy, Timer, Medal, Loader2, Zap, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import confetti from "canvas-confetti";

interface LeaderboardTeam {
  id: string;
  name: string;
  score: number;
  totalTime?: number;
  captainId?: string;
  podiumPlace?: number | null;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [myTeamId, setMyTeamId] = useState<string | null>(null);

  const firstPlace = teams.find(t => t.podiumPlace === 1);
  const secondPlace = teams.find(t => t.podiumPlace === 2);
  const thirdPlace = teams.find(t => t.podiumPlace === 3);
  const showPodium = !!(firstPlace || secondPlace || thirdPlace);

  useEffect(() => {
    if (!loading && showPodium) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#cbd5e1', '#b45309', '#00F0FF'],
      });
    }
  }, [loading, showPodium]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/auth"); return; }
      setCurrentUid(user.uid);

      // Get the current user's team
      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
          setMyTeamId(userSnap.data().teamId || null);
        }
      } catch {}

      try {
        const teamsRef = collection(db, "teams");
        const q = query(teamsRef, orderBy("teamScore", "desc"), limit(20));
        const snap = await getDocs(q);

        const list: LeaderboardTeam[] = snap.docs.map((d) => ({
          id: d.id,
          name: d.data().name || "Unnamed",
          score: d.data().teamScore || 0,
          totalTime: d.data().totalTime || 0,
          captainId: d.data().captainId || null,
          podiumPlace: d.data().podiumPlace || null,
        }));
        setTeams(list);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const top6 = teams.slice(0, 6);
  const rest = teams.slice(6);

  return (
    <div className="relative min-h-screen bg-background pb-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />

      <div className="relative z-10 px-5 pt-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Global Standings</p>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Trophy className="text-yellow-500 w-6 h-6" /> LEADERBOARD
            </h1>
          </div>
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px] tracking-wider">
            LIVE RANKINGS
          </Badge>
        </div>

        {teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/30 border border-white/5 rounded-3xl text-center space-y-3">
            <Trophy className="w-10 h-10 text-zinc-600" />
            <h3 className="font-bold text-white text-sm">NO STANDINGS YET</h3>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              No teams have completed rounds or scored points yet. Start the competition by playing the rounds!
            </p>
          </div>
        ) : (
          <>
            {/* Grand Victory Podium Showcase */}
            {showPodium && (
              <div className="bg-zinc-950/80 border-2 border-yellow-500/20 p-6 rounded-3xl text-center space-y-6 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden animate-fade-in mb-6">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08),transparent)]" />
                
                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[.25em] text-yellow-500 font-bold block animate-pulse">
                    🏆 TOURNAMENT CHAMPIONS 🏆
                  </span>
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider font-display">
                    GRAND VICTORY STANDINGS
                  </h2>
                </div>

                <div className="flex items-end justify-center gap-4 sm:gap-6 pt-4 relative z-10">
                  {/* 2nd Place */}
                  {secondPlace && (
                    <div className="flex flex-col items-center gap-2 group animate-rise">
                      <div className="relative">
                        <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-bounce inline-block" style={{ animationDuration: '3s' }}>🥈</span>
                      </div>
                      <div className="bg-slate-300/10 border border-slate-300/20 rounded-t-2xl w-24 sm:w-28 h-24 sm:h-28 flex flex-col justify-center items-center p-3 text-center shadow-[0_0_15px_rgba(203,213,225,0.05)]">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider block mb-1">2nd Place</span>
                        <span className="text-xs font-black text-white truncate max-w-full block">{secondPlace.name}</span>
                        <span className="text-xs font-mono text-slate-400 mt-1 font-bold">{secondPlace.score} PTS</span>
                      </div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {firstPlace && (
                    <div className="flex flex-col items-center gap-2 group animate-rise">
                      <div className="relative">
                        <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-bounce inline-block" style={{ animationDuration: '2s' }}>👑</span>
                      </div>
                      <div className="bg-yellow-500/10 border-2 border-yellow-500/40 rounded-t-2xl w-28 sm:w-32 h-32 sm:h-36 flex flex-col justify-center items-center p-3 text-center shadow-[0_0_30px_rgba(245,158,11,0.15)] relative">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-yellow-500 shadow-[0_0_10px_#f59e0b]" />
                        <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest block mb-1">CHAMPION</span>
                        <span className="text-sm font-black text-white truncate max-w-full block uppercase">{firstPlace.name}</span>
                        <span className="text-sm font-mono text-yellow-400 mt-1 font-black">{firstPlace.score} PTS</span>
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {thirdPlace && (
                    <div className="flex flex-col items-center gap-2 group animate-rise">
                      <div className="relative">
                        <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(180,83,9,0.4)] animate-bounce inline-block" style={{ animationDuration: '4s' }}>🥉</span>
                      </div>
                      <div className="bg-amber-700/15 border border-amber-700/20 rounded-t-2xl w-24 sm:w-28 h-20 sm:h-24 flex flex-col justify-center items-center p-3 text-center shadow-[0_0_15px_rgba(180,83,9,0.05)]">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">3rd Place</span>
                        <span className="text-xs font-black text-white truncate max-w-full block">{thirdPlace.name}</span>
                        <span className="text-xs font-mono text-amber-500 mt-1 font-bold">{thirdPlace.score} PTS</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Top-6 Finalists Section */}
            {top6.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#d9ff52]" />
                  <p className="text-[10px] font-mono-ui font-bold uppercase tracking-widest text-[#d9ff52]">
                    TOP 6 — AUTO-QUALIFY FOR FINAL ROUND
                  </p>
                </div>

                {top6.map((team, idx) => {
                  const isMyTeam = team.id === myTeamId;
                  const iAmCaptain = isMyTeam && team.captainId === currentUid;

                  return (
                    <div
                      key={team.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        team.podiumPlace === 1
                          ? "border-yellow-500/40 bg-yellow-500/5 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
                          : team.podiumPlace === 2
                          ? "border-slate-300/30 bg-slate-300/5"
                          : team.podiumPlace === 3
                          ? "border-amber-700/30 bg-amber-700/5"
                          : idx === 0
                          ? "border-yellow-500/20 bg-yellow-500/5"
                          : isMyTeam
                          ? "border-[#d9ff52]/30 bg-[#d9ff52]/5"
                          : "border-white/10 bg-zinc-900/50"
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-7 text-center font-mono font-black text-sm text-zinc-400">
                        {team.podiumPlace === 1 && "👑"}
                        {team.podiumPlace === 2 && "🥈"}
                        {team.podiumPlace === 3 && "🥉"}
                        {!team.podiumPlace && (idx + 1)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm truncate">{team.name}</p>
                          {team.podiumPlace === 1 && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[8px] font-mono-ui uppercase tracking-wider px-1.5 py-0.5 animate-pulse">
                              CHAMPION
                            </Badge>
                          )}
                          {team.podiumPlace === 2 && (
                            <Badge className="bg-slate-300/20 text-slate-300 border border-slate-300/30 text-[8px] font-mono-ui uppercase tracking-wider px-1.5 py-0.5">
                              RUNNER UP
                            </Badge>
                          )}
                          {team.podiumPlace === 3 && (
                            <Badge className="bg-amber-700/20 text-amber-600 border border-amber-700/30 text-[8px] font-mono-ui uppercase tracking-wider px-1.5 py-0.5">
                              3rd Place
                            </Badge>
                          )}
                          {idx < 6 && !team.podiumPlace && (
                            <Badge className="bg-[#d9ff52]/15 text-[#d9ff52] border-[#d9ff52]/30 text-[8px] font-mono-ui uppercase tracking-wider px-1.5 py-0.5">
                              FINALIST
                            </Badge>
                          )}
                          {idx === 0 && !team.podiumPlace && <Medal className="w-3.5 h-3.5 text-yellow-400" />}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono mt-0.5">
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" /> {team.totalTime || 0}s
                          </span>
                        </div>
                      </div>

                      {/* Score + Enter Finals */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="font-mono font-black text-sm text-primary">{team.score}</span>
                        <span className="text-[9px] font-mono text-zinc-600">PTS</span>
                        {iAmCaptain && (
                          <Link href="/round/3">
                            <span className="mt-1 inline-flex items-center gap-1 bg-[#d9ff52] text-[#0d1117] font-mono-ui text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded hover:shadow-[2px_2px_0_#ff6f91] transition-all">
                              <Star className="w-2.5 h-2.5" /> ENTER FINALS
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Top-6 Separator */}
                <div className="border-t border-dashed border-[#d9ff52]/20 pt-2">
                  <p className="text-[9px] font-mono-ui text-zinc-600 uppercase tracking-widest text-center">
                    — Teams below do not qualify for the Final Round —
                  </p>
                </div>
              </div>
            )}

            {/* Rest of the leaderboard */}
            {rest.length > 0 && (
              <div className="space-y-2">
                {rest.map((team, idx) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-4 bg-zinc-900/30 border border-white/5 p-4 rounded-2xl"
                  >
                    <div className="w-7 text-center font-mono font-black text-sm text-zinc-600">
                      {idx + 7}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-zinc-400 text-sm truncate">{team.name}</p>
                      <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono mt-0.5">
                        <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {team.totalTime || 0}s</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-black text-sm text-zinc-600">{team.score}</span>
                      <p className="text-[9px] font-mono text-zinc-700">PTS</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Podium Top 3 (fallback decorative) */}
            {!showPodium && top6.length >= 3 && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-mono-ui text-zinc-600 uppercase tracking-widest text-center">TOP 3 PODIUM</p>
                <div className="flex items-end justify-center gap-3">
                  {/* 2nd */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-xs">2</div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-t-lg w-20 h-20 flex flex-col justify-center items-center p-2 text-center">
                      <span className="text-[9px] font-bold text-white truncate max-w-full">{top6[1].name}</span>
                      <span className="text-[10px] font-mono text-zinc-400 mt-1 font-bold">{top6[1].score}</span>
                    </div>
                  </div>
                  {/* 1st */}
                  <div className="flex flex-col items-center gap-2">
                    <Medal className="w-5 h-5 text-yellow-400 animate-bounce" />
                    <div className="bg-primary/20 border border-primary/30 rounded-t-lg w-24 h-28 flex flex-col justify-center items-center p-2 text-center shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                      <span className="text-xs font-black text-white truncate max-w-full">{top6[0].name}</span>
                      <span className="text-xs font-mono text-primary mt-1 font-black">{top6[0].score}</span>
                    </div>
                  </div>
                  {/* 3rd */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-700 font-bold text-xs">3</div>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-t-lg w-20 h-16 flex flex-col justify-center items-center p-2 text-center">
                      <span className="text-[9px] font-bold text-white truncate max-w-full">{top6[2].name}</span>
                      <span className="text-[10px] font-mono text-zinc-400 mt-1 font-bold">{top6[2].score}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
