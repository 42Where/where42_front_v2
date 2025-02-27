export function PopularSeatSkeleton() {
  return (
    <div className="flex w-[310px] animate-pulse flex-row items-center justify-between gap-3 rounded-lg bg-gray-200 md:h-[28px] xl:h-[32px]" />
  );
}

export function PopularSeatSkeletonContainer() {
  return (
    <div className="flex w-full flex-col items-center justify-center  gap-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <PopularSeatSkeleton key={idx} />
      ))}
    </div>
  );
}
