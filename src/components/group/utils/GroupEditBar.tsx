import { Group } from '@/types';
import { useCheckedUsersStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import GroupDeleteModal from '@/components/modals/group/GroupDeleteModal';
import GroupAddModal from '@/components/modals/group/GroupAddModal';
import { useQueryClient } from '@tanstack/react-query';
import { useGroupList } from '@/hooks';

export function GroupEditBar({ curGroup }: { curGroup: Group }) {
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  const queryClient = useQueryClient();
  const groups = useGroupList().data;
  return (
    <div className="absolute right-[50px] top-[4px] flex flex-col items-center justify-center gap-1 md:right-[80px] md:top-[16px] md:flex-row md:gap-2">
      {checkedUsers.length > 0 && (
        <div className="flex flex-row gap-1 md:gap-2">
          <GroupDeleteModal curGroup={curGroup} />
          <GroupAddModal />
        </div>
      )}
      <div className="flex flex-row gap-1 md:gap-2">
        <Button
          className="h-5 gap-2 rounded-full border-2 border-darkblue bg-white
           px-2 py-1 text-xs text-darkblue hover:bg-gray-200 md:h-8 md:px-3 lg:text-xl"
          onClick={() => {
            if (checkedUsers.length !== curGroup.members.length) {
              // curGroup.members.map((member) => temp.push(member));
              setCheckedUsers(curGroup.members.slice());
            } else setCheckedUsers([]);
          }}
        >
          전체 선택
        </Button>
        <Button
          className="h-5 gap-2 rounded-full border-2 border-darkblue px-2
           text-xs text-white md:h-8 md:px-3 lg:text-xl"
          onClick={() => {
            if (!groups) return;
            queryClient.setQueryData(
              ['groupList'],
              groups.map((g) => {
                if (g.groupId === curGroup.groupId) return { ...curGroup, isInEdit: false };
                return g;
              }),
            );
          }}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
