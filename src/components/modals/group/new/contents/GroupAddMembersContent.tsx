import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SearchedCard from '@/components/cards/SearchedCard';
import { XBtn } from '@/components/buttons';
import { useAddGroupMember } from '@/hooks';
import { SearchedUser, User } from '@/types/User';
import Group from '@/types/Group';
import search from '@/assets/search.svg';

export function GroupAddMembersContent({
  setIsAddingUser,
  groupId,
  groups,
}: {
  setIsAddingUser: (isAddingUser: boolean) => void;
  groupId: number;
  groups: Group[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<User[]>(groups[groups.length - 1].members);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const addGroupMutate = useAddGroupMember().mutate;

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
    addGroupMutate({ groupId, addMembers: selectedUsers });
  }

  useEffect(() => {
    // 멤버 검색할 때 자동반영되도록
    setSearchedUsers(
      groups[groups.length - 1].members.filter((user) => user.intraName.includes(searchValue)),
    );
  }, [searchValue, groups]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {selectedUsers.length > 0 && (
        <div className="flex w-[300px] flex-row gap-2 overflow-auto md:w-[700px]">
          {selectedUsers.map((selectedUser) => (
            <div
              key={selectedUser.intraId}
              className="flex flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 shadow-lg"
            >
              <p className="text-l text-darkblue">{selectedUser.intraName}</p>
              <XBtn
                onClick={() => {
                  setSelectedUsers(selectedUsers.filter((selected) => selected !== selectedUser));
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full flex-row items-center gap-2 rounded-xl border border-gray-400 p-2 shadow-lg">
        <Image src={search} width={20} height={20} alt="search" />
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
              isAlreadyAdded={selectedUsers.some(
                (selectedUser) => selectedUser.intraId === searchedMember.intraId,
              )}
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
  );
}
