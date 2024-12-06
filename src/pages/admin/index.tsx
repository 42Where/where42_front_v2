import adminApi from '@/api/adminApi';
import { useRouter } from 'next/router';
import Header from '@/components/header/Header';
import Divider from '@/components/utils/Divider';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    adminApi
      .getMyStatus()
      .then((res) => {
        if (res.role !== 'ADMIN') router.push('/');
      })
      .catch((err) => console.error(err));
  }, [router]);

  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-start px-2 md:px-10">
      <Header isAdmin />
      <Divider />
    </main>
  );
}
