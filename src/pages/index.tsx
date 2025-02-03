import Header from '@/components/header/Header';
import MyProfileCard from '@/components/cards/MyProfileCard';
import Groups from '@/components/group/Groups';
import Footer from '@/components/Footer';
import ProfileSkeleton from '@/components/utils/ProfileSkeleton';
import AgreementModal from '@/components/modals/AgreementModal';
import Divider from '@/components/utils/Divider';
import CardSkeleton from '@/components/utils/CardSkeleton';
import useAdminStatus from '@/hooks/useAdminStatus';
import useMyInfo from '@/hooks/useMyInfo';
import useGroupList from '@/hooks/useGroupList';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAddedMembersStore } from '@/lib/stores';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { addedMembers } = useAddedMembersStore();
  const router = useRouter();
  const { agreement } = router.query;
  const user = useMyInfo().data;
  const groups = useGroupList().data;
  const isAdmin = useAdminStatus().data?.admin;
  console.log(addedMembers);

  useEffect(() => {
    // 만약 라우터가 초기화되지 않았다면 API 호출을 하지 않는다.
    if (!router.isReady) return;
    if (agreement === 'false') {
      setShowModal(true);
    }
  }, [router.isReady, agreement]);

  return (
    <>
      <main className="flex h-full min-h-screen w-full flex-col justify-start px-1 md:px-10">
        <AgreementModal showModal={showModal} setShowModal={setShowModal} />
        <Header isAdmin={!!isAdmin} />
        {user ? <MyProfileCard user={user} /> : <ProfileSkeleton />}
        <Divider />
        {groups ? <Groups groups={groups} /> : <CardSkeleton />}
      </main>
      <Footer />
    </>
  );
}
