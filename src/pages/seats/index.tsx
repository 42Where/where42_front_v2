import SingleBlock from '@/components/seat/SingleBlock';
import SeatsLinkBtn from '@/components/buttons/SeatsLinkBtn';

export default function SeatsPage() {
  return (
    <main className="flex h-full min-h-screen w-full flex-row justify-start gap-20 px-1 md:px-10">
      <SeatsLinkBtn />
      <div className="flex flex-col gap-10">
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
      </div>
      <div className="flex flex-col gap-10">
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
        <SingleBlock />
      </div>
    </main>
  );
}
