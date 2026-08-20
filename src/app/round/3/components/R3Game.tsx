"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useR3, type Product, type ChallengeCard } from "../context/R3Context";
import { LockKeyhole, Pause, Sparkles, Check, Upload, Image as ImageIcon, Loader2 } from "lucide-react";

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function ChallengeCards({ challenge, color }: { challenge: ChallengeCard[]; color: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {challenge.map(card => (
        <div
          key={card.label}
          className="min-h-[110px] border border-white/10 bg-white/[.04] p-4 animate-rise"
          style={{ borderTopColor: color, borderTopWidth: 3 }}
        >
          <p className="font-mono-ui text-[9px] font-bold tracking-[.19em]" style={{ color }}>
            {card.label}
          </p>
          <p className="mt-3 text-sm font-bold leading-snug text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

interface Props { myTeamId: string }

export function R3Game({ myTeamId }: Props) {
  const router = useRouter();
  const { state, myTeam, updateProduct, submitTeam } = useR3();
  const [r3Image, setR3Image] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "teams", myTeamId), (snap) => {
      if (snap.exists()) {
        setR3Image(snap.data().r3Image || null);
      }
    });
    return () => unsub();
  }, [myTeamId]);

  if (!myTeam) return null;

  const isLocked = myTeam.submitted || state.phase === "ended";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800 * 1024) {
      alert("Mockup prototype image size must be less than 800KB. Please compress the file or upload a smaller one.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        await updateDoc(doc(db, "teams", myTeamId), {
          r3Image: base64String,
          r3Product: myTeam.product,
        });
        setR3Image(base64String);
      } catch (err) {
        console.error("Failed to upload mockup image:", err);
        alert("Upload failed: " + (err as Error).message);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFinish = async () => {
    if (!r3Image) {
      alert("Please upload your product mockup image before submitting!");
      return;
    }

    try {
      // 1. Submit locally
      submitTeam(myTeamId);

      // 2. Persist to Firestore
      await updateDoc(doc(db, "teams", myTeamId), {
        r3Submitted: true,
        r3Product: myTeam.product,
      });

      // 3. Forward to main standings
      router.push("/leaderboard");
    } catch (err) {
      console.error("Failed to submit round 3:", err);
      alert("Submission error: " + (err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 space-y-6">

      {/* Countdown overlay */}
      {state.countdown !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0d1117]/95">
          <div className="text-center animate-pop">
            <p className="font-mono-ui text-[11px] uppercase tracking-[.24em] text-[#d9ff52]">The arena opens in</p>
            <p className="font-display text-[10rem] font-bold leading-none text-[#d9ff52]">
              {state.countdown === 0 ? "CREATE!" : state.countdown}
            </p>
          </div>
        </div>
      )}

      {/* Pause banner */}
      {state.paused && (
        <div className="flex items-center justify-center gap-2 border border-[#d9ff52]/30 bg-[#d9ff52]/10 p-3 rounded-lg font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#d9ff52]">
          <Pause size={14} /> Host has paused the round
        </div>
      )}

      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/8 pb-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center font-display text-lg font-bold border border-white/10"
            style={{ color: myTeam.color, backgroundColor: myTeam.tint }}
          >
            {myTeam.short}
          </span>
          <div>
            <p className="font-mono-ui text-[9px] uppercase tracking-widest text-zinc-500">{myTeam.name} / private build room</p>
            <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">Make the idea real.</h1>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-zinc-500">Time Remaining</p>
            <p className={`font-mono-ui text-2xl font-bold ${state.secondsRemaining < 60 ? "text-[#ff6f91]" : "text-white"}`}>
              {formatTime(state.secondsRemaining)}
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Cards */}
      <div>
        <p className="font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-500 mb-3">
          Sealed brief — only your room can see this
        </p>
        <ChallengeCards challenge={myTeam.challenge} color={myTeam.color} />
      </div>

      {/* Main layout centered */}
      <div className="max-w-2xl mx-auto w-full">

        {/* Product Board */}
        <section className="border border-white/10 bg-white/[.04] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div className="flex items-center gap-3">
              <Sparkles size={17} className="text-[#d9ff52]" />
              <div>
                <p className="text-sm font-bold text-white">Product Board</p>
                <p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-zinc-500">Shape the submission</p>
              </div>
            </div>
            {isLocked && (
              <span className="inline-flex items-center gap-1.5 font-mono-ui text-[9px] uppercase tracking-[.13em] text-[#d9ff52]">
                <LockKeyhole size={12} /> Locked
              </span>
            )}
          </div>

          <div className="space-y-4 p-5">
            {/* Round 3 Image Uploader Card */}
            <div className="border border-white/10 bg-black/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#d9ff52]" />
                <span className="font-mono-ui text-[9px] font-bold uppercase tracking-[.16em] text-zinc-400">
                  Prototype / Mockup Upload
                </span>
              </div>
              
              {r3Image ? (
                <div className="space-y-2">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-zinc-950 flex items-center justify-center">
                    <img src={r3Image} alt="Uploaded Prototype" className="max-h-full max-w-full object-contain" />
                  </div>
                  {!isLocked && (
                    <label className="block text-center cursor-pointer py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-lg text-[10px] font-bold font-mono-ui uppercase tracking-wider text-zinc-400">
                      Change Mockup File
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploading} />
                    </label>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-white/10 hover:border-[#d9ff52]/40 bg-zinc-950/60 cursor-pointer transition-colors p-4 text-center">
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-[#d9ff52] animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-zinc-500 mb-2" />
                      <span className="text-[10px] font-bold font-mono-ui uppercase tracking-widest text-zinc-400">
                        Upload Prototype Mockup
                      </span>
                      <span className="text-[9px] text-zinc-600 mt-1 uppercase font-mono-ui">
                        JPEG, PNG (Max 800KB)
                      </span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploading} />
                </label>
              )}
            </div>

            {(["name", "oneLiner", "audience", "features"] as (keyof Product)[]).map(field => (
              <label key={field} className="block">
                <span className="mb-2 block font-mono-ui text-[9px] font-bold uppercase tracking-[.16em] text-zinc-500">
                  {field === "name" ? "Product Name" : field === "oneLiner" ? "One-line promise" : field === "audience" ? "Made for" : "Three proof points"}
                </span>
                {field === "features" ? (
                  <textarea
                    value={myTeam.product[field]}
                    onChange={e => updateProduct(myTeamId, field, e.target.value)}
                    disabled={isLocked}
                    rows={3}
                    className="w-full resize-none border border-white/10 bg-[#0d1117] px-3 py-3 text-sm leading-6 text-white outline-none focus:border-[#d9ff52]/50 disabled:opacity-50 rounded-lg"
                  />
                ) : (
                  <input
                    value={myTeam.product[field]}
                    onChange={e => updateProduct(myTeamId, field, e.target.value)}
                    disabled={isLocked}
                    className="w-full border border-white/10 bg-[#0d1117] px-3 py-3 text-sm text-white outline-none focus:border-[#d9ff52]/50 disabled:opacity-50 rounded-lg"
                  />
                )}
              </label>
            ))}

            <div className="border-t border-white/8 pt-4">
              <button
                onClick={handleFinish}
                disabled={isLocked || state.phase !== "live" || !r3Image || uploading}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-[#d9ff52] text-[#0d1117] font-mono-ui text-xs uppercase tracking-widest font-black disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform hover:shadow-[4px_4px_0_#ff6f91]"
              >
                {myTeam.submitted ? <><Check size={15} /> Submission locked</> : <><LockKeyhole size={15} /> Submit & View Standings</>}
              </button>
              <p className="mt-3 text-center font-mono-ui text-[9px] text-zinc-600 uppercase tracking-widest">
                Make sure your mockup image is uploaded and board is fully configured.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
