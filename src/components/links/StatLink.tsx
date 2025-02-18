import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import stats from '@/assets/stats.svg';

export function StatLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/stat"
            className="flex size-[34px] items-center justify-center rounded-lg p-1 hover:bg-gray-200 lg:size-[52px]"
          >
            <Image src={stats} alt="stat" width={40} height={40} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>통계 페이지로 가기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
