import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import megaphone from '@/assets/megaphone/megaphone.svg';
import megaphoneActive from '@/assets/megaphone/megaphoneActive.svg';

export function AnnouncementBtn({ isOpen }: { isOpen: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src={isOpen ? megaphoneActive : megaphone}
            alt="announcement"
            width={34}
            height={34}
            className="size-[34px] rounded-lg hover:bg-gray-200 lg:size-[52px]"
          />
        </TooltipTrigger>
        <TooltipContent>공지사항</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
