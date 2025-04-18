import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { GroupSettingBtn } from '@/components/buttons';
import { useGroupList, useMyInfo } from '@/hooks';
import { Group } from '@/types';
import { GroupRenameContent, GroupDeleteContent } from './contents';

export default function GroupSettingModal({ curGroup }: { curGroup: Group }) {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const defaultGroupId = useMyInfo().data?.defaultGroupId;
  const groups = useGroupList().data;
  const queryClient = useQueryClient();

  function editClickHandler() {
    if (!groups) return;
    const groupBuffer = groups.map((g) => {
      if (g.groupId === curGroup.groupId) return { ...curGroup, isInEdit: true };
      return { ...g, isInEdit: false };
    });
    queryClient.setQueryData(['groupList'], {
      defaultGroup: groupBuffer[groupBuffer.length - 1],
      groups: groupBuffer.slice(0, -1),
    });
  }

  if (!defaultGroupId || !groups) return null;
  return (
    <Dialog>
      <DropdownMenu>
        <GroupSettingBtn groups={groups} curGroup={curGroup} />
        <DropdownMenuContent side="bottom" className="min-w-50 text-darkblue">
          {curGroup.members.length > 0 && (
            <DropdownMenuItem className="md:text-xl" onClick={() => editClickHandler()}>
              그룹 수정
            </DropdownMenuItem>
          )}
          {defaultGroupId !== curGroup.groupId && (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem className="md:text-xl" onClick={() => setIsDelete(false)}>
                  그룹명 수정
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-700 md:text-xl"
                  onClick={() => setIsDelete(true)}
                >
                  그룹 삭제
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[425px] text-darkblue transition-all duration-500  ease-out">
        {isDelete && <GroupDeleteContent groups={groups} curGroup={curGroup} />}
        {!isDelete && (
          <GroupRenameContent
            curGroup={curGroup}
            groupName={groupName}
            setGroupName={setGroupName}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
