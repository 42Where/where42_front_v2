import { useState, useRef, FormEvent } from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import groupApi from '@/api/groupApi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useGroupsStore, useUserStore } from '@/lib/stores';
import { Button } from '@/components/ui/button';
import Group from '@/types/Group';
import { useToast } from '@/components/ui/use-toast';
import GroupSettingBtn from '@/components/buttons/GroupSettingBtn';
import XBtn from '@/components/buttons/XBtn';

export default function GroupSettingModal({ curGroup }: { curGroup: Group }) {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { groups, setGroups } = useGroupsStore();
  const defalutGroupId = useUserStore((state) => state.user?.defaultGroupId);
  const [resultMessage, setResultMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [groupName, setGroupName] = useState<string>('');
  const { toast } = useToast();

  function editClickHandler() {
    const temp = [...groups];
    const tempGroup = temp.find((group) => group.groupId === curGroup.groupId);
    if (tempGroup) {
      tempGroup.isInEdit = true;
      temp.map((group) => {
        const buf = group;
        if (buf.groupId !== curGroup.groupId) buf.isInEdit = false;
        return buf;
      });
      setGroups(temp);
    }
  }
  function openHandler(open: boolean) {
    if (!open) {
      setTimeout(() => {
        setResultMessage('');
        formRef.current?.reset();
        setGroupName('');
      }, 100);
    } else {
      setResultMessage('');
      formRef.current?.reset();
      setGroupName('');
    }
  }
  function deleteClickHandler() {
    groupApi
      .removeGroup({ groupId: curGroup.groupId })
      .then(() => {
        const temp = groups.filter((group) => group.groupId !== curGroup.groupId);
        setGroups(temp);
      })
      .then(() =>
        toast({
          title: `'${curGroup.groupName}' 그룹이 삭제되었습니다.`,
        }),
      );
  }
  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;
    formRef.current?.reset();
    setGroupName('');
    setResultMessage('설정 되었습니다.');
    groupApi
      .renameGroup({
        groupId: curGroup.groupId,
        groupName: inputValue,
      })
      .then(() => {
        const temp = [...groups];
        const tempGroup = temp.find((group) => group.groupId === curGroup.groupId);
        if (tempGroup) tempGroup.groupName = inputValue;
        setGroups(temp);
      })
      .catch((error) => {
        console.error(error);
        setResultMessage('설정 중 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  }

  // TODO: 50줄 이내로 줄일것
  return (
    <Dialog onOpenChange={(open) => openHandler(open)}>
      <DropdownMenu>
        <GroupSettingBtn groups={groups} curGroup={curGroup} />
        <DropdownMenuContent side="bottom" className="min-w-50 text-darkblue">
          {curGroup.members.length > 0 && (
            <DropdownMenuItem className="md:text-xl" onClick={() => editClickHandler()}>
              그룹 수정
            </DropdownMenuItem>
          )}
          {defalutGroupId !== curGroup.groupId && (
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
        {isDelete ? (
          <>
            <DialogTitle>그룹 삭제</DialogTitle>
            <span className=" inline">
              <h3 style={{ display: 'inline', margin: '0' }}>
                &quot; {groups.find((group) => group.groupId === curGroup.groupId)?.groupName}
                &quot;{' '}
              </h3>
              그룹을 삭제하시겠습니까?
            </span>
            <div className="flex flex-row items-center justify-between">
              <div />
              <div className="flex flex-row gap-2">
                <Button variant="destructive" onClick={() => deleteClickHandler()}>
                  삭제
                </Button>
                <DialogClose asChild>
                  <Button className="bg-darkblue">취소</Button>
                </DialogClose>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogTitle>그룹명 수정</DialogTitle>
            <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
              <form
                className="flex w-full flex-row items-center gap-2"
                ref={formRef}
                onSubmit={async (e) => submitHandler(e)}
              >
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="새로운 그룹명을 입력해주세요"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </form>
              {groupName && (
                <XBtn
                  onClick={() => {
                    formRef.current?.reset();
                    setGroupName('');
                  }}
                />
              )}
            </div>
            <p className="text-l  text-darkblue">{resultMessage}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
