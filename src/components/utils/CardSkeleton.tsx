import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SingleCardSkeleton = () => {
  return <Skeleton className="h-[164px] w-full rounded-lg" />;
};

export default function CardSkeleton() {
  const [skeletonNum, setSkeletonNum] = useState(8);
  useEffect(() => {
    setSkeletonNum(() => {
      const width = window.innerWidth;
      if (width >= 1920) return 16;
      else if (width >= 1280) return 12;
      else if (width >= 1024) return 10;
      else if (width >= 768) return 8;
      else return 4;
    });
  }, []);

  return (
    <div className="grid grid-flow-row gap-4 pt-20 lg:grid-cols-2 air:grid-cols-3 3xl:grid-cols-4">
      {[...Array(skeletonNum)].map((_, index) => (
        <SingleCardSkeleton key={index} />
      ))}
    </div>
  );
}
