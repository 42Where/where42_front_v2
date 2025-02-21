export function PieSkeleton() {
  return <div className="size-32 animate-pulse rounded-full bg-gray-200 xl:size-40" />;
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
