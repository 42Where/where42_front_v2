import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function MySettingBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src="/image/setting.svg"
            alt="setting"
            width={60}
            height={60}
            className="size-[40px] cursor-pointer rounded-lg hover:bg-gray-200 lg:size-[60px]"
          />
        </TooltipTrigger>
        <TooltipContent>내 정보 설정</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
