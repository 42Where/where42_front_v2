import { useState } from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProfilePic from '@/components/cards/ProfilePic';
import { FriendAddBtn, LocationBtn } from '@/components/buttons';
import { useMyInfo } from '@/hooks';
import { ActiveClusterUser, User } from '@/types';
import defaultUserImage from '@/assets/seats/defaultUserImage.png';
import seat from '@/assets/seats/seat.svg';

export default function SingleSeat({
  clusterUser,
  seatNumber,
}: {
  clusterUser?: ActiveClusterUser;
  seatNumber: number;
}) {
  const user = useMyInfo().data;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!clusterUser)
    return (
      <button
        type="button"
        className="flex h-10 w-9 cursor-default flex-col items-center justify-center gap-1 rounded-md md:size-14 2xl:size-20"
      >
        <Image
          src={seat}
          alt="seat"
          width={32}
          height={32}
          className="size-5 md:size-8 2xl:size-12"
        />
        <p className="text-[8px] md:text-xs 2xl:text-base">{seatNumber}</p>
      </button>
    );

  const isMySeat = user?.intraId === clusterUser.intraId;

  const userSchema: User = {
    intraId: clusterUser.intraId,
    intraName: clusterUser.intraName,
    image: clusterUser.image,
    location: `${clusterUser.cluster}r${clusterUser.row}s${clusterUser.seat}`,
    inCluster: true,
    comment: isMySeat ? '우주를 여행하는 당신의 영원한 친구' : '',
    agree: true,
    defaultGroupId: 0,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex h-10 w-9 cursor-default flex-col items-center justify-center gap-1 rounded-md md:size-14 2xl:size-20
            ${user && 'cursor-pointer hover:bg-secondary'}
            ${isMySeat && 'bg-basepink'}
            ${clusterUser?.isFriend ? 'bg-[#FFDDDD]' : 'bg-slate-300'}`}
        >
          <div className="relative h-full w-6 md:w-8 2xl:w-12">
            <Image
              src={isImageLoaded && clusterUser.image ? clusterUser.image : defaultUserImage}
              alt="seat"
              fill
              objectFit="cover"
              className="object-top"
              onLoadingComplete={() => setIsImageLoaded(true)}
            />
          </div>
          <p className="text-[8px] md:text-xs 2xl:text-base">{seatNumber}</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl p-2 md:p-4">
        <div className="flex flex-row items-center gap-4 md:gap-4">
          <ProfilePic user={userSchema} type="userCard" />
          <div className="flex flex-col items-start gap-1">
            <LocationBtn user={userSchema} />
            <h2 className="text-xl text-darkblue md:text-2xl 2xl:text-3xl">
              {userSchema.intraName}
            </h2>
            <p className="md:text-md text-sm text-baseblue">{userSchema.comment}</p>
          </div>
          {!clusterUser.isFriend && (
            <FriendAddBtn
              member={{
                ...userSchema,
                friend: clusterUser.isFriend,
                inOrOut: true,
              }}
              isClusterView
            />
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
