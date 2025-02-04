import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Group from '@/types/Group';
import GroupSettingModal from '@/components/modals/GroupSettingModal';
import GroupEditBar from '@/components/group/GroupEditBar';
import GroupHeadCount from '@/components/group/GroupHeadCount';
import GroupCardContainer from '@/components/group/GroupCardContainer';

export default function Groups({ groups }: { groups: Group[] }) {
  const defaultValues = groups.map((group) => group.groupId.toString());

  return (
    <Accordion type="multiple" defaultValue={defaultValues}>
      {groups.map((curGroup) => (
        <AccordionItem
          key={curGroup.groupId}
          value={curGroup.groupId.toString()}
          className="relative overflow-hidden transition-all duration-500 ease-in-out"
        >
          {curGroup.isInEdit && <GroupEditBar curGroup={curGroup} />}
          <GroupSettingModal curGroup={curGroup} />
          <AccordionTrigger className="p-1 text-darkblue md:p-4 md:text-2xl">
            <GroupHeadCount curGroup={curGroup} />
          </AccordionTrigger>
          <AccordionContent className="pb-0 md:pb-4">
            <GroupCardContainer curGroup={curGroup} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
