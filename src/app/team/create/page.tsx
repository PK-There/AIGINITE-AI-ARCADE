"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Check, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { soundFx } from "@/app/round/1/utils/audio";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function CreateTeamPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push("/auth"); return; }
      setUser(u);
      
      try {
        const userSnap = await getDoc(doc(db, "users", u.uid));
        if (!userSnap.exists()) {
          router.push("/register");
          return;
        }
        if (userSnap.data().teamId) {
          router.push("/dashboard");
          return;
        }
      } catch (err) {
        console.error("Failed to check user team:", err);
      }
      
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !teamName.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const code = generateCode();
      const teamId = `team_${code.toLowerCase()}`;

      await setDoc(doc(db, "teams", teamId), {
        id: teamId,
        name: teamName.trim(),
        code,
        captainId: user.uid,
        members: [user.uid],
        memberNames: [user.displayName || user.email],
        createdAt: new Date().toISOString(),
        maxMembers: 4,
        roundStatus: { round1: "pending", round2: "pending" },
      });

      await setDoc(doc(db, "users", user.uid), { teamId }, { merge: true });

      setCreatedCode(code);
      soundFx.playCorrect();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to create team. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    if (createdCode) {
      navigator.clipboard.writeText(createdCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-7 h-7 text-primary animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />

      <div className="relative z-10 px-5 pt-6 pb-10 space-y-6">
        {/* Back */}
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Logo */}
        <div className="flex justify-center py-2">
          <img src="/AIGNITE%20LOGO.png" alt="Aignite Logo" className="h-32 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]" />
        </div>

        {!createdCode ? (
          <Card className="bg-zinc-900/80 backdrop-blur border-white/10 shadow-2xl">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-xl font-bold text-white tracking-tight">CREATE YOUR TEAM</CardTitle>
              <CardDescription className="text-zinc-400 text-sm">You will be the team captain</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">Team Name</Label>
                  <Input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Neural Ninjas"
                    className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 h-11 rounded-xl"
                    maxLength={30}
                  />
                </div>
                {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center">{error}</div>}
                <Button type="submit" disabled={saving || !teamName.trim()} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {saving ? "Creating..." : "CREATE TEAM"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-900/80 backdrop-blur border-primary/30 shadow-2xl">
            <CardHeader className="text-center space-y-1">
              <div className="text-4xl mb-2">🎉</div>
              <CardTitle className="text-xl font-bold text-white">TEAM CREATED!</CardTitle>
              <CardDescription className="text-zinc-400">Share this code with your teammates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Invite Code */}
              <div className="bg-zinc-950 border border-primary/30 rounded-2xl p-5 text-center shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Invite Code</p>
                <p className="text-4xl font-black tracking-[0.3em] text-primary font-mono">{createdCode}</p>
              </div>
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 bg-zinc-800/40 text-sm text-zinc-300 hover:bg-zinc-700/40 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl"
              >
                GO TO DASHBOARD
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
