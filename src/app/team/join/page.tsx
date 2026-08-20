"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Users, LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TeamItem {
  id: string;
  name: string;
  code: string;
  members: string[];
  memberNames: string[];
}

export default function JoinTeamPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Teams list state
  const [teamsList, setTeamsList] = useState<TeamItem[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push("/auth"); return; }
      setUser(u);
      
      try {
        const userSnap = await getDoc(doc(db, "users", u.uid));
        if (userSnap.exists() && userSnap.data().teamId) {
          router.push("/dashboard");
          return;
        }
      } catch (err) {
        console.error("Failed to verify user team status:", err);
      }
      
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Fetch active teams list
  useEffect(() => {
    if (loading) return;

    const fetchTeams = async () => {
      try {
        const teamsRef = collection(db, "teams");
        const snap = await getDocs(teamsRef);
        const list: TeamItem[] = snap.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || "Unnamed Team",
              code: data.code || "",
              members: data.members || [],
              memberNames: data.memberNames || [],
            };
          })
          .filter((t) => t.members.length > 0); // only show teams with at least 1 member
        setTeamsList(list);
      } catch (err) {
        console.error("Error fetching teams list:", err);
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchTeams();
  }, [loading]);

  const joinTeamById = async (teamId: string, teamData: any) => {
    if (!user) return;
    setJoining(true);
    setError(null);

    try {
      if (teamData.members?.length >= 4) {
        setError("This team is full (max 4 members).");
        setJoining(false);
        return;
      }

      if (teamData.members?.includes(user.uid)) {
        setError("You are already in this team!");
        setJoining(false);
        return;
      }

      const teamDocRef = doc(db, "teams", teamId);
      await updateDoc(teamDocRef, {
        members: [...(teamData.members || []), user.uid],
        memberNames: [...(teamData.memberNames || []), user.displayName || user.email],
      });
      await updateDoc(doc(db, "users", user.uid), { teamId });

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Failed to join team. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !user) return;
    setJoining(true);
    setError(null);

    try {
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("code", "==", code.trim().toUpperCase()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("No team found with that code. Check and try again.");
        setJoining(false);
        return;
      }

      const teamDoc = snap.docs[0];
      const teamData = teamDoc.data();
      await joinTeamById(teamDoc.id, teamData);
    } catch (err: any) {
      setError("Failed to join team. Please try again.");
      setJoining(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-7 h-7 text-primary animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-16">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.12),transparent)]" />

      <div className="relative z-10 px-5 pt-6 pb-10 space-y-6">
        {/* Back */}
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Logo */}
        <div className="flex justify-center py-2">
          <img src="/AIGNITE%20LOGO.png" alt="Aignite Logo" className="h-36 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]" />
        </div>

        {/* Code Input card */}
        <Card className="bg-zinc-900/80 backdrop-blur border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                <Users className="w-7 h-7 text-secondary" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-white tracking-tight">JOIN A TEAM</CardTitle>
            <CardDescription className="text-zinc-400 text-sm">Enter the 6-character invite code from your captain</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinByCode} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">Invite Code</Label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="E.G. A7X92K"
                  className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 h-14 rounded-xl text-2xl tracking-[0.3em] text-center font-mono uppercase"
                  maxLength={6}
                />
              </div>
              {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center">{error}</div>}
              <Button
                type="submit"
                disabled={joining || code.trim().length < 6}
                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(96,165,250,0.3)]"
              >
                {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                {joining ? "Joining..." : "JOIN BY CODE"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Teams Feed */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Active Created Teams</h2>
          
          {loadingTeams ? (
            <div className="flex justify-center p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : teamsList.length === 0 ? (
            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl text-center text-xs text-zinc-500">
              No teams created yet. Be the first one!
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {teamsList.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-2xl p-4"
                >
                  <div>
                    <h3 className="font-bold text-white text-sm">{team.name}</h3>
                    <p className="text-[10px] text-zinc-400 mt-1">
                      {team.members.length}/4 Members
                    </p>
                    <p className="text-[9px] text-zinc-600 font-mono mt-0.5 uppercase tracking-wider">
                      Code: {team.code}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    disabled={joining || team.members.length >= 4}
                    onClick={() => joinTeamById(team.id, team)}
                    className="bg-primary/20 hover:bg-primary/40 border border-primary/30 text-primary text-xs rounded-lg flex items-center gap-1.5 h-9"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-zinc-600">
          Teams are limited to 4 members. Each player completes a different subgame.
        </p>
      </div>
    </div>
  );
}
