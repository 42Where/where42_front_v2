import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AnnouncementType } from '@/types/Announcement';

export default function AnnouncementMenu({
  type,
  setType,
}: {
  type: string;
  setType: (type: AnnouncementType) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="cursor-pointer text-darkblue decoration-[#FFB5B5] hover:underline">
          종류: {type}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-80 w-40 overflow-auto rounded-none p-0" align="start">
        <DropdownMenuRadioGroup
          value={type}
          onValueChange={(val) => setType(val as AnnouncementType)}
          className="text-darkblue"
        >
          <DropdownMenuRadioItem value="기능 추가">기능 추가</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="버그 수정">버그 수정</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="UI/UX 개선">UI/UX 개선</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="공지사항">공지사항</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
