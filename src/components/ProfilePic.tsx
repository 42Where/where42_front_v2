import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import User from '@/types/User';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ProfilePicType = 'myProfile' | 'searchedCard' | 'userCard';

export default function ProfilePic({
  user,
  type,
}: {
  user: User;
  type: ProfilePicType;
}) {
  console.log('ProfilePic: ', user);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            className={`${type === 'searchedCard' && 'size-16 md:size-20'}
            ${type === 'myProfile' && 'size-24 lg:size-28'}
            ${type === 'userCard' && 'size-20 md:size-28'}
            ${
              user.inOrOut || user.location || user.inCluster
                ? 'border-[#FFB5B5]'
                : ''
            } border-4 hover:border-[#bfb5ff]`}
            onClick={() =>
              window.open(`https://profile.intra.42.fr/users/${user.intraId}`)
            }
          >
            <AvatarImage src={user.image} />
            <AvatarFallback />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p className='font-gsansMd text-[#4A6282] text-l lg:text-xl'>
            인트라 프로필 방문
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
