import ProfileCard from '@/components/cards/ProfileCard';
import { useCheckedStore, useCheckedUsersStore } from '@/lib/stores';
import Group from '@/types/Group';

const dummyUser = {
  agree: true,
  comment: '십오글자십오글자십오글자십오글',
  intraId: '1234',
  intraName: 'RipVanWinkle',
  location: '개포 5층 6C 테라스',
  inCluster: true,
  defaultGroupId: 1,
};

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
        <ProfileCard
          user={dummyUser}
          isEdit={curGroup.isInEdit}
          isCheck={checkedUsers.includes(dummyUser)}
          group={curGroup}
        />
      </div>
      {(curGroup.members.length === 0 ||
        (checked && !curGroup.members.filter((member) => member.inCluster).length)) && (
        <p className="text-center text-xl">아무도 없어요.. 😢</p>
      )}
    </>
  );
}
