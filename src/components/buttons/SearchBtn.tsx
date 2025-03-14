import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import search from '@/assets/search.svg';

export function SearchBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex size-[34px] items-center justify-center rounded-lg hover:bg-gray-200 lg:size-14">
            <Image
              src={search}
              alt="search"
              width={40}
              height={40}
              className="size-[30px] rounded-lg hover:bg-gray-200 lg:size-[40px]"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>유저 검색</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
