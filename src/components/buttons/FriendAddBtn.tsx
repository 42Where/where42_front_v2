import Image from 'next/image';
import { SearchedUser } from '@/types/User';
import { useClusterStore } from '@/lib/stores';
import useMyInfo from '@/hooks/useMyInfo';
import { updateClusterUser } from '@/lib/clusterUtils';
import { ClusterName, RowName } from '@/types/Cluster';
import { useAddGroupMember } from '@/hooks/useMutateGroups';

export default function FriendAddBtn({
  member,
  isClusterView,
}: {
  member: SearchedUser;
  isClusterView?: boolean;
}) {
  const user = useMyInfo().data;
  const { clusters, setClusters } = useClusterStore();
  const { mutate } = useAddGroupMember();

  function clickHandler() {
    if (!user) return;
    mutate({
      members: [member],
      groupId: user.defaultGroupId,
    });

    if (isClusterView) {
      if (!member || !member.location) return;
      let userCluster;
      let userRow;
      let userSeat;
      if (member.location.length === 6) {
        userCluster = member.location.slice(0, 2) as ClusterName;
        userRow = member.location.slice(2, 4) as RowName;
        userSeat = member.location.slice(5, 6);
      } else if (member.location.length === 7) {
        userCluster = member.location.slice(0, 3) as ClusterName;
        userRow = member.location.slice(3, 5) as RowName;
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
