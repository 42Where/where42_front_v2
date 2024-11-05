import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import MyProfileCard from "@/components/cards/MyProfileCard";
import Groups from "@/components/group/Groups";
import Footer from "@/components/Footer";
import ProfileSkeleton from "@/components/utils/ProfileSkeleton";
import { useUserStore, useGroupsStore } from "@/lib/stores";
import AgreementModal from "@/components/modals/AgreementModal";
import { useGroupSet } from "@/lib/hooks";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();
  const { groups } = useGroupsStore();
  const { intraId, agreement } = router.query;
  const [showModal, setShowModal] = useState(false);
  useGroupSet();

  useEffect(() => {
    if (agreement && agreement === "false") setShowModal(true);
    if (router.query.intraId || router.query.agreement)
      router.replace(router.pathname, router.pathname, { shallow: true });
  }, [intraId, agreement, router]);

  return (
    <>
      <main className="flex h-full min-h-screen w-full flex-col justify-start gap-3 px-2 md:px-10 lg:gap-4">
        <AgreementModal showModal={showModal} setShowModal={setShowModal} />
        <Header />
        {user ? <MyProfileCard user={user} /> : <ProfileSkeleton />}
        {groups ? <Groups groups={groups} /> : null}
      </main>
      <Footer />
    </>
  );
}
