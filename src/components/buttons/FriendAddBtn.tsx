import Image from 'next/image';
import { SearchedUser } from '@/types/User';
import groupApi from '@/api/groupApi';
import { useUserStore, useAddedMembersStore, useGroupsStore, useClusterStore } from '@/lib/stores';
import { updateClusterUser } from '@/lib/clusterUtils';
import { useToast } from '@/components/ui/use-toast';
import { ClusterName, RowName } from '@/types/Cluster';

export default function FriendAddBtn({
  member,
  isClusterView,
}: {
  member: SearchedUser;
  isClusterView?: boolean;
}) {
  const { user } = useUserStore();
  const { addedMembers, setAddedMembers } = useAddedMembersStore();
  const { groups, setGroups } = useGroupsStore();
  const { toast } = useToast();
  const { clusters, setClusters } = useClusterStore();

  function clickHandler() {
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
    if (isClusterView) {
      if (!member || !member.location) return;
      let userCluster;
      let userRow;
      let userSeat;
      if (member.location.length === 6) {
        userCluster = member.location.slice(0, 2) as ClusterName;
        userRow = String(member.location.slice(2, 4)) as RowName;
        userSeat = member.location.slice(5, 6);
      } else if (member.location.length === 7) {
        userCluster = member.location.slice(0, 3) as ClusterName;
        userRow = String(member.location.slice(3, 5)) as RowName;
        userSeat = member.location.slice(6, 7);
      } else throw new Error('Invalid location');
      setClusters(
        updateClusterUser(clusters, userCluster, userRow, Number(userSeat), {
          intraId: member.intraId,
          intraName: member.intraName,
          image: member.image,
          cluster: userCluster,
          row: Number(userRow[1]),
          seat: Number(userSeat),
          isFriend: true,
        }),
      );
    }
  }

  return (
    <button
      type="submit"
      className="right-[110px] flex size-14 items-center justify-center rounded-lg hover:bg-gray-200"
      onClick={clickHandler}
    >
      <Image
        src="/image/user/userAdd.svg"
        alt="userAdd"
        width={30}
        height={30}
        className="hover:bg-gray-200"
      />
    </button>
  );
}
