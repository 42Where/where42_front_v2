import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

export default function AdminLinkBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/admin"
            className="hidden size-[38px] items-center justify-center rounded-lg p-1 hover:bg-gray-200 md:block lg:size-[52px]"
          >
            <Image src="/image/admin.svg" alt="admin" width={40} height={40} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>어드민 페이지로 가기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
