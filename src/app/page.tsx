import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Cpu, ShieldQuestion, Trophy, Zap, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MobileLandingPage() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col overflow-x-hidden pt-2 pb-6">
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]"></div>

      <main className="flex-1 relative z-10 w-full flex flex-col px-5 space-y-6">
        
        {/* HEADER / LOGO */}
        <header className="flex justify-center pt-4 pb-0">
          <img src="/AIGNITE%20LOGO.png" alt="Aignite Logo" className="h-28 drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]" />
        </header>

        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-[1.1]">
            THINK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FAST.</span><br />
            ASK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">SMART.</span><br />
            CREATE WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI.</span>
          </h1>
          
          <p className="text-sm text-zinc-400 font-medium px-2">
            Where knowledge, speed and artificial intelligence collide.
          </p>
          
          <Link href="/auth" className="block w-full">
            <Button size="lg" className="w-full h-12 text-md bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-2xl">
              ENTER ARCADE
            </Button>
          </Link>
        </section>

        {/* FLOATING ROUNDS PREVIEW */}
        <section className="relative h-32 w-full flex items-center justify-center perspective-1000 mt-2">
           <div className="absolute left-0 animate-[float_6s_ease-in-out_infinite] z-20">
             <MiniCard round="R1" icon={<Cpu className="w-5 h-5 text-secondary" />} />
           </div>
           <div className="absolute z-30 scale-100">
             <MiniCard round="R2" icon={<Search className="w-5 h-5 text-primary" />} />
           </div>
           <div className="absolute right-0 animate-[float_7s_ease-in-out_infinite] z-10">
             <MiniCard round="FINAL" icon={<BrainCircuit className="w-5 h-5 text-pink-500" />} />
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none"></div>
        </section>

        {/* COMPETITION CARDS */}
        <section className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">THREE ROUNDS.</h2>
            <h2 className="text-2xl font-bold text-primary tracking-tight">ONE CHAMPION.</h2>
          </div>

          <MobileCard 
            round="ROUND 01" 
            title="HUMAN VS MACHINE" 
            desc="Speed, knowledge, reflex and observation."
            icon={<Zap className="w-6 h-6 text-secondary" />}
            border="border-secondary/30"
          />
          <MobileCard 
            round="ROUND 02" 
            title="AI WHO AM I?" 
            desc="Ask smart questions. Eliminate possibilities."
            icon={<ShieldQuestion className="w-6 h-6 text-primary" />}
            border="border-primary/30"
          />
          <MobileCard 
            round="FINAL" 
            title="10-PROMPT CHALLENGE" 
            desc="Use AI to turn an idea into a product."
            icon={<BrainCircuit className="w-6 h-6 text-pink-500" />}
            border="border-pink-500/30"
          />
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-zinc-900/40 rounded-3xl p-6 border border-white/5 space-y-6">
          <h2 className="text-xl font-bold text-center text-white mb-2">HOW IT WORKS</h2>
          <div className="space-y-4">
            <MobileStep num="1" title="Register" desc="Sign in with Google." />
            <MobileStep num="2" title="Form Team" desc="Create or join a squad of 4." />
            <MobileStep num="3" title="Compete" desc="Clear all 3 arcade rounds." />
            <MobileStep num="4" title="Win" desc="Climb to the top rank." />
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">YOUR SQUAD AWAITS</h2>
          <p className="text-sm text-zinc-400">Join the arena before registration closes.</p>
          <Link href="/auth" className="inline-block w-full">
            <Button size="lg" variant="outline" className="w-full h-12 border-zinc-700 hover:bg-zinc-800 rounded-xl">
              JOIN COMPETITION
            </Button>
          </Link>
        </section>

      </main>
    </div>
  );
}

// Mobile specific subcomponents
function MiniCard({ round, icon }: { round: string, icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900/90 backdrop-blur border border-white/10 p-3 rounded-xl shadow-xl flex flex-col items-center gap-1 w-20">
      <span className="text-[10px] font-bold text-zinc-500">{round}</span>
      {icon}
    </div>
  );
}

function MobileCard({ round, title, desc, icon, border }: { round: string, title: string, desc: string, icon: React.ReactNode, border: string }) {
  return (
    <div className={`bg-zinc-900/60 backdrop-blur border ${border} p-5 rounded-2xl flex gap-4 items-start`}>
      <div className="p-3 bg-white/5 rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">{round}</div>
        <h3 className="font-bold text-white text-lg leading-tight mt-1">{title}</h3>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function MobileStep({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-black flex items-center justify-center shrink-0 border border-primary/30">
        {num}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-xs text-zinc-400">{desc}</p>
      </div>
    </div>
  );
}
