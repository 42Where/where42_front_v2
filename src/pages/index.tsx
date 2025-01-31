import Header from '@/components/header/Header';
import MyProfileCard from '@/components/cards/MyProfileCard';
import Groups from '@/components/group/Groups';
import Footer from '@/components/Footer';
import ProfileSkeleton from '@/components/utils/ProfileSkeleton';
import AgreementModal from '@/components/modals/AgreementModal';
import useInfoSet from '@/lib/hooks';
import Divider from '@/components/utils/Divider';
import CardSkeleton from '@/components/utils/CardSkeleton';
import useAdminStatus from '@/hooks/useAdminStatus';
import useMyInfo from '@/hooks/useMyInfo';
import useGroupList from '@/hooks/useGroupList';

export default function Home() {
  const myInfo = useMyInfo();
  const user = myInfo.data;
  const { setShowModal, showModal } = useInfoSet();
  const groups = useGroupList().data;
  const isAdmin = useAdminStatus().data?.admin;

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
