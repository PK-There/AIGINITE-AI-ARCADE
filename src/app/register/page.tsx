"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserCircle2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        // Not signed in — redirect to auth
        router.push("/auth");
        return;
      }

      setUser(firebaseUser);
      setDisplayName(firebaseUser.displayName || "");

      // Check if user already has a profile (Firestore)
      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          // Already registered — go to dashboard
          router.push("/dashboard");
          return;
        }
      } catch (e) {
        // Firestore not ready yet — let user fill form anyway
        console.warn("Firestore check skipped:", e);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return setError("Please enter your name.");
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      // Update Firebase Auth profile
      try {
        await updateProfile(user, { displayName: displayName.trim() });
      } catch (e) {
        console.warn("Could not update Firebase auth profile:", e);
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName.trim(),
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        teamId: null,
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Could not save your profile. Please check your Firebase setup.");
      setSaving(false);
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center py-2">
          <img src="/AIGNITE%20LOGO.png" alt="Aignite Logo" className="h-32 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]" />
        </div>

        {/* User Google Info */}
        {user?.photoURL && (
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl px-4 py-3">
            <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-primary/30" />
            <div>
              <p className="text-sm font-semibold text-white">{user.displayName}</p>
              <p className="text-xs text-zinc-400">{user.email}</p>
            </div>
          </div>
        )}

        <Card className="bg-zinc-900/80 backdrop-blur border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-white tracking-tight">
              COMPLETE YOUR PROFILE
            </CardTitle>
            <CardDescription className="text-zinc-400 text-sm">
              Set up your arcade identity before joining a team
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
                  Display Name
                </Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Prathamesh"
                  className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 h-11 rounded-xl"
                  maxLength={30}
                />
              </div>


              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={saving || !displayName.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "ENTER THE ARCADE"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
