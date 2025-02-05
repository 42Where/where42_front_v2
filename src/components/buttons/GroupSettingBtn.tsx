import Group from '@/types/Group';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import pencil from '@/assets/pencil.svg';

export default function GroupSettingBtn({
  curGroup,
  groups,
}: {
  curGroup: Group;
  groups: Group[];
}) {
  return (
    !groups.find((group) => group.groupId === curGroup.groupId)?.isInEdit && (
      <DropdownMenuTrigger
        className="absolute right-[50px] top-[10px] flex size-7 items-center justify-center rounded-lg
      p-1 hover:bg-gray-200 md:right-[64px] md:top-[16px] md:size-10"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image src={pencil} alt="pencil" width={24} height={24} />
            </TooltipTrigger>
            <TooltipContent>그룹 설정</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
    )
  );
}
