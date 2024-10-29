import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import MyProfileCard from "@/components/cards/MyProfileCard";
import Groups from "@/components/Groups";
import Footer from "@/components/Footer";
import authApi from "@/api/authApi";
import groupApi from "@/api/groupApi";
import ProfileSkeleton from "@/components/utils/ProfileSkeleton";
import {
  useUserStore,
  useGroupsStore,
  useAddedMembersStore,
} from "@/lib/stores";
import AgreementModal from "@/components/modals/AgreementModal";
import GroupOrderSetting from "@/components/utils/GroupOrderSetting";

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { groups, setGroups } = useGroupsStore();
  const { setAddedMembers } = useAddedMembersStore();
  const { intraId, agreement } = router.query;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (agreement && agreement === "false") setShowModal(true);
    if (router.query.intraId || router.query.agreement)
      router.replace(router.pathname, router.pathname, { shallow: true });
  }, [intraId, agreement, router]);

  useEffect(() => {
    let userIntraId: number;
    let userDefaultGroupId: number;
    authApi
      .getMyInfo()
      .then((res) => {
        setUser(res);
        userIntraId = res.intraId;
        userDefaultGroupId = res.defaultGroupId;
      })
      .catch((err) => console.error(err))
      .then(() => {
        groupApi.getAllGroups().then((res) => {
          res.map((group) => {
            if (group.groupId === userDefaultGroupId)
              group.groupName = "친구 목록";
          });
          setGroups(res);
          const allMemberIds = res.flatMap((group) =>
            group.members.map((member) => member.intraId),
          );
          allMemberIds.push(userIntraId);
          setAddedMembers(allMemberIds);
        });
      });
  }, []);

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
