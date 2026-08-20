// Full-screen layout for Round 1 — bypasses mobile container and BottomNav
export default function Round1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
