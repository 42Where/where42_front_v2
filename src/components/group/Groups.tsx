import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Divider from "@/components/utils/Divider";
import Group from "@/types/Group";
import GroupSettingModal from "@/components/modals/GroupSettingModal";
import CardSkeleton from "@/components/utils/CardSkeleton";
import GroupEditBar from "@/components/group/GroupEditBar";
import GroupHeadCount from "@/components/group/GroupHeadCount";
import { useState } from "react";
import GroupCardContainer from "@/components/group/GroupCardContainer";

export default function Groups({ groups }: { groups: Group[] }) {
  // TODO: 소티드 그룹 로직 개선, 출근 토글시 블로킹인지 무거운 작업인지 멈칫 함 -> 확인할 것
  const [sortedGroups, setSortedGroups] = useState(
    [...groups].sort((a, b) => a.groupId - b.groupId),
  );
  const defaultGroup = sortedGroups.find(
    (group) => group.groupName === "친구 목록",
  );
  if (defaultGroup) {
    sortedGroups.splice(sortedGroups.indexOf(defaultGroup), 1);
    sortedGroups.push(defaultGroup);
  }
  const defaultValues = sortedGroups.map((group) => group.groupId.toString());

  return (
    <>
      <Divider />
      {!sortedGroups.length && !defaultValues.length ? (
        <CardSkeleton />
      ) : (
        <Accordion type="multiple" defaultValue={defaultValues}>
          {sortedGroups.map((curGroup) => (
            <AccordionItem
              key={curGroup.groupId}
              value={curGroup.groupId.toString()}
              className="relative overflow-hidden transition-all duration-500 ease-in-out"
            >
              {curGroup.isInEdit && (
                <GroupEditBar groups={groups} curGroup={curGroup} />
              )}
              <GroupSettingModal curGroup={curGroup} />
              <AccordionTrigger className="text-l p-2 text-darkblue md:p-4 md:text-2xl">
                <GroupHeadCount curGroup={curGroup} />
              </AccordionTrigger>
              <AccordionContent>
                <GroupCardContainer curGroup={curGroup} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}
