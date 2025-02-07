import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export function SeatsLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/seats"
            className="flex justify-center rounded-lg p-1 first-line:items-center hover:bg-gray-200 lg:size-[52px]"
          >
            <Image src="/image/seats.svg" alt="seats" width={40} height={40} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>클러스터 자리 보기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
