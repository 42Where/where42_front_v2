import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import admin from '@/assets/admin.svg';

export function AdminLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/admin"
            className="hidden size-[34px] items-center justify-center rounded-lg p-1 pt-2 hover:bg-gray-200 md:block lg:size-[52px]"
          >
            <Image src={admin} alt="admin" width={40} height={40} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>어드민 페이지로 가기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
