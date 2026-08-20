"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Loader2, Gamepad2, Users, Swords, Trophy, LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userTeam, setUserTeam] = useState<any>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/auth");
        return;
      }
      setUser(firebaseUser);
      
      try {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.role === "admin") {
            setIsAdmin(true);
          }
          if (data.teamId) {
            const teamSnap = await getDoc(doc(db, "teams", data.teamId));
            if (teamSnap.exists()) {
              setUserTeam({ id: teamSnap.id, ...teamSnap.data() });
            }
          }
        }
      } catch (err) {
        console.error("Failed to load user privileges:", err);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleLeaveTeam = async () => {
    if (!user || !userTeam) return;
    if (!window.confirm("Are you sure you want to leave your team?")) return;
    
    setLeaving(true);
    try {
      const teamRef = doc(db, "teams", userTeam.id);
      const updatedMembers = (userTeam.members || []).filter((uid: string) => uid !== user.uid);
      const updatedMemberNames = (userTeam.memberNames || []).filter((_: any, idx: number) => userTeam.members[idx] !== user.uid);

      if (updatedMembers.length === 0) {
        await deleteDoc(teamRef);
      } else {
        const newCaptainId = userTeam.captainId === user.uid ? updatedMembers[0] : userTeam.captainId;
        await updateDoc(teamRef, {
          members: updatedMembers,
          memberNames: updatedMemberNames,
          captainId: newCaptainId,
        });
      }

      await updateDoc(doc(db, "users", user.uid), {
        teamId: null,
      });

      setUserTeam(null);
    } catch (err) {
      console.error("Failed to leave team:", err);
    } finally {
      setLeaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />

      <div className="relative z-10 px-5 pt-6 pb-10 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Welcome back</p>
            <h1 className="text-xl font-bold text-white truncate">{user?.displayName || "Player"}</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link href="/admin">
                <Badge className="bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 text-[9px] font-bold tracking-widest uppercase hover:bg-[#00F0FF]/25 cursor-pointer py-1 px-2 rounded-lg transition-all">
                  🛡 JUDGE CONSOLE
                </Badge>
              </Link>
            )}
            {user?.photoURL && (
              <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border border-primary/30" />
            )}
            <button onClick={handleSignOut} className="text-zinc-500 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-white">Competition Active</p>
            <p className="text-xs text-zinc-400">Join or create a team to participate</p>
          </div>
          <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">LIVE</Badge>
        </div>

        {/* Team Actions / Your Team Display */}
        {userTeam ? (
          <Card className="bg-zinc-900/60 border-primary/20 p-5 rounded-2xl shadow-xl space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">YOUR TEAM</p>
                <h3 className="text-lg font-bold text-white mt-1 uppercase">{userTeam.name}</h3>
                <div className="bg-zinc-950 border border-primary/20 rounded-xl p-2 px-3 mt-2 inline-block">
                  <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono">Invite Code</p>
                  <p className="text-base font-black text-primary font-mono tracking-widest">{userTeam.code}</p>
                </div>
              </div>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLeaveTeam}
                disabled={leaving}
                className="bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white text-[10px] font-bold font-mono uppercase tracking-wider rounded-xl h-8 px-3"
              >
                {leaving ? "LEAVING..." : "LEAVE TEAM"}
              </Button>
            </div>
            
            <div className="space-y-2 border-t border-white/5 pt-4">
              <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">Teammates ({userTeam.members?.length || 0}/4)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {userTeam.members?.map((uid: string, idx: number) => {
                  const isCaptain = userTeam.captainId === uid;
                  return (
                    <div key={uid} className="bg-zinc-950/85 border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-white block truncate">{userTeam.memberNames?.[idx] || "Teammate"}</span>
                        <span className="text-[9px] text-zinc-500 font-mono block uppercase">
                          {isCaptain ? "⚡ Team Captain" : "Teammate"}
                        </span>
                      </div>
                      {uid === user.uid && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] shrink-0 ml-2">YOU</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Link href="/team/create">
              <Card className="bg-zinc-900/60 border-primary/20 hover:border-primary/50 transition-all cursor-pointer h-full">
                <CardHeader className="pb-2 pt-4 px-4">
                  <Users className="w-6 h-6 text-primary mb-1" />
                  <CardTitle className="text-sm font-bold text-white">Create Team</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-xs text-zinc-400">Start a new squad</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/team/join">
              <Card className="bg-zinc-900/60 border-secondary/20 hover:border-secondary/50 transition-all cursor-pointer h-full">
                <CardHeader className="pb-2 pt-4 px-4">
                  <Gamepad2 className="w-6 h-6 text-secondary mb-1" />
                  <CardTitle className="text-sm font-bold text-white">Join Team</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-xs text-zinc-400">Enter an invite code</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Competition Rounds */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Competition Rounds</h2>

          <Link href="/round/1">
            <div className="flex items-center gap-4 bg-zinc-900/60 border border-white/5 hover:border-secondary/40 rounded-2xl p-5 transition-all group">
              <div className="p-2 bg-secondary/10 rounded-xl border border-secondary/20">
                <Swords className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest">ROUND 01</p>
                <p className="font-bold text-white text-sm">HUMAN VS MACHINE</p>
              </div>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px]">OPEN</Badge>
            </div>
          </Link>

          <Link href="/round/2">
            <div className="flex items-center gap-4 bg-zinc-900/60 border border-white/5 hover:border-primary/40 rounded-2xl p-5 transition-all group">
              <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest">ROUND 02</p>
                <p className="font-bold text-white text-sm">AI WHO AM I?</p>
              </div>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px]">OPEN</Badge>
            </div>
          </Link>

          {/* Round 3 — Final Round */}
          <Link href="/round/3">
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#d9ff52]/5 to-transparent border border-[#d9ff52]/20 hover:border-[#d9ff52]/50 rounded-2xl p-5 transition-all group">
              <div className="p-2 bg-[#d9ff52]/10 rounded-xl border border-[#d9ff52]/20">
                <Zap className="w-5 h-5 text-[#d9ff52]" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[#d9ff52]/50 font-mono tracking-widest">FINAL ROUND</p>
                <p className="font-bold text-white text-sm">BUILD UNDER PRESSURE</p>
              </div>
              <Badge className="bg-[#d9ff52]/10 text-[#d9ff52] border-[#d9ff52]/20 text-[10px]">TOP 6</Badge>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
