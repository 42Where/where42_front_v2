import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import MyProfileCard from '@/components/MyProfileCard';
import Groups from '@/components/Groups';
import Footer from '@/components/Footer';
import authApi from '@/api/authApi';
import groupApi from '@/api/groupApi';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import {
  useUserStore,
  useGroupsStore,
  useAddedMembersStore,
} from '@/lib/stores';
import AgreementModal from '@/components/modals/AgreementModal';

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { groups, setGroups } = useGroupsStore();
  const { setAddedMembers } = useAddedMembersStore();
  React.useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) router.push('/login');
    else {
      let userIntraId;
      authApi
        .getMyInfo()
        .then((res) => {
          setUser(res);
          userIntraId = res.intraId;
        })
        .catch((err) => console.log(err));
      groupApi.getAllGroups().then((res) => {
        setGroups(res);
        const allMemberIds = res.flatMap((group) =>
          group.members.map((member) => member.intraId)
        );
        res.forEach((group) => {
          group.members.forEach((member) => {
            console.table(member);
          });
        });
        allMemberIds.push(userIntraId);
        setAddedMembers(allMemberIds);
      });
    }
  }, [setAddedMembers]);
  return (
    <main className='flex flex-col justify-center gap-3 lg:gap-4 px-2 md:px-10 pb-24'>
      <AgreementModal />
      <Header />
      {user ? <MyProfileCard user={user} /> : <ProfileSkeleton />}
      {groups ? <Groups groups={groups} /> : null}
      <Footer />
    </main>
  );
}
