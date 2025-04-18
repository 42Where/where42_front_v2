import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CardType, User } from '@/types';
import defaultUserImage from '@/assets/seats/defaultUserImage.png';

export default function ProfilePic({ user, type }: { user: User; type: CardType }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            className={`${type === 'searchedCard' && 'size-16 md:size-20'}
            ${type === 'myCard' && 'size-20 cursor-pointer lg:size-28'}
            ${type === 'userCard' && 'size-16 cursor-pointer md:size-28'}
            ${
              (user.location || user.inCluster) && 'border-basepink'
            } border-4 hover:border-[#bfb5ff]`}
            onClick={() => {
              if (type !== 'searchedCard') {
                window.open(
                  `https://profile.intra.42.fr/users/${user.intraId}`,
                  '_blank',
                  'noopener,noreferrer', // for security reasons
                );
              }
            }}
          >
            <AvatarImage src={user.image} />
            <AvatarFallback>
              <Image src={defaultUserImage} alt="defaultUserImage" fill />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        {type !== 'searchedCard' && (
          <TooltipContent>
            <p className="text-baseblue">인트라 프로필 방문</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
