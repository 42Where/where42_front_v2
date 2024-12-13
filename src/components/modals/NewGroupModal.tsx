import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGroupsStore } from '@/lib/stores';
import groupApi from '@/api/groupApi';
import Group from '@/types/Group';
import { useToast } from '@/components/ui/use-toast';
import { SearchedUser, User } from '@/types/User';
import SearchedCard from '@/components/cards/SearchedCard';
import XBtn from '@/components/buttons/XBtn';

export default function NewGroupModal() {
  const { groups, setGroups } = useGroupsStore();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupId, setGroupId] = useState<number>(0);
  const { toast } = useToast();

  function openHandler(open: boolean) {
    if (!open) {
      setTimeout(() => {
        setSelectedUsers([]);
        formRef.current?.reset();
        setSearchValue('');
        setIsAddingUser(false);
      }, 100);
    } else {
      setSelectedUsers([]);
      formRef.current?.reset();
      setSearchValue('');
    }
  }

  function addDuplicatedGroupClickHandler() {
    setSearchValue('');
    groupApi
      .createGroup({ groupName: searchValue })
      .then((res) => {
        const newGroup = {
          groupId: res.groupId,
          groupName: res.groupName,
          members: [],
          isFolded: false,
          isInEdit: false,
        } as Group;
        const temp = groups;
        temp.push(newGroup);
        setGroups(temp);
        setSelectedUsers([]);
      })
      .then(() => setIsDuplicated(false))
      .catch((error) => {
        console.error(error);
      });
  }

  function clickSearchedUserHandler(searchedMember: SearchedUser) {
    if (selectedUsers.some((selectedUser) => selectedUser.intraId === searchedMember.intraId)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.intraId !== searchedMember.intraId),
      );
    } else {
      setSelectedUsers([...selectedUsers, searchedMember]);
    }
  }

  function addClickHandler() {
    setIsAddingUser(false);
    groupApi
      .addMemberAtGroup({
        groupId,
        members: selectedUsers.map((user) => user.intraId),
      })
      .then(() => {
        toast({
          title: '그룹에 친구를 성공적으로 추가했습니다.',
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setGroups(
      groups.map((group) => {
        if (group.groupId === groupId) {
          return {
            ...group,
            members: [...group.members, ...selectedUsers],
          };
        }
        return group;
      }),
    );
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;
    formRef.current?.reset();
    if (groups.some((group) => group.groupName === inputValue)) {
      setIsDuplicated(true);
      return;
    }
    setSearchValue('');
    groupApi
      .createGroup({ groupName: inputValue })
      .then((res) => {
        const newGroup = {
          groupId: res.groupId,
          groupName: res.groupName,
          members: [],
          isFolded: false,
          isInEdit: false,
        } as Group;
        setGroupId(res.groupId);
        const temp = groups;
        temp.push(newGroup);
        setGroups(temp);
        setSelectedUsers([]);
      })
      .then(() =>
        toast({
          title: `'${inputValue}' 그룹이 생성되었습니다.`,
        }),
      )
      .then(() => setIsAddingUser(true))
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (groups[0]) setSearchedUsers(groups[0].members);
  }, [isAddingUser, groups]);

  useEffect(() => {
    if (groups[0]) {
      setSearchedUsers(groups[0].members.filter((user) => user.intraName.includes(searchValue)));
    }
  }, [searchValue, groups]);

  return (
    <Dialog onOpenChange={(open) => openHandler(open)}>
      <DialogTrigger>
        <Button
          className="text-l w-30 lg:w-30 h-8 gap-2 rounded-full
          border-2 border-darkblue bg-white  px-3 py-1 text-darkblue hover:bg-gray-200 lg:h-10 lg:text-xl"
        >
          <Image src="/image/newGroup.svg" alt="newGroup" width={20} height={20} />새 그룹
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] transition-all duration-500 ease-out">
        <DialogHeader className="flex w-full flex-col items-center justify-center gap-2">
          <AlertDialog open={isDuplicated}>
            <AlertDialogContent className="max-w-[425px] text-darkblue transition-all duration-500  ease-out">
              <AlertDialogHeader>
                <AlertDialogTitle>중복 그룹 확인</AlertDialogTitle>
                <AlertDialogDescription>
                  현재
                  <h3 style={{ display: 'inline', margin: '0' }}>
                    &quot; {searchValue}
                    &quot;{' '}
                  </h3>
                  그룹이 이미 존재합니다. 같은 이름의 그룹을 생성하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setSearchValue('');
                    setIsDuplicated(false);
                  }}
                >
                  취소
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => addDuplicatedGroupClickHandler()}>
                  계속 생성
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogTitle>새로운 그룹 생성</DialogTitle>
          {isAddingUser ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {selectedUsers.length > 0 && (
                <div className="flex w-[300px] flex-row gap-2 overflow-auto md:w-[700px]">
                  {selectedUsers.map((selectedUser) => (
                    <div
                      key={selectedUser.intraId}
                      className="flex flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 shadow-lg"
                    >
                      <p className="text-l  text-darkblue">{selectedUser.intraName}</p>
                      <XBtn
                        onClick={() => {
                          setSelectedUsers(
                            selectedUsers.filter((selected) => selected !== selectedUser),
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex w-full flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 shadow-lg">
                <Image src="/image/search.svg" width={20} height={20} alt="search" />
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="새 그룹에 추가할 친구를 검색하세요."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && (
                  <XBtn
                    onClick={() => {
                      formRef.current?.reset();
                      setSearchValue('');
                    }}
                  />
                )}
              </div>
              <div className="h-[300px] w-full overflow-auto rounded-md md:h-[500px]">
                <div className="grid grid-flow-row gap-2 md:grid-cols-2">
                  {searchedUsers?.map((searchedMember) => (
                    <SearchedCard
                      key={searchedMember.intraId}
                      member={searchedMember as SearchedUser}
                      onClick={() => clickSearchedUserHandler(searchedMember as SearchedUser)}
                      isAddingUser
                    />
                  ))}
                </div>
              </div>
              <Button
                className="text-l w-30 lg:w-30  h-8 gap-2 rounded-full hover:bg-gray-200 lg:h-10 lg:text-xl"
                onClick={() => addClickHandler()}
                variant="outline"
              >
                추가하기
              </Button>
            </div>
          ) : (
            <div className="flex w-full flex-row items-center gap-2  rounded-xl border border-gray-400 p-2 shadow-lg">
              <form
                className="flex w-full flex-row items-center gap-2"
                ref={formRef}
                onSubmit={async (e) => submitHandler(e)}
              >
                <input
                  ref={inputRef}
                  className="text-l w-full bg-transparent text-darkblue outline-none placeholder:text-gray-500  dark:text-gray-700"
                  placeholder="생성할 그룹의 이름을 입력하세요."
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
              {searchValue && (
                <XBtn
                  onClick={() => {
                    formRef.current?.reset();
                    setSearchValue('');
                  }}
                />
              )}
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
