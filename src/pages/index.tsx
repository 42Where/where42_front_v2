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
  const { user } = useUserStore();
  const { groups } = useGroupsStore();
  const { isAdmin, showModal, setShowModal } = useInfoSet();

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
