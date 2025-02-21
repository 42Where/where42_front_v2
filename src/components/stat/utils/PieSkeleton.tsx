export function PieSkeleton({ noHeader = false }: { noHeader?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="size-32 animate-pulse rounded-full bg-gray-200 xl:size-40" />
      {!noHeader && (
        <div className="flex w-10 animate-pulse flex-row items-center justify-between gap-3 rounded-lg bg-gray-200 md:h-[28px] xl:h-[32px]" />
      )}
      <div className="flex w-14 animate-pulse flex-row items-center justify-between gap-3 rounded-lg bg-gray-200 md:h-[24px] xl:h-[28px]" />
    </div>
  );
}

export function PieSkeletonContainer() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <PieSkeleton key={idx} />
      ))}
    </>
  );
}
