import { useEffect, useState } from 'react';
import authApi from '@/api/authApi';
import groupApi from '@/api/groupApi';
import adminApi from '@/api/adminApi';
import { useRouter } from 'next/router';
import { useUserStore, useGroupsStore, useAddedMembersStore } from '@/lib/stores';
import Cookies from 'js-cookie';

export default function useInfoSet() {
  const { setUser } = useUserStore();
  const { setGroups } = useGroupsStore();
  const { setAddedMembers } = useAddedMembersStore();
  const [isAdmin, setIsAdmin] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { intraId, agreement } = router.query;

  useEffect(() => {
    const initializeInfo = async () => {
      try {
        // 만약 라우터가 초기화되지 않았다면 API 호출을 하지 않는다.
        if (!router.isReady) return;
        if (agreement === 'false') {
          setShowModal(true);
          return;
        }
        if (intraId || agreement) {
          await router.replace(router.pathname, router.pathname, { shallow: true });
        }

        // 어드민 상태 확인
        const adminRes = await adminApi.getMyStatus();
        setIsAdmin(adminRes.admin);

        // 사용자 정보 가져오기
        const userRes = await authApi.getMyInfo();
        Cookies.set('intraId', String(userRes.intraId), { domain: '.where42.kr' });
        setUser(userRes);
        const userIntraId = userRes.intraId;
        const userDefaultGroupId = userRes.defaultGroupId;

        // 그룹 정보 가져오기 및 정렬
        const groupRes = await groupApi.getAllGroups();
        const updatedGroups = groupRes.map((group) =>
          group.groupId === userDefaultGroupId ? { ...group, groupName: '친구 목록' } : group,
        );

        const sortedGroups = updatedGroups.sort((a, b) => a.groupId - b.groupId);
        const defaultGroup = sortedGroups.find((group) => group.groupName === '친구 목록');

        if (defaultGroup) {
          sortedGroups.splice(sortedGroups.indexOf(defaultGroup), 1);
          sortedGroups.push(defaultGroup);
        }

        setGroups(sortedGroups);

        // 모든 멤버 ID 수집
        const allMemberIds = groupRes.flatMap((group) =>
          group.members.map((member) => member.intraId),
        );
        allMemberIds.push(userIntraId);
        setAddedMembers(allMemberIds);
      } catch (error) {
        console.error('Error initializing info:', error);
      }
    };

    initializeInfo();
  }, [router, setUser, setGroups, setAddedMembers, intraId, agreement]);

  return { isAdmin, showModal, setShowModal };
}
