// Full-screen layout — bypasses mobile wrapper and BottomNav
export default function Round3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
