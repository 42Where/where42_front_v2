import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import groupApi from "@/api/groupApi";
import Group from "@/types/Group";
import {
  useCheckedUsersStore,
  useGroupsStore,
  useUserStore,
} from "@/lib/stores";

export default function GroupAddModal({ curGroup }: { curGroup: Group }) {
  const { user } = useUserStore();
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  const { groups, setGroups } = useGroupsStore();
  const [checkedGroups, setCheckedGroups] = React.useState<number[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-l border-darkblue text-darkblue h-6
          gap-2 rounded-full border-2 bg-white px-2 hover:bg-gray-200  md:h-8  md:px-3 lg:text-xl"
        >
          다른 그룹에 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="text-darkblue transition-all duration-500  ease-out">
        <DialogTitle>추가할 그룹을 선택하세요</DialogTitle>
        <div className="flex flex-col gap-2">
          {groups.map(
            (g) =>
              g.groupId !== user?.defaultGroupId && (
                <Button
                  key={g.groupId}
                  className={`rounded-2xl ${
                    checkedGroups.includes(g.groupId)
                      ? "bg-darkblue text-white hover:bg-gray-500"
                      : "border-darkblue text-darkblue border-2 bg-white hover:bg-gray-200"
                  } border-darkblue gap-2 border-0 px-3 py-1  text-xl`}
                  onClick={() => {
                    if (checkedGroups.includes(g.groupId)) {
                      setCheckedGroups(
                        checkedGroups.filter(
                          (groupId) => groupId !== g.groupId,
                        ),
                      );
                    } else {
                      setCheckedGroups([...checkedGroups, g.groupId]);
                    }
                  }}
                >
                  {g.groupName}
                </Button>
              ),
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div />
          <div className="flex flex-row gap-2">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  checkedGroups.forEach((groupId) => {
                    const temp = groups;
                    const myGroup = temp.find(
                      (g) => g.groupId === curGroup.groupId,
                    );
                    if (myGroup) {
                      myGroup.isInEdit = false;
                      setGroups(temp);
                    }
                    const tempGroup = temp.find((g) => g.groupId === groupId);
                    if (!tempGroup) return;
                    const targUsers = checkedUsers;
                    tempGroup.members.forEach((member) => {
                      checkedUsers.forEach((u) => {
                        if (u.intraId === member.intraId) {
                          targUsers.splice(targUsers.indexOf(u), 1);
                        }
                      });
                    });
                    const targUserIds = targUsers.map((u) => u.intraId);
                    groupApi
                      .addMemberAtGroup({ groupId, members: targUserIds })
                      .then(() => {
                        if (tempGroup?.members) {
                          tempGroup.members = [
                            ...tempGroup.members,
                            ...targUsers,
                          ];
                          setGroups(temp);
                          setCheckedUsers([]);
                        }
                      });
                  });
                }}
              >
                그룹에 추가
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-darkblue">취소</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
