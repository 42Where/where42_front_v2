import React from "react";
import Image from "next/image";
import { SearchedUser } from "@/types/User";
import groupApi from "@/api/groupApi";
import {
  useUserStore,
  useAddedMembersStore,
  useGroupsStore,
} from "@/lib/stores";
import LocationBtn from "@/components/buttons/LocationBtn";
import { useToast } from "@/components/ui/use-toast";
import ProfilePic from "@/components/ProfilePic";

export default function SearchedCard({
  member,
  onClick,
  isAddingUser,
}: {
  member: SearchedUser;
  onClick?: () => void;
  isAddingUser?: boolean;
}) {
  const { user } = useUserStore();
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { groups, setGroups } = useGroupsStore();
  const [isAlreadyAdded, setIsAlreadyAdded] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
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
      {isAlreadyAdded ? null : (
        <div
          className="right-[110px] flex size-14 items-center justify-center rounded-lg hover:bg-gray-200"
          role="button"
          tabIndex={0}
          onClick={() => {
            setAddedMembers([...addedMembers, member.intraId]);
            const updatedGroups = groups.map((group) => {
              if (group.groupId === user?.defaultGroupId) {
                return {
                  ...group,
                  members: [...group.members, member],
                };
              }
              return group;
            });
            setGroups(updatedGroups);
            setIsAlreadyAdded(true);
            groupApi
              .addMemberAtGroup({
                groupId: user?.defaultGroupId as number,
                members: [member.intraId],
              })
              .then(() => {
                toast({
                  title: `'${member.intraName}'님을 친구 목록에 추가했습니다.`,
                });
              });
          }}
        >
          <Image
            src="/image/user/userAdd.svg"
            alt="userAdd"
            width={30}
            height={30}
            className="hover:bg-gray-200"
          />
        </div>
      )}
    </div>
  );
}
