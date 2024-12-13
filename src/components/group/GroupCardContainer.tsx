import ProfileCard from '@/components/cards/ProfileCard';
import { useCheckedStore, useCheckedUsersStore } from '@/lib/stores';
import Group from '@/types/Group';

export default function GroupCardContainer({ curGroup }: { curGroup: Group }) {
  const { checked } = useCheckedStore();
  const { checkedUsers } = useCheckedUsersStore();

  return (
    <>
      <div className="4xl:grid-cols-4 grid grid-flow-row border-t md:gap-4 md:border-0 lg:grid-cols-2 air:grid-cols-3">
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
        (checked && !curGroup.members.filter((member) => member.inCluster).length)) && (
        <p className="p-6 text-center md:text-xl">아무도 없어요.. 😢</p>
      )}
    </>
  );
}
