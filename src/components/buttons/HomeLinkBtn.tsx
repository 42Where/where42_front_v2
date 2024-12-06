import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export default function HomeLinkBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className="flex size-[38px] items-center justify-center rounded-lg p-1 hover:bg-gray-200 lg:size-[52px]"
          >
            <Image src="/image/home.svg" alt="home" width={40} height={40} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>홈페이지로 가기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
