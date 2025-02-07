import Header from '@/components/header/Header';
import MyProfileCard from '@/components/cards/MyProfileCard';
import Groups from '@/components/group/Groups';
import Footer from '@/components/utils/Footer';
import ProfileSkeleton from '@/components/utils/ProfileSkeleton';
import AgreementModal from '@/components/modals/AgreementModal';
import Divider from '@/components/utils/Divider';
import CardSkeleton from '@/components/utils/CardSkeleton';
import useInfoSet from '@/hooks/useInfoSet';

export default function Home() {
  const { showModal, setShowModal, userRes, groupRes, adminStatusRes } = useInfoSet();
  const user = userRes.data;
  const groups = groupRes.data;
  const isAdmin = adminStatusRes.data?.admin;

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
