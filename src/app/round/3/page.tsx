"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, limit, doc, getDoc, onSnapshot } from "firebase/firestore";
import { Loader2, LockKeyhole, Trophy } from "lucide-react";
import { R3Provider } from "./context/R3Context";
import { R3App } from "./components/R3App";

export default function Round3Page() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "not-finalist" | "ready">("loading");
  const [finalists, setFinalists] = useState<{ id: string; name: string; score: number }[]>([]);
  const [myTeamId, setMyTeamId] = useState<string | null>(null);
  const [isCaptain, setIsCaptain] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeRound, setActiveRound] = useState<number>(0);

  // Listen to tournament settings (activeRound) in real-time
  useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, "settings", "tournament"), (docSnap) => {
      if (docSnap.exists()) {
        setActiveRound(docSnap.data().activeRound || 0);
      }
    });
    return () => unsubSettings();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/auth"); return; }

      setUserName(user.displayName || "Player");

      const isWhitelistedUser =
        user.email?.toLowerCase() === "prathameshkhaire415@gmail.com" ||
        user.displayName?.toLowerCase().includes("prathamesh");

      try {
        // 1. Get user's teamId
        const userSnap = await getDoc(doc(db, "users", user.uid));
        const userData = userSnap.exists() ? userSnap.data() : null;
        let teamId = userData?.teamId as string | null;

        // 2. Get top-1 team by teamScore (configured to 1 team for testing/checking)
        const teamsRef = collection(db, "teams");
        const q = query(teamsRef, orderBy("teamScore", "desc"), limit(2));
        const snap = await getDocs(q);

        let top6 = snap.docs.map(d => ({
          id: d.id,
          name: d.data().name as string,
          score: (d.data().teamScore as number) || 0,
          captainId: d.data().captainId as string,
        }));

        if (isWhitelistedUser) {
          if (!teamId) teamId = `team_${user.uid.slice(0, 6)}`;
          if (top6.length === 0) {
            top6 = [
              { id: teamId, name: "Team Prathamesh", score: 950, captainId: user.uid },
              { id: "team_alpha", name: "Team Alpha", score: 890, captainId: "cap_alpha" },
              { id: "team_beta", name: "Team Beta", score: 820, captainId: "cap_beta" },
              { id: "team_gamma", name: "Team Gamma", score: 780, captainId: "cap_gamma" },
              { id: "team_delta", name: "Team Delta", score: 710, captainId: "cap_delta" },
              { id: "team_epsilon", name: "Team Epsilon", score: 650, captainId: "cap_epsilon" },
            ];
          } else if (!top6.some(t => t.id === teamId)) {
            top6.unshift({ id: teamId, name: userData?.displayName ? `Team ${userData.displayName}` : "Team Prathamesh", score: 950, captainId: user.uid });
          }
          setIsCaptain(true);
          setMyTeamId(teamId);
          setFinalists(top6.map(({ id, name, score }) => ({ id, name, score })));
          setStatus("ready");
          return;
        }

        if (!teamId || snap.empty) { setStatus("not-finalist"); return; }

        const myTeamEntry = top6.find(t => t.id === teamId);
        if (!myTeamEntry) { setStatus("not-finalist"); return; }

        // 3. Check captaincy
        const captain = myTeamEntry.captainId === user.uid;
        setIsCaptain(captain);
        setMyTeamId(teamId);
        setFinalists(top6.map(({ id, name, score }) => ({ id, name, score })));
        setStatus("ready");
      } catch (e) {
        console.error(e);
        if (isWhitelistedUser) {
          const fallbackTeamId = `team_${user.uid.slice(0, 6)}`;
          setIsCaptain(true);
          setMyTeamId(fallbackTeamId);
          setFinalists([
            { id: fallbackTeamId, name: "Team Prathamesh", score: 950 },
            { id: "team_alpha", name: "Team Alpha", score: 890 },
            { id: "team_beta", name: "Team Beta", score: 820 },
            { id: "team_gamma", name: "Team Gamma", score: 780 },
            { id: "team_delta", name: "Team Delta", score: 710 },
            { id: "team_epsilon", name: "Team Epsilon", score: 650 },
          ]);
          setStatus("ready");
        } else {
          setStatus("not-finalist");
        }
      }
    });

    return () => unsub();
  }, [router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d9ff52] animate-spin" />
      </div>
    );
  }

  if (activeRound < 3) {
    return (
      <div className="min-h-screen bg-[#0d1117] grid-lines flex flex-col items-center justify-center text-center px-6 gap-5 font-mono">
        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl">
          <LockKeyhole className="w-10 h-10 text-amber-500 mx-auto animate-pulse" />
        </div>
        <h1 className="font-display text-4xl font-bold uppercase text-white text-shadow-pop">
          ROUND 3 IS LOCKED
        </h1>
        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
          The Final Round will unlock when the tournament organizer officially starts it. Please wait for the announcement.
        </p>
        <a href="/dashboard" className="font-mono-ui text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  if (status === "not-finalist") {
    return (
      <div className="min-h-screen bg-[#0d1117] grid-lines flex flex-col items-center justify-center text-center px-6 gap-5">
        <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-2xl">
          <LockKeyhole className="w-10 h-10 text-zinc-500 mx-auto" />
        </div>
        <h1 className="font-display text-5xl font-bold uppercase text-white text-shadow-pop">
          NOT QUALIFIED
        </h1>
        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
          Only the top-6 teams from Round 1 + Round 2 advance to the Final Round. Keep competing!
        </p>
        <a href="/dashboard" className="font-mono-ui text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  if (!isCaptain) {
    return (
      <div className="min-h-screen bg-[#0d1117] grid-lines flex flex-col items-center justify-center text-center px-6 gap-5">
        <Trophy className="w-10 h-10 text-[#d9ff52]" />
        <h1 className="font-display text-5xl font-bold uppercase text-white text-shadow-pop">
          YOU'RE A FINALIST!
        </h1>
        <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
          Your team is qualified for the Final Round. Only your <span className="text-white font-semibold">team captain</span> can open the game lobby. Wait for them to start.
        </p>
        <div className="font-mono-ui text-xs text-[#d9ff52]/70 uppercase tracking-widest">
          Waiting for captain…
        </div>
        <a href="/dashboard" className="font-mono-ui text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <R3Provider>
      <R3App finalists={finalists} myTeamId={myTeamId!} userName={userName} />
    </R3Provider>
  );
}
