"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Trophy, Timer, Medal, Loader2, Zap, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface LeaderboardTeam {
  id: string;
  name: string;
  score: number;
  totalTime?: number;
  captainId?: string;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<LeaderboardTeam[]>([]);
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [myTeamId, setMyTeamId] = useState<string | null>(null);

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
                        idx === 0
                          ? "border-yellow-500/40 bg-yellow-500/5"
                          : isMyTeam
                          ? "border-[#d9ff52]/30 bg-[#d9ff52]/5"
                          : "border-white/10 bg-zinc-900/50"
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-7 text-center font-mono font-black text-sm text-zinc-400">
                        {idx + 1}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-sm truncate">{team.name}</p>
                          {idx < 6 && (
                            <Badge className="bg-[#d9ff52]/15 text-[#d9ff52] border-[#d9ff52]/30 text-[8px] font-mono-ui uppercase tracking-wider px-1.5 py-0.5">
                              FINALIST
                            </Badge>
                          )}
                          {idx === 0 && <Medal className="w-3.5 h-3.5 text-yellow-400" />}
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

            {/* Podium Top 3 (decorative) */}
            {top6.length >= 3 && (
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
