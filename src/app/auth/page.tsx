"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, provider, signInWithPopup, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Auto-redirect if already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            router.push("/dashboard");
          } else {
            router.push("/register");
          }
        } catch (e) {
          router.push("/register");
        }
      } else {
        setCheckingSession(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      // Sign in with Google
      await signInWithPopup(auth, provider);
      // Let the onAuthStateChanged listener handle the redirection
    } catch (error: any) {
      console.error("Authentication failed:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled. Please try again.");
      } else if (error.code === "auth/configuration-not-found") {
        setError("Google Sign-In is not enabled in Firebase Console yet.");
      } else {
        setError(error.message || "Sign in failed. Please try again.");
      }
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/AIGNITE%20LOGO.png" alt="Aignite Logo" className="h-36 drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]" />
        </div>

        <Card className="bg-zinc-900/80 backdrop-blur border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              WELCOME TO THE ARCADE
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-medium flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? "Signing In..." : "Continue with Google"}
            </Button>

            {/* Inline error message */}
            {error && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 text-center">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col text-center space-y-4">
            <p className="text-xs text-zinc-500">
              By continuing, you agree to the competition rules.
            </p>
            <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Return to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
