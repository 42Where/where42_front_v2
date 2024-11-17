import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { SearchedUser } from "@/types/User";
import groupApi from "@/api/groupApi";
import {
  useUserStore,
  useAddedMembersStore,
  useGroupsStore,
} from "@/lib/stores";
import { useToast } from "@/components/ui/use-toast";

export default function FriendAddBtn({
  member,
  setIsAlreadyAdded,
}: {
  member: SearchedUser;
  setIsAlreadyAdded: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUserStore();
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { groups, setGroups } = useGroupsStore();
  const { toast } = useToast();

  return (
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
  );
}
