import { Button } from '../ui/button';
import React from 'react';
import { User, SearchedUser } from '@/types/User';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LocationBtn({
  user,
  isMyProfile,
}: {
  user: SearchedUser | User;
  isMyProfile?: boolean;
}) {
  const [location, setLocation] = React.useState<string>('');
  React.useEffect(() => {
    if ('location' in user && user.location) {
      setLocation(user.location);
    } else if (
      ('inCluster' in user && user.inCluster) ||
      ('inOrOut' in user && user.inOrOut)
    ) {
      setLocation('개포');
    } else {
      setLocation('퇴근');
    }
  }, [user]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`rounded-full
            ${!isMyProfile && 'cursor-default'}
            ${
              location !== '퇴근'
                ? 'bg-[#132743]'
                : 'bg-white hover:bg-white text-[#132743] border-2 border-[#132743]'
            } h-6 md:h-8 px-2 md:px-3 md:text-xl font-gsansMd`}
          >
            {location}
          </Button>
        </TooltipTrigger>
        {isMyProfile && (
          <TooltipContent>
            <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
              내 위치 변경
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
