import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LogoutBtn() {
  const router = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className='size-10 lg:size-14 rounded-lg flex justify-center items-center hover:bg-gray-200'
            role='button'
            tabIndex={0}
            onClick={() => {
              Cookies.remove('accessToken');
              Cookies.remove('refreshToken');
              router.push('/login');
            }}
          >
            <Image
              src='/Icons/signOut.svg'
              alt='search'
              width={40}
              height={40}
              className='rounded-lg hover:bg-gray-200 lg:size-[40px] size-[30px]'
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            로그아웃
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
