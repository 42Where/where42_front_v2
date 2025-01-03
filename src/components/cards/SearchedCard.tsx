import { SearchedUser } from '@/types/User';
import { useAddedMembersStore } from '@/lib/stores';
import LocationBtn from '@/components/buttons/LocationBtn';
import ProfilePic from '@/components/ProfilePic';
import FriendAddBtn from '@/components/buttons/FriendAddBtn';

export default function SearchedCard({
  member,
  onClick,
  isAddingUser,
  isAlreadyAdded,
}: {
  member: SearchedUser;
  onClick?: () => void;
  isAddingUser?: boolean;
  isAlreadyAdded?: boolean;
}) {
  const { addedMembers } = useAddedMembersStore();
  return (
    <button
      type="button"
      className={`flex cursor-default flex-row items-center justify-between rounded-2xl border-2 p-2 ${
        isAddingUser &&
        `hover:border-basepink transform cursor-pointer transition-transform active:scale-95 ${isAlreadyAdded && 'border-basepink'}`
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className="flex flex-row items-center gap-4 md:gap-4">
        <ProfilePic user={member} type="searchedCard" />
        <div className="flex flex-col items-start gap-1">
          <LocationBtn user={member} />
          <h2 className=" text-xl text-darkblue md:text-2xl">{member.intraName}</h2>
          <p className=" md:text-md text-sm ">{member.comment}</p>
        </div>
      </div>
      {!addedMembers.find((a) => a === member.intraId) && <FriendAddBtn member={member} />}
    </button>
  );
}
