export function StatContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6 rounded-xl border-2 border-darkblue p-4 md:p-6">
      {children}
    </div>
  );
}
