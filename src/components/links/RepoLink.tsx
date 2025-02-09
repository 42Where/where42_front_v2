import Link from 'next/link';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import logoC from '@/assets/logo/logoC.svg';

export function RepoLink() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="https://github.com/42Where">
            <Image src={logoC} alt="logo" className="w-[80px] md:w-[120px]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>깃허브 레포지토리 방문</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
