import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useMyInfo from '@/hooks/useMyInfo';
import useAdminStatus from '@/hooks/useAdminStatus';
import useGroupList from '@/hooks/useGroupList';

export default function useInfoSet() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { agreement } = router.query;

  useEffect(() => {
    // 만약 라우터가 초기화되지 않았다면 API 호출을 하지 않는다.
    if (!router.isReady) return;
    if (agreement === 'false') {
      setShowModal(true);
    }
  }, [router.isReady, agreement]);

  const userRes = useMyInfo();
  const groupRes = useGroupList();
  const adminStatusRes = useAdminStatus();
  const isLoading = !userRes.isLoading || !groupRes.isLoading || !adminStatusRes.isLoading;

  return { showModal, setShowModal, isLoading };
}
