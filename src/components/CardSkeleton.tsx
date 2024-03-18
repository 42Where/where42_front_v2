import { Skeleton } from './ui/skeleton';

const SingleCardSkeleton = () => {
  return <Skeleton className='h-[164px] w-full rounded-lg' />;
};

export default function CardSkeleton() {
  return (
    <div className='pt-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row gap-4'>
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
    </div>
  );
}
