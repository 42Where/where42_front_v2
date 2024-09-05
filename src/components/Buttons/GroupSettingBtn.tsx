import Group from '@/types/Group';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function GroupSettingBtn({
  curGroup,
  groups,
}: {
  curGroup: Group;
  groups: Group[];
}) {
  return !groups.find((group) => group.groupId === curGroup.groupId)
    ?.isInEdit ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='absolute size-10 rounded-lg flex justify-center items-center right-[50px] md:right-[64px] top-[8px] md:top-[16px] hover:bg-gray-200'>
            <Image
              src='/Icons/pencil.svg'
              alt='pencil'
              width={24}
              height={24}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            그룹 수정
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div />
  );
}
