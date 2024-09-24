import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Divider from "@/components/utils/Divider";
import ProfileCard from "@/components/cards/ProfileCard";
import Group from "@/types/Group";
import {
  useCheckedStore,
  useCheckedUsersStore,
  useGroupsStore,
} from "@/lib/stores";
import GroupSettingModal from "./modals/GroupSettingModal";
import { Button } from "./ui/button";
import GroupDeleteModal from "./modals/GroupDeleteModal";
import GroupAddModal from "./modals/GroupAddModal";
import CardSkeleton from "./utils/CardSkeleton";

export default function Groups({ groups }: { groups: Group[] }) {
  const { setGroups } = useGroupsStore();
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  const { checked } = useCheckedStore();
  const sortedGroups = [...groups].sort((a, b) => a.groupId - b.groupId);
  const defaultValues = sortedGroups.map((group) => group.groupId.toString());
  return (
    <div>
      <Divider />
      {!sortedGroups.length && !defaultValues.length ? (
        <CardSkeleton />
      ) : (
        <Accordion type="multiple" defaultValue={defaultValues}>
          {sortedGroups.map((group) => (
            <AccordionItem
              key={group.groupId}
              value={group.groupId.toString()}
              className="relative overflow-hidden transition-all duration-500 ease-in-out"
            >
              {group.isInEdit && (
                <div className="absolute right-[50px] top-[4px] flex flex-col items-center justify-center gap-1 border md:right-[80px] md:top-[16px] md:flex-row md:gap-2">
                  {checkedUsers.length > 0 && (
                    <div className="flex flex-row gap-1 md:gap-2">
                      <GroupDeleteModal curGroup={group} />
                      <GroupAddModal curGroup={group} />
                    </div>
                  )}
                  <div className="flex flex-row gap-1 md:gap-2">
                    <Button
                      className="text-l border-darkblue text-darkblue h-6
                gap-2 rounded-full border-2 bg-white px-2 py-1
                hover:bg-gray-200  md:h-8  md:px-3 lg:text-xl"
                      onClick={() => {
                        const temp = checkedUsers;
                        if (temp.length === group.members.length) {
                          temp.splice(0, temp.length);
                          setCheckedUsers(temp);
                        } else {
                          temp.splice(0, temp.length);
                          group.members.map((member) => temp.push(member));
                          setCheckedUsers(temp);
                        }
                      }}
                    >
                      전체 선택
                    </Button>
                    <Button
                      className="text-l border-darkblue h-6
                gap-2 rounded-full border-2 px-2 text-white md:h-8 md:px-3
               lg:text-xl"
                      onClick={() => {
                        const temp = groups;
                        const myGroup = temp.find(
                          (g) => g.groupId === group.groupId,
                        );
                        if (myGroup) {
                          myGroup.isInEdit = false;
                          setGroups(temp);
                        }
                      }}
                    >
                      완료
                    </Button>
                  </div>
                </div>
              )}
              <GroupSettingModal curGroup={group} />
              <AccordionTrigger className="text-l text-darkblue p-2 px-6 md:p-4  md:text-2xl">
                <span className="flex flex-row items-center justify-start gap-6">
                  {group.groupName}
                  <p className="text-xl md:text-2xl">
                    {
                      group.members.filter(
                        (member) => member.location || member.inCluster,
                      ).length
                    }
                    /{group.members.length}
                  </p>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-flow-row gap-4 lg:grid-cols-2 air:grid-cols-3 3xl:grid-cols-4">
                  {checked
                    ? group.members.map(
                        (member) =>
                          (member.inCluster || member.location) && (
                            <ProfileCard
                              key={member.intraId}
                              user={member}
                              isEdit={group.isInEdit}
                              isCheck={checkedUsers.includes(member)}
                              group={group}
                            />
                          ),
                      )
                    : group.members.map((member) => (
                        <ProfileCard
                          key={member.intraId}
                          user={member}
                          isEdit={group.isInEdit}
                          isCheck={checkedUsers.includes(member)}
                          group={group}
                        />
                      ))}
                </div>
                {group.members.length === 0 ? (
                  <p className="text-center text-xl  ">아무도 없어요.. 😢</p>
                ) : (
                  checked &&
                  group.members.filter(
                    (member) => member.location || member.inCluster,
                  ).length === 0 && (
                    <p className="text-center text-xl  ">아무도 없어요.. 😢</p>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
