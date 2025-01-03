import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/header/Header';
import MyProfileCard from '@/components/cards/MyProfileCard';
import Groups from '@/components/group/Groups';
import Footer from '@/components/Footer';
import ProfileSkeleton from '@/components/utils/ProfileSkeleton';
import { useUserStore, useGroupsStore } from '@/lib/stores';
import AgreementModal from '@/components/modals/AgreementModal';
import useInfoSet from '@/lib/hooks';
import Divider from '@/components/utils/Divider';

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();
  const { groups } = useGroupsStore();
  const { intraId, agreement } = router.query;
  const { isAdmin, setShowModal, showModal } = useInfoSet();

  useEffect(() => {
    if (agreement && agreement === 'false') setShowModal(true);
    if (router.query.intraId || router.query.agreement) {
      router.replace(router.pathname, router.pathname, { shallow: true });
    }
  }, [intraId, agreement, router, setShowModal]);

  return (
    <>
      <main className="flex h-full min-h-screen w-full flex-col justify-start px-1 md:px-10">
        <AgreementModal showModal={showModal} setShowModal={setShowModal} />
        <Header isAdmin={isAdmin} />
        {user ? <MyProfileCard user={user} /> : <ProfileSkeleton />}
        <Divider />
        {groups && <Groups groups={groups} />}
      </main>
      <Footer />
    </>
  );
}
