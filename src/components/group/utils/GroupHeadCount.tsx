import { Group } from '@/types';

export function GroupHeadCount({ curGroup }: { curGroup: Group }) {
  return (
    <span className="flex flex-row items-center justify-start gap-6">
      {curGroup.groupName}
      <p className="md:text-2xl">
        {curGroup.members.filter((member) => member.location || member.inCluster).length}/
        {curGroup.members.length}
      </p>
    </span>
  );
}
