import SingleBlock from '@/components/seat/Block';
import SeatNavigator from '@/components/seat/Navigator';
import XBlock from '@/components/seat/XBlock';

export default function SeatsPage() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-20 px-1 md:px-10">
      <SeatNavigator />
      <div className="flex flex-row gap-10">
        <SingleBlock />
        <SingleBlock />
        <XBlock />
        <XBlock isHalfCross />
      </div>
    </main>
  );
}
