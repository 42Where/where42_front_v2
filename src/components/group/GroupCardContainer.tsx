import ProfileCard from '@/components/cards/ProfileCard';
import { useCheckedStore, useCheckedUsersStore } from '@/lib/stores';
import Group from '@/types/Group';

export default function GroupCardContainer({ curGroup }: { curGroup: Group }) {
  const { checked } = useCheckedStore();
  const { checkedUsers } = useCheckedUsersStore();

  return (
    <>
      <div className="grid grid-flow-row gap-4 lg:grid-cols-2 air:grid-cols-3 3xl:grid-cols-4">
        {curGroup.members.map(
          (member) =>
            (!checked || member.inCluster) && (
              <ProfileCard
                key={member.intraId}
                user={member}
                isEdit={curGroup.isInEdit}
                isCheck={checkedUsers.includes(member)}
                group={curGroup}
              />
            ),
        )}
      </div>
      {(curGroup.members.length === 0 ||
        (checked &&
          !curGroup.members.filter((member) => member.inCluster).length)) && (
          <p className="text-center text-xl">아무도 없어요.. 😢</p>
      )}
    </>
  );
}
