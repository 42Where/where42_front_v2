import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/User';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CardType } from '@/types/enums';

export default function ProfilePic({ user, type }: { user: User; type: CardType }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            className={`${type === 'searchedCard' && 'size-16 md:size-20'}
            ${type === 'myCard' && 'size-24 cursor-pointer lg:size-28'}
            ${type === 'userCard' && 'size-20 cursor-pointer md:size-28'}
            ${
              (user.location || user.inCluster) && 'border-basepink'
            } border-4 hover:border-[#bfb5ff]`}
            onClick={() => {
              if (type !== 'searchedCard') {
                window.open(`https://profile.intra.42.fr/users/${user.intraId}`);
              }
            }}
          >
            <AvatarImage src={user.image} />
            <AvatarFallback />
          </Avatar>
        </TooltipTrigger>
        {type !== 'searchedCard' && <TooltipContent>인트라 프로필 방문</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
