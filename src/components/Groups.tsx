import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Divider from '@/components/Divider';
import ProfileCard from '@/components/ProfileCard';
import Group from '@/types/Group';
import {
  useCheckedStore,
  useCheckedUsersStore,
  useGroupsStore,
} from '@/lib/stores';
import GroupSettingModal from './modals/GroupSettingModal';
import { Button } from './ui/button';
import GroupDeleteModal from './modals/GroupDeleteModal';
import GroupAddModal from './modals/GroupAddModal';

export default function Groups({ groups }: { groups: Group[] }) {
  const { setGroups } = useGroupsStore();
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  const { checked } = useCheckedStore();
  const sortedGroups = [...groups].sort((a, b) => b.groupId - a.groupId);

  return (
    <div>
      <Divider />
      <Accordion type='multiple'>
        {sortedGroups.map((group) => (
          <AccordionItem
            key={group.groupId}
            value={group.groupName}
            className='overflow-hidden transition-all duration-500 ease-in-out relative'
          >
            {group.isInEdit && (
              <div className='flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2 border-[#E5E7EB] absolute right-[50px] top-[4px] md:right-[80px] md:top-[16px]'>
                {checkedUsers.length > 0 && (
                  <div className='flex flex-row gap-1 md:gap-2'>
                    <GroupDeleteModal curGroup={group} />
                    <GroupAddModal curGroup={group} />
                  </div>
                )}
                <div className='flex flex-row gap-1 md:gap-2'>
                  <Button
                    className='rounded-full bg-white border-2 border-[#132743]
                  md:h-8 h-6 px-2 md:px-3 lg:text-xl text-l
                  py-1  text-[#132743] font-gsansMd hover:bg-gray-200 gap-2'
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
                    className='rounded-full border-2 border-[#132743]
                  md:h-8 h-6 px-2 md:px-3 lg:text-xl text-l text-white
                font-gsansMd gap-2'
                    onClick={() => {
                      const temp = groups;
                      const myGroup = temp.find(
                        (g) => g.groupId === group.groupId
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
            <AccordionTrigger className='px-6 text-l md:text-2xl p-2 md:p-4 font-gsansMd text-[#132743]'>
              {group.groupName}
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-flow-row gap-4'>
                {checked
                  ? group.members.map(
                      (member) =>
                        member.location && (
                          <ProfileCard
                            key={member.intraId}
                            user={member}
                            isEdit={group.isInEdit}
                            isCheck={checkedUsers.includes(member)}
                            group={group}
                          />
                        )
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
                <p className='text-center text-xl font-gsansMd text-[#4A6282]'>
                  아무도 없어요.. 😢
                </p>
              ) : (
                checked &&
                group.members.filter((member) => member.location).length ===
                  0 && (
                  <p className='text-center text-xl font-gsansMd text-[#4A6282]'>
                    아무도 없어요.. 😢
                  </p>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
