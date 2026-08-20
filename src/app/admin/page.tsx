"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  Shield,
  Users,
  Trophy,
  Key,
  RefreshCw,
  Trash2,
  Edit2,
  Check,
  X,
  Lock,
  Unlock,
  Settings,
  Search,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { soundFx } from "../round/1/utils/audio";

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  college?: string;
  teamId?: string | null;
  role?: string;
}

interface TeamData {
  id: string;
  name: string;
  code: string;
  captainId: string;
  members: string[];
  memberNames: string[];
  teamScore?: number;
  totalTime?: number;
  status?: string;
  round1State?: any;
}

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [activeTab, setActiveTab] = useState<"leaderboard" | "teams" | "users">("leaderboard");

  // Real-time collections
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  // Search/Filters
  const [teamSearch, setTeamSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Editing state
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [editTeamCode, setEditTeamCode] = useState("");
  const [editTeamScore, setEditTeamScore] = useState<number>(0);
  const [editTeamTime, setEditTeamTime] = useState<number>(0);
  const [editTeamStatus, setEditTeamStatus] = useState("");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserCollege, setEditUserCollege] = useState("");
  const [editUserTeamId, setEditUserTeamId] = useState("");

  // Monitor auth state and check if user has admin privileges
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }
      setCurrentUser(user);

      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Failed to check admin privileges:", err);
      }
      setLoading(false);
    });

    return () => unsubAuth();
  }, [router]);

  // Real-time Firestore listeners for teams and users
  useEffect(() => {
    if (!isAdmin) return;

    const unsubTeams = onSnapshot(collection(db, "teams"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamData));
      setTeams(list);
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      const list = snap.docs.map((d) => ({ uid: d.id, ...d.data() } as UserProfile));
      setUsers(list);
    });

    return () => {
      unsubTeams();
      unsubUsers();
    };
  }, [isAdmin]);

  // Handle Admin Passcode Verification Gate
  const handleVerifyPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError("");

    // Verify Master Key
    if (passcode.trim() === "AIGNITE2026") {
      if (currentUser) {
        try {
          await updateDoc(doc(db, "users", currentUser.uid), {
            role: "admin",
          });
          setIsAdmin(true);
          soundFx.playCorrect();
        } catch (err) {
          setPasscodeError("Could not write admin privileges to Firestore.");
        }
      }
    } else {
      soundFx.playWrong();
      setPasscodeError("INVALID MASTER KEY. SECURITY BLOCK ACTIVE.");
    }
  };

  // Team Edit Save
  const handleSaveTeamEdit = async (teamId: string) => {
    try {
      await updateDoc(doc(db, "teams", teamId), {
        name: editTeamName.trim(),
        code: editTeamCode.trim().toUpperCase(),
        teamScore: editTeamScore,
        totalTime: editTeamTime,
        status: editTeamStatus,
      });
      setEditingTeamId(null);
      soundFx.playCorrect();
    } catch (err) {
      console.error("Failed to update team:", err);
    }
  };

  // Kick member from team
  const handleKickMember = async (team: TeamData, memberUid: string) => {
    if (!window.confirm("Are you sure you want to kick this teammate?")) return;
    try {
      const updatedMembers = team.members.filter((m) => m !== memberUid);
      
      const updatedNames: string[] = [];
      for (const uid of updatedMembers) {
        const uSnap = await getDoc(doc(db, "users", uid));
        if (uSnap.exists()) {
          updatedNames.push(uSnap.data().displayName || uSnap.data().email || "Teammate");
        }
      }

      await updateDoc(doc(db, "teams", team.id), {
        members: updatedMembers,
        memberNames: updatedNames,
      });

      await updateDoc(doc(db, "users", memberUid), {
        teamId: null,
      });

      soundFx.playCorrect();
    } catch (err) {
      console.error("Failed to kick member:", err);
    }
  };

  // Reset Round 1 State for a team
  const handleResetRound1State = async (team: TeamData) => {
    if (!window.confirm(`Reset Round 1 progress state for team "${team.name}"?`)) return;
    try {
      const resetState = {
        teamName: team.name,
        teamId: team.code,
        currentStage: 1,
        teamScore: 0,
        totalTime: 0,
        playerStatus: {
          1: "ACTIVE",
          2: "LOCKED",
          3: "LOCKED",
          4: "LOCKED",
        },
        playerScores: {
          1: { playerScore: 0, correctAnswers: 0, wrongAnswers: 0, completionTime: 0, speedBonus: 0, finalSubgameScore: 0 },
          2: { playerScore: 0, correctAnswers: 0, wrongAnswers: 0, completionTime: 0, speedBonus: 0, finalSubgameScore: 0 },
          3: { playerScore: 0, correctAnswers: 0, wrongAnswers: 0, completionTime: 0, speedBonus: 0, finalSubgameScore: 0 },
          4: { playerScore: 0, correctAnswers: 0, wrongAnswers: 0, completionTime: 0, speedBonus: 0, finalSubgameScore: 0 },
        },
        startTime: Date.now(),
        isFinished: false,
      };

      await updateDoc(doc(db, "teams", team.id), {
        round1State: resetState,
        teamScore: 0,
        totalTime: 0,
      });

      soundFx.playCorrect();
    } catch (err) {
      console.error("Failed to reset Round 1:", err);
    }
  };

  // Delete Team
  const handleDeleteTeam = async (team: TeamData) => {
    if (!window.confirm(`PERMANENTLY DELETE Team "${team.name}"? This cannot be undone.`)) return;
    try {
      for (const memberUid of team.members) {
        await updateDoc(doc(db, "users", memberUid), {
          teamId: null,
        });
      }
      await deleteDoc(doc(db, "teams", team.id));
      soundFx.playWrong();
    } catch (err) {
      console.error("Failed to delete team:", err);
    }
  };

  // User Edit Save
  const handleSaveUserEdit = async (uid: string) => {
    try {
      const updateData: any = {
        displayName: editUserName.trim(),
        college: editUserCollege.trim(),
      };
      
      if (editUserTeamId === "none") {
        updateData.teamId = null;
      } else if (editUserTeamId.trim()) {
        updateData.teamId = editUserTeamId.trim();
      }

      await updateDoc(doc(db, "users", uid), {
        ...updateData,
      });

      setEditingUserId(null);
      soundFx.playCorrect();
    } catch (err) {
      console.error("Failed to update user profile:", err);
    }
  };

  // Toggle user admin role
  const handleToggleAdmin = async (user: UserProfile) => {
    try {
      const newRole = user.role === "admin" ? "" : "admin";
      await updateDoc(doc(db, "users", user.uid), {
        role: newRole,
      });
      soundFx.playCorrect();
    } catch (err) {
      console.error("Failed to toggle admin role:", err);
    }
  };

  // Delete User completely
  const handleDeleteUser = async (uid: string) => {
    if (!window.confirm("PERMANENTLY DELETE User profile from database?")) return;
    try {
      await deleteDoc(doc(db, "users", uid));
      soundFx.playWrong();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Setup initial edit values for Team
  const startEditingTeam = (team: TeamData) => {
    setEditingTeamId(team.id);
    setEditTeamName(team.name);
    setEditTeamCode(team.code);
    setEditTeamScore(team.teamScore || 0);
    setEditTeamTime(team.totalTime || 0);
    setEditTeamStatus(team.status || "READY");
  };

  // Setup initial edit values for User
  const startEditingUser = (user: UserProfile) => {
    setEditingUserId(user.uid);
    setEditUserName(user.displayName);
    setEditUserCollege(user.college || "");
    setEditUserTeamId(user.teamId || "none");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-[#00F0FF] animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden font-mono">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />
        
        <Card className="w-full max-w-md bg-zinc-950/80 border-2 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative z-10 backdrop-blur-xl rounded-2xl">
          <CardHeader className="text-center pb-4 border-b border-red-500/10">
            <div className="flex justify-center mb-2 animate-pulse">
              <Shield className="w-12 h-12 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold tracking-widest text-red-500 uppercase">
              Security Access Restriction
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs mt-1">
              Live Event Command Panel requires master authority credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-zinc-400">Master Access Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <Input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="ENTER CONSOLE PASSCODE..."
                    className="bg-zinc-900 border-zinc-800 text-center font-bold tracking-widest text-red-400 placeholder:text-zinc-700 h-11 pl-10 rounded-xl"
                  />
                </div>
              </div>
              
              {passcodeError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center rounded-xl font-bold uppercase tracking-wider">
                  ⚠ {passcodeError}
                </div>
              )}

              <Button type="submit" className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider rounded-xl">
                VERIFY SIGNATURE
              </Button>

              <Link href="/dashboard" className="block text-center text-xs text-zinc-500 hover:text-white transition-colors pt-2 uppercase">
                Return to Player Dashboard
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filtered lists
  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      t.code.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.college || "").toLowerCase().includes(userSearch.toLowerCase())
  );

  const sortedLeaderboard = [...teams].sort((a, b) => {
    const scoreDiff = (b.teamScore || 0) - (a.teamScore || 0);
    if (scoreDiff !== 0) return scoreDiff;
    return (a.totalTime || 0) - (b.totalTime || 0);
  });

  return (
    <div className="min-h-screen bg-[#090D16] text-zinc-100 font-mono relative overflow-x-hidden pb-12 flex flex-col">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,240,255,0.08) 0px, rgba(0,240,255,0.08) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Header bar */}
      <header className="relative z-10 border-b border-[#00F0FF]/15 bg-[#0d1117]/80 backdrop-blur py-4 px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#00F0FF] animate-pulse" />
          <div>
            <h1 className="text-sm font-black tracking-widest text-[#00F0FF] uppercase">
              AIGNITE AI ARCADE
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
              Live Judge Command Console
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1.5 p-1 bg-zinc-950/60 border border-white/5 rounded-xl">
          <button
            onClick={() => { setActiveTab("leaderboard"); soundFx.playKeypress(); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "leaderboard"
                ? "bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 inline mr-1" />
            Standings
          </button>
          <button
            onClick={() => { setActiveTab("teams"); soundFx.playKeypress(); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "teams"
                ? "bg-purple-500/10 border border-purple-500/30 text-purple-400"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5 inline mr-1" />
            Teams ({teams.length})
          </button>
          <button
            onClick={() => { setActiveTab("users"); soundFx.playKeypress(); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "users"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5 inline mr-1" />
            Players ({users.length})
          </button>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="border-white/10 hover:bg-zinc-800 text-xs font-mono uppercase">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return
          </Button>
        </Link>
      </header>

      {/* Main panel body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 relative z-10">
        
        {/* LEADERBOARD VIEW */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <Card className="bg-zinc-950 border-white/5 shadow-2xl rounded-2xl">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-md font-bold tracking-widest text-[#00F0FF] uppercase flex items-center gap-2">
                  <Trophy className="text-yellow-500 w-5 h-5" /> Live Ranking Standings
                </CardTitle>
                <CardDescription className="text-zinc-500 text-xs">
                  Updated in real-time as participants complete rounds and score points.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase tracking-widest">
                        <th className="py-4 px-6 text-center w-16">Rank</th>
                        <th className="py-4 px-6">Team Name</th>
                        <th className="py-4 px-6 text-center">Invite Code</th>
                        <th className="py-4 px-6 text-center">Teammates</th>
                        <th className="py-4 px-6 text-center">R1 Stage</th>
                        <th className="py-4 px-6 text-right">Score</th>
                        <th className="py-4 px-6 text-right">Time Taken</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {sortedLeaderboard.map((team, idx) => (
                        <tr
                          key={team.id}
                          className={`hover:bg-white/[0.02] transition-colors ${
                            idx < 6 ? "bg-yellow-500/[0.01]" : ""
                          }`}
                        >
                          <td className="py-4 px-6 text-center font-black">
                            {idx + 1}
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-white block">{team.name}</span>
                            <span className="text-[10px] text-zinc-500 block">ID: {team.id}</span>
                          </td>
                          <td className="py-4 px-6 text-center font-bold tracking-wider text-purple-400">
                            {team.code}
                          </td>
                          <td className="py-4 px-6 text-center text-zinc-400">
                            {team.members?.length || 0}/4
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[9px] font-mono-ui uppercase">
                              Slot 0{team.round1State?.currentStage || 1}
                            </Badge>
                          </td>
                          <td className="py-4 px-6 text-right font-black text-[#00F0FF]">
                            {team.teamScore || 0}
                          </td>
                          <td className="py-4 px-6 text-right text-zinc-400 font-mono-ui">
                            {team.totalTime || 0}s
                          </td>
                        </tr>
                      ))}
                      {sortedLeaderboard.length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-zinc-600 text-xs">
                            No teams created in database.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TEAMS VIEW */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <Input
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                placeholder="Search teams by name or invite code..."
                className="bg-zinc-950 border-white/5 text-sm h-11 pl-11 rounded-xl text-white outline-none focus:border-[#00F0FF]/40"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTeams.map((team) => {
                const isEditing = editingTeamId === team.id;

                return (
                  <Card
                    key={team.id}
                    className={`bg-zinc-950 border-white/5 transition-all shadow-xl rounded-2xl flex flex-col ${
                      isEditing ? "border-purple-500/30" : "hover:border-[#00F0FF]/15"
                    }`}
                  >
                    <CardHeader className="border-b border-white/5 flex flex-row justify-between items-start gap-4">
                      {isEditing ? (
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-[10px] text-zinc-400 uppercase">Team Name</Label>
                              <Input
                                value={editTeamName}
                                onChange={(e) => setEditTeamName(e.target.value)}
                                className="bg-zinc-900 border-zinc-800 text-xs h-9 mt-1 text-white rounded-lg"
                              />
                            </div>
                            <div>
                              <Label className="text-[10px] text-zinc-400 uppercase">Invite Code</Label>
                              <Input
                                value={editTeamCode}
                                onChange={(e) => setEditTeamCode(e.target.value)}
                                className="bg-zinc-900 border-zinc-800 text-xs h-9 mt-1 text-white rounded-lg font-bold"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-[10px] text-[#00F0FF] uppercase">Total Score</Label>
                              <Input
                                type="number"
                                value={editTeamScore}
                                onChange={(e) => setEditTeamScore(Number(e.target.value))}
                                className="bg-zinc-900 border-zinc-800 text-xs h-9 mt-1 text-white rounded-lg font-bold"
                              />
                            </div>
                            <div>
                              <Label className="text-[10px] text-purple-400 uppercase">Time (sec)</Label>
                              <Input
                                type="number"
                                value={editTeamTime}
                                onChange={(e) => setEditTeamTime(Number(e.target.value))}
                                className="bg-zinc-900 border-zinc-800 text-xs h-9 mt-1 text-white rounded-lg"
                              />
                            </div>
                            <div>
                              <Label className="text-[10px] text-zinc-400 uppercase">Status</Label>
                              <select
                                value={editTeamStatus}
                                onChange={(e) => setEditTeamStatus(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 text-xs h-9 mt-1 text-white rounded-lg px-2 outline-none"
                              >
                                <option value="WAITING_FOR_MEMBERS">WAITING</option>
                                <option value="READY">READY</option>
                                <option value="COMPETING">COMPETING</option>
                                <option value="ELIMINATED">ELIMINATED</option>
                                <option value="FINALIST">FINALIST</option>
                                <option value="COMPLETED">COMPLETED</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <CardTitle className="text-md font-bold text-white tracking-wide uppercase">
                            {team.name}
                          </CardTitle>
                          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-mono">
                            Code: <span className="text-purple-400 font-bold">{team.code}</span> · ID: {team.id}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-1.5">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSaveTeamEdit(team.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 h-8 w-8 p-0 rounded-lg text-white"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTeamId(null)}
                              className="border-white/10 hover:bg-zinc-800 h-8 w-8 p-0 rounded-lg text-zinc-400"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => startEditingTeam(team)}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white h-8 w-8 p-0 rounded-lg border border-white/5"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4 flex-1 flex flex-col justify-between gap-5">
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                          Teammates ({team.members?.length || 0}/4)
                        </Label>
                        <div className="space-y-1.5">
                          {team.members?.map((uid, idx) => (
                            <div key={uid} className="flex items-center justify-between bg-zinc-900/60 border border-white/5 rounded-xl p-2 px-3 text-xs">
                              <div>
                                <span className="text-zinc-500 font-bold mr-1.5">#{idx + 1}</span>
                                <span className="text-white font-bold">{team.memberNames?.[idx] || "Teammate"}</span>
                                <span className="text-[9px] text-zinc-500 block">UID: {uid}</span>
                              </div>
                              <button
                                onClick={() => handleKickMember(team, uid)}
                                className="text-red-400/70 hover:text-red-400 text-[10px] uppercase font-bold tracking-wider"
                              >
                                Kick
                              </button>
                            </div>
                          ))}
                          {(!team.members || team.members.length === 0) && (
                            <p className="text-[10px] text-zinc-600 italic">No members signed up.</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 bg-zinc-900/40 border border-white/5 rounded-xl p-3 text-center gap-2">
                        <div>
                          <span className="text-[9px] text-zinc-500 block uppercase">Total Score</span>
                          <span className="text-sm font-black text-[#00F0FF]">{team.teamScore || 0} pts</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 block uppercase">Total Time</span>
                          <span className="text-sm font-black text-purple-400">{team.totalTime || 0}s</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 block uppercase">State</span>
                          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[9px] uppercase mt-0.5">
                            {team.status || "READY"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/5 justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResetRound1State(team)}
                          className="border-[#00F0FF]/25 bg-transparent text-[#00F0FF] hover:bg-[#00F0FF]/10 text-[10px] font-bold tracking-wider rounded-lg h-9"
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1" />
                          RESET R1 STATE
                        </Button>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTeam(team)}
                          className="bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white text-[10px] font-bold tracking-wider rounded-lg h-9"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          DELETE TEAM
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* USERS VIEW */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <Input
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search registered players by name, email, college..."
                className="bg-zinc-950 border-white/5 text-sm h-11 pl-11 rounded-xl text-white outline-none focus:border-emerald-500/40"
              />
            </div>

            <Card className="bg-zinc-950 border-white/5 shadow-2xl rounded-2xl">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="text-md font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-5 h-5" /> Registered Arcade Players
                </CardTitle>
                <CardDescription className="text-zinc-500 text-xs">
                  Manage profiles, assign teams, or toggle coordinator/admin credentials.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] text-zinc-500 uppercase tracking-widest">
                        <th className="py-4 px-6">Player Info</th>
                        <th className="py-4 px-6">College / Department</th>
                        <th className="py-4 px-6">Team ID</th>
                        <th className="py-4 px-6 text-center">Privileges</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredUsers.map((user) => {
                        const isEditing = editingUserId === user.uid;

                        return (
                          <tr key={user.uid} className="hover:bg-white/[0.01] transition-colors">
                            <td className="py-4 px-6">
                              {isEditing ? (
                                <Input
                                  value={editUserName}
                                  onChange={(e) => setEditUserName(e.target.value)}
                                  className="bg-zinc-900 border-zinc-800 text-xs h-8 text-white rounded-lg max-w-xs"
                                />
                              ) : (
                                <div>
                                  <span className="font-bold text-white block">{user.displayName || "Anonymous Player"}</span>
                                  <span className="text-[10px] text-zinc-500 block">{user.email}</span>
                                  <span className="text-[9px] text-zinc-600 font-mono block select-all">UID: {user.uid}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6 text-zinc-300">
                              {isEditing ? (
                                <Input
                                  value={editUserCollege}
                                  onChange={(e) => setEditUserCollege(e.target.value)}
                                  className="bg-zinc-900 border-zinc-800 text-xs h-8 text-white rounded-lg max-w-xs"
                                />
                              ) : (
                                user.college || <span className="text-zinc-600 italic">Not set</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {isEditing ? (
                                <div className="space-y-1">
                                  <select
                                    value={editUserTeamId}
                                    onChange={(e) => setEditUserTeamId(e.target.value)}
                                    className="bg-zinc-900 border border-zinc-800 text-xs h-8 text-white rounded-lg px-2 outline-none"
                                  >
                                    <option value="none">No Team</option>
                                    {teams.map((t) => (
                                      <option key={t.id} value={t.id}>
                                        {t.name} ({t.code})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : user.teamId ? (
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[9px] font-mono font-bold tracking-wider uppercase">
                                  {user.teamId}
                                </Badge>
                              ) : (
                                <span className="text-zinc-600 italic text-xs">No Team Joined</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Badge
                                onClick={() => handleToggleAdmin(user)}
                                className={`text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                                  user.role === "admin"
                                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                    : "bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-red-500/40 hover:text-red-400"
                                }`}
                              >
                                {user.role === "admin" ? "ADMIN" : "PLAYER"}
                              </Badge>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex gap-2 justify-end">
                                {isEditing ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveUserEdit(user.uid)}
                                      className="bg-emerald-600 hover:bg-emerald-700 h-8 px-2 rounded-lg text-white"
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingUserId(null)}
                                      className="border-white/10 hover:bg-zinc-800 h-8 px-2 rounded-lg text-zinc-400"
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => startEditingUser(user)}
                                      className="bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white h-8 w-8 p-0 rounded-lg"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => handleDeleteUser(user.uid)}
                                      className="bg-red-950/40 border border-red-500/30 hover:bg-red-600 hover:text-white text-red-400 h-8 w-8 p-0 rounded-lg"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredUsers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-zinc-600 text-xs">
                            No players found matching query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
