import React, { useEffect } from 'react';
import { X } from 'lucide-react';
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
import User from '@/types/User';
import SearchedCard from '@/components/Cards/SearchedCard';

export default function NewGroupModal() {
  const { groups, setGroups } = useGroupsStore();
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isDuplicated, setIsDuplicated] = React.useState<boolean>(false);
  const [isAddingUser, setIsAddingUser] = React.useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = React.useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [groupId, setGroupId] = React.useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (groups[0]) setSearchedUsers(groups[0].members);
  }, [isAddingUser, groups]);

  useEffect(() => {
    if (groups[0])
      setSearchedUsers(
        groups[0].members.filter((user) => user.intraName.includes(searchValue))
      );
  }, [searchValue]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setSelectedUsers([]);
            formRef.current?.reset();
            setSearchValue('');
            console.log('CLOSED', selectedUsers);
          }, 100);
        } else {
          setSelectedUsers([]);
          formRef.current?.reset();
          setSearchValue('');
          console.log('OPEN', selectedUsers);
        }
      }}
    >
      <DialogTrigger>
        <Button
          className='rounded-full bg-white border-2 border-[#132743] py-1 px-3
          text-l lg:text-xl text-[#132743] font-gsansMd hover:bg-gray-200 gap-2 w-30 h-8 lg:w-30 lg:h-10'
        >
          <Image
            src='/Icons/newGroup.svg'
            alt='newGroup'
            width={20}
            height={20}
          />
          새 그룹
        </Button>
      </DialogTrigger>
      <DialogContent className='transition-all ease-out duration-500 max-w-[800px]'>
        <DialogHeader className='flex flex-col w-full gap-2 items-center justify-center'>
          <AlertDialog open={isDuplicated}>
            <AlertDialogContent className='transition-all ease-out duration-500 max-w-[425px] font-gsansMd text-[#132743]'>
              <AlertDialogHeader>
                <AlertDialogTitle>중복 그룹 확인</AlertDialogTitle>
                <AlertDialogDescription>
                  현재
                  <p
                    className='font-gsansLg'
                    style={{ display: 'inline', margin: '0' }}
                  >
                    &quot; {searchValue}
                    &quot;{' '}
                  </p>
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
                <AlertDialogAction
                  onClick={() => {
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
                      })
                      .then(() => setIsDuplicated(false))
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  계속 생성
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogTitle>새로운 그룹 생성</DialogTitle>
          {isAddingUser ? (
            <div className='flex flex-col w-full items-center justify-center gap-4 overflow-scroll'>
              {selectedUsers.length > 0 && (
                <div className='flex flex-row gap-2 overflow-x-scroll w-[300px] md:w-[700px]'>
                  {selectedUsers.map((selectedUser) => (
                    <div
                      key={selectedUser.intraId}
                      className='flex flex-row items-center gap-2 p-2 border border-gray-400 rounded-xl shadow-lg'
                    >
                      <p className='text-l font-gsansMd text-[#132743]'>
                        {selectedUser.intraName}
                      </p>
                      <X
                        className='size-6 cursor-pointer'
                        onClick={() => {
                          setSelectedUsers(
                            selectedUsers.filter(
                              (selected) => selected !== selectedUser
                            )
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className='flex flex-row items-center gap-2 p-2 w-full border border-gray-400 rounded-xl shadow-lg'>
                <Image
                  src='/Icons/search.svg'
                  width={20}
                  height={20}
                  alt='search'
                />
                <input
                  ref={inputRef}
                  className='w-full bg-transparent outline-none placeholder:text-gray-500 dark:text-gray-700 text-l font-gsansMd text-[#132743]'
                  placeholder='새 그룹에 추가할 친구를 검색하세요.'
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {searchValue && (
                  <X
                    className='size-6'
                    onClick={() => {
                      formRef.current?.reset();
                      setSearchValue('');
                    }}
                  />
                )}
              </div>
              <div className='h-[300px] md:h-[500px] w-full rounded-md overflow-scroll'>
                <div className='grid grid-flow-row md:grid-cols-2 gap-2'>
                  {searchedUsers?.map((searchedMember) => (
                    <SearchedCard
                      key={searchedMember.intraId}
                      member={searchedMember}
                      onClick={() => {
                        if (
                          selectedUsers.some(
                            (selectedUser) =>
                              selectedUser.intraId === searchedMember.intraId
                          )
                        )
                          return;
                        setSelectedUsers([...selectedUsers, searchedMember]);
                      }}
                      isAddingUser={true}
                    />
                  ))}
                </div>
              </div>
              <Button
                className='rounded-full text-l lg:text-xl font-gsansMd hover:bg-gray-200 gap-2 w-30 h-8 lg:w-30 lg:h-10'
                onClick={() => {
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
                    })
                  );
                }}
                variant={'outline'}
              >
                추가하기
              </Button>
            </div>
          ) : (
            <div className='flex flex-row items-center gap-2 p-2  w-full border border-gray-400 rounded-xl shadow-lg'>
              <form
                className='flex flex-row items-center gap-2 w-full'
                ref={formRef}
                onSubmit={async (e) => {
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
                    })
                    .then(() =>
                      toast({
                        title: `'${inputValue}' 그룹이 생성되었습니다.`,
                      })
                    )
                    .then(() => setIsAddingUser(true))
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <input
                  ref={inputRef}
                  className='w-full bg-transparent outline-none placeholder:text-gray-500 dark:text-gray-700 text-l font-gsansMd text-[#132743]'
                  placeholder='생성할 그룹의 이름을 입력하세요.'
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
              {searchValue && (
                <X
                  className='size-6'
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
