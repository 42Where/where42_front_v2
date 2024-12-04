import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';

export default function RepoLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="https://github.com/42Where">
            <Image
              src="image/logo/logoC.svg"
              alt="logo"
              width={120}
              height={120}
              className="
        w-[80px] md:w-[120px]"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>깃허브 레포지토리 방문</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
