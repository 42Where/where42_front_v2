import React from "react";
import { X } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import groupApi from "@/api/groupApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useGroupsStore, useUserStore } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import Group from "@/types/Group";
import { useToast } from "@/components/ui/use-toast";
import GroupSettingBtn from "@/components/buttons/GroupSettingBtn";

export default function GroupSettingModal({ curGroup }: { curGroup: Group }) {
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const { groups, setGroups } = useGroupsStore();
  const defalutGroupId = useUserStore((state) => state.user?.defaultGroupId);
  const [resultMessage, setResultMessage] = React.useState<string>("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [groupName, setGroupName] = React.useState<string>("");
  const { toast } = useToast();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setResultMessage("");
            formRef.current?.reset();
            setGroupName("");
          }, 100);
        } else {
          setResultMessage("");
          formRef.current?.reset();
          setGroupName("");
        }
      }}
    >
      <DropdownMenu>
        <GroupSettingBtn groups={groups} curGroup={curGroup} />
        <DropdownMenuContent side="bottom" className=" min-w-50 text-[#132743]">
          {curGroup.members.length > 0 && (
            <DropdownMenuItem
              className="text-xl"
              onClick={() => {
                const temp = groups;
                const tempGroup = temp.find(
                  (group) => group.groupId === curGroup.groupId,
                );
                if (tempGroup) {
                  tempGroup.isInEdit = true;
                  temp.map((group) => {
                    const buf = group;
                    if (buf.groupId !== curGroup.groupId) buf.isInEdit = false;
                    return buf;
                  });
                  setGroups(temp);
                }
              }}
            >
              그룹 수정
            </DropdownMenuItem>
          )}
          {defalutGroupId !== curGroup.groupId && (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="text-xl"
                  onClick={() => setIsDelete(false)}
                >
                  그룹명 수정
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="text-xl text-red-700"
                  onClick={() => setIsDelete(true)}
                >
                  그룹 삭제
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[425px] text-[#132743] transition-all duration-500  ease-out">
        {isDelete ? (
          <>
            <DialogTitle>그룹 삭제</DialogTitle>
            <span className=" inline">
              <h3 style={{ display: "inline", margin: "0" }}>
                &quot;{" "}
                {
                  groups.find((group) => group.groupId === curGroup.groupId)
                    ?.groupName
                }
                &quot;{" "}
              </h3>
              그룹을 삭제하시겠습니까?
            </span>
            <div className="flex flex-row items-center justify-between">
              <div />
              <div className="flex flex-row gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    groupApi
                      .removeGroup({ groupId: curGroup.groupId })
                      .then(() => {
                        const temp = groups.filter(
                          (group) => group.groupId !== curGroup.groupId,
                        );
                        setGroups(temp);
                      })
                      .then(() =>
                        toast({
                          title: `'${curGroup.groupName}' 그룹이 삭제되었습니다.`,
                        }),
                      );
                  }}
                >
                  삭제
                </Button>
                <DialogClose asChild>
                  <Button className="bg-[#132743]">취소</Button>
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  const inputValue = inputRef.current?.value;
                  if (!inputValue) return;
                  formRef.current?.reset();
                  setGroupName("");
                  setResultMessage("설정 되었습니다.");
                  groupApi
                    .renameGroup({
                      groupId: curGroup.groupId,
                      groupName: inputValue,
                    })
                    .then(() => {
                      const temp = groups;
                      const tempGroup = temp.find(
                        (group) => group.groupId === curGroup.groupId,
                      );
                      if (tempGroup) tempGroup.groupName = inputValue;
                      setGroups(temp);
                    })
                    .catch((error) => {
                      console.error(error);
                      setResultMessage(
                        "설정 중 오류가 발생했습니다. 다시 시도해 주세요.",
                      );
                    });
                }}
              >
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-[#132743] outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="새로운 그룹명을 입력해주세요"
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </form>
              {groupName && (
                <X
                  className="size-6"
                  onClick={() => {
                    formRef.current?.reset();
                    setGroupName("");
                  }}
                />
              )}
            </div>
            <p className="text-l  text-[#132743]">{resultMessage}</p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
