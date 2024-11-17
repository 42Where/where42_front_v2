import { useState, useEffect } from "react";
import { SearchedUser } from "@/types/User";
import { useAddedMembersStore } from "@/lib/stores";
import LocationBtn from "@/components/buttons/LocationBtn";
import ProfilePic from "@/components/ProfilePic";
import FriendAddBtn from "@/components/buttons/FriendAddBtn";

export default function SearchedCard({
  member,
  onClick,
  isAddingUser,
}: {
  member: SearchedUser;
  onClick?: () => void;
  isAddingUser?: boolean;
}) {
  const { addedMembers } = useAddedMembersStore();
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  useEffect(() => {
    addedMembers.forEach((addedMember) => {
      if (addedMember === member.intraId) {
        setIsAlreadyAdded(true);
      }
    });
  }, [addedMembers]);

  return (
    <div
      className={`flex flex-row items-center justify-between rounded-2xl border-2 p-2 ${
        isAddingUser &&
        "transform cursor-pointer transition-transform hover:border-[#FFB5B5] active:scale-95"
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className="flex flex-row items-center gap-4 md:gap-4">
        <ProfilePic user={member} type="searchedCard" />
        <div className="flex flex-col items-start gap-1">
          <LocationBtn user={member} />
          <h2 className=" text-xl text-darkblue md:text-2xl">
            {member.intraName}
          </h2>
          <p className=" md:text-md text-sm ">{member.comment}</p>
        </div>
      </div>
      {!isAlreadyAdded && (
        <FriendAddBtn member={member} setIsAlreadyAdded={setIsAlreadyAdded} />
      )}
    </div>
  );
}
