import Group from "@/types/Group";
import { useCheckedUsersStore, useGroupsStore } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import GroupDeleteModal from "@/components/modals/GroupDeleteModal";
import GroupAddModal from "@/components/modals/GroupAddModal";

export default function GroupEditBar({
  groups,
  curGroup,
}: {
  groups: Group[];
  curGroup: Group;
}) {
  const { setGroups } = useGroupsStore();
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  return (
    <div className="absolute right-[50px] top-[4px] flex flex-col items-center justify-center gap-1 md:right-[80px] md:top-[16px] md:flex-row md:gap-2">
      {checkedUsers.length > 0 && (
        <div className="flex flex-row gap-1 md:gap-2">
          <GroupDeleteModal curGroup={curGroup} />
          <GroupAddModal curGroup={curGroup} />
        </div>
      )}
      <div className="flex flex-row gap-1 md:gap-2">
        <Button
          className="text-l h-6 gap-2 rounded-full border-2 border-darkblue bg-white
           px-2 py-1 text-darkblue hover:bg-gray-200 md:h-8 md:px-3 lg:text-xl"
          onClick={() => {
            if (checkedUsers.length !== curGroup.members.length)
              // curGroup.members.map((member) => temp.push(member));
              setCheckedUsers(curGroup.members.slice());
            else setCheckedUsers([]);
          }}
        >
          전체 선택
        </Button>
        <Button
          className="text-l h-6 gap-2 rounded-full border-2 border-darkblue px-2
           text-white md:h-8 md:px-3 lg:text-xl"
          onClick={() => {
            setGroups(
              groups.map((g) => {
                if (g.groupId === curGroup.groupId) {
                  return { ...curGroup, isInEdit: false };
                } else return g;
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
