// Full-screen layout for Round 2 — bypasses mobile container and BottomNav  
export default function Round2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
