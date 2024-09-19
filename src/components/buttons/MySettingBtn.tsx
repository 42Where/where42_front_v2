import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MySettingBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src='/image/setting.svg'
            alt='setting'
            width={60}
            height={60}
            className='rounded-lg hover:bg-gray-200 lg:size-[60px] size-[50px] cursor-pointer'
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            내 정보 설정
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
