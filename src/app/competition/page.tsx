"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Swords, Zap, ShieldQuestion, BrainCircuit, Cpu, Search, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ArenaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      } else {
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

  return (
    <div className="relative min-h-screen bg-background pb-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />

      <div className="relative z-10 px-5 pt-6 space-y-8">
        
        {/* Header */}
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Virtual Combat</p>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Swords className="text-primary w-6 h-6" /> BATTLE ARENA
          </h1>
        </div>

        {/* Round 1 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-sm font-bold text-white tracking-widest font-mono">ROUND 1: HUMAN VS MACHINE</h2>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-[10px]">4 PLAYERS SQUAD</Badge>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <GameRow
              title="Pop Culture & Tech Quiz"
              desc="Player 1: 15 rapid trivia questions on computer science and AI history."
              icon="🧠"
              badgeColor="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            />
            <GameRow
              title="Cryptographic Wordle Race"
              desc="Player 2: Solve the cyber security keyword faster than the NEXUS-9 AI."
              icon="⌨️"
              badgeColor="bg-green-500/10 text-green-400 border-green-500/20"
            />
            <GameRow
              title="Deepfake Detection"
              desc="Player 3: Spot synthetic images, generative artifacts, and AI anomalies."
              icon="👁️"
              badgeColor="bg-pink-500/10 text-pink-400 border-pink-500/20"
            />
            <GameRow
              title="Rapid Fire Brain Rush"
              desc="Player 4: Solve logic gates, reflex sequences, vector paths, and binary loops."
              icon="⚡"
              badgeColor="bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            />
          </div>

          <Link href="/round/1" className="block pt-2">
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold h-12 shadow-[0_0_15px_rgba(96,165,250,0.25)]">
              LAUNCH ROUND 1
            </Button>
          </Link>
        </div>

        {/* Round 2 */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-sm font-bold text-white tracking-widest font-mono">ROUND 2: AI WHO AM I?</h2>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">SOLO / CO-OP</Badge>
          </div>

          <div className="bg-zinc-900/60 border border-primary/20 rounded-2xl p-5 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 shrink-0">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white">Ask Smart, Guess Fast</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Interact with the generative AI model. Deduce the mystery entity in under 5 questions and 2 minutes.
                </p>
              </div>
            </div>

            <Link href="/round/2" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-12 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                LAUNCH ROUND 2
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function GameRow({ title, desc, icon, badgeColor }: { title: string; desc: string; icon: string; badgeColor: string }) {
  return (
    <div className="flex items-center gap-4 bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
      <div className="text-2xl w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-xs text-zinc-400 leading-normal">{desc}</p>
      </div>
    </div>
  );
}
