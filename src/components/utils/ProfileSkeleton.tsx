import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-2 p-6 pt-2">
      <Skeleton className="size-16 rounded-full md:size-28" />
      <div className="space-y-2">
        <Skeleton className="h-[30px] w-[200px] md:w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
