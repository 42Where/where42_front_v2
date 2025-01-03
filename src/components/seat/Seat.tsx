import Image from 'next/image';
import { ActiveClusterUser } from '@/types/Cluster';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocationBtn from '@/components/buttons/LocationBtn';
import ProfilePic from '@/components/ProfilePic';
import FriendAddBtn from '@/components/buttons/FriendAddBtn';
import { User } from '@/types/User';

export default function SingleSeat({
  user,
  seatNumber,
}: {
  user?: ActiveClusterUser;
  seatNumber: number;
}) {
  if (!user)
    return (
      <button
        type="button"
        className="flex h-10 w-9 cursor-default flex-col items-center justify-center gap-1 rounded-md md:size-14"
      >
        <Image
          src="/image/seats/seat.svg"
          alt="seat"
          width={32}
          height={32}
          className="size-5 md:size-8"
        />
        <p className="text-[8px] md:text-xs">{seatNumber}</p>
      </button>
    );

  const dummyUser: User = {
    intraId: user.intraId,
    intraName: user.intraName,
    image: user.image,
    location: `${user.cluster}r${user.row}s${user.seat}`,
    inCluster: true,
    comment: '',
    agree: true,
    defaultGroupId: 0,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex h-10 w-9 cursor-default flex-col items-center justify-center gap-1 rounded-md md:size-14
            ${user && 'cursor-pointer hover:bg-secondary'}
            ${user?.isFriend ? 'bg-[#FFDDDD]' : 'bg-slate-300'}`}
        >
          <div className="relative h-full w-6 md:w-8">
            <Image
              src={user.image || '/image/seats/defaultUserImage.svg'}
              alt="seat"
              fill
              objectFit="cover"
              className="object-top"
            />
          </div>
          <p className="text-[8px] md:text-xs">{seatNumber}</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl p-2 md:p-4">
        <div className="flex flex-row items-center gap-4 md:gap-4">
          <ProfilePic user={dummyUser} type="searchedCard" />
          <div className="flex flex-col items-start gap-1">
            <LocationBtn user={dummyUser} />
            <h2 className=" text-xl text-darkblue md:text-2xl">{dummyUser.intraName}</h2>
            <p className=" md:text-md text-sm ">{dummyUser.comment}</p>
          </div>
          {!user.isFriend && (
            <FriendAddBtn
              member={{
                ...dummyUser,
                friend: user.isFriend,
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
