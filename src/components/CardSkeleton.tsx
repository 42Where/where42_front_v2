import { Skeleton } from './ui/skeleton';

const SingleCardSkeleton = () => {
  return <Skeleton className='h-[164px] w-full rounded-lg' />;
};

export default function CardSkeleton() {
  return (
    <div className='pt-20 grid lg:grid-cols-2 air:grid-cols-3 3xl:grid-cols-4 grid-flow-row gap-4'>
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
      <SingleCardSkeleton />
    </div>
  );
}
