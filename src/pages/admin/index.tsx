// import { useEffect } from 'react';
import Header from '@/components/header/Header';
import useInfoSet from '@/lib/hooks';
import Divider from '@/components/utils/Divider';

export default function AdminPage() {
  const isAdmin = useInfoSet(true);

  return (
    <main className="flex h-full min-h-screen w-full flex-col justify-start px-2 md:px-10">
      <Header isAdmin={isAdmin} />
      <Divider />
    </main>
  );
}
