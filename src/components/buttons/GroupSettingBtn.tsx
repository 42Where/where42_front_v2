import Group from "@/types/Group";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function GroupSettingBtn({
  curGroup,
  groups,
}: {
  curGroup: Group;
  groups: Group[];
}) {
  return !groups.find((group) => group.groupId === curGroup.groupId)
    ?.isInEdit ? (
    <DropdownMenuTrigger className="absolute right-[50px] top-[8px] flex size-10 items-center justify-center rounded-lg hover:bg-gray-200 md:right-[64px] md:top-[16px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Image
              src="/image/pencil.svg"
              alt="pencil"
              width={24}
              height={24}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-l lg:text-xl">그룹 설정</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DropdownMenuTrigger>
  ) : null;
}
