import { useEffect, useState } from 'react';
import authApi from '@/api/authApi';
import groupApi from '@/api/groupApi';
import adminApi from '@/api/adminApi';
import { useRouter } from 'next/router';
import { useUserStore, useGroupsStore, useAddedMembersStore } from '@/lib/stores';
import Cookies from 'js-cookie';
// import { useQuery } from '@tanstack/react-query';

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
      // 만약 라우터가 초기화되지 않았다면 API 호출을 하지 않는다.
      if (!router.isReady) return;
      if (agreement === 'false') {
        setShowModal(true);
        return;
      }
      try {
        const [adminRes, userRes, groupRes] = await Promise.all([
          adminApi.getMyStatus(),
          authApi.getMyInfo(),
          groupApi.getAllGroups(),
        ]);
        // 어드민 상태 확인
        setIsAdmin(adminRes.admin);
        // 사용자 정보 가져오기
        Cookies.set('intraId', String(userRes.intraId), { domain: '.where42.kr' });
        setUser(userRes);
        // 그룹 정보 가져오기 및 정렬
        const updatedGroups = groupRes.map((group) =>
          group.groupId === userRes.defaultGroupId ? { ...group, groupName: '친구 목록' } : group,
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
        allMemberIds.push(userRes.intraId);
        setAddedMembers(allMemberIds);
      } catch (error) {
        console.error('Error initializing info:', error);
      }
    };

    initializeInfo();
  }, [router, setUser, setGroups, setAddedMembers, intraId, agreement]);

  return { isAdmin, showModal, setShowModal };
}
