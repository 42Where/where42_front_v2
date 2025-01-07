import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export default function ClusterLinkBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/cluster"
            className="flex size-[38px] items-center justify-center rounded-lg p-[2px] hover:bg-gray-200 md:block lg:size-[52px]"
          >
            <Image src="/image/seats/cluster.svg" alt="cluster" width={50} height={50} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>클러스터 현황 보기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
