import adminApi from '@/api/adminApi';
import { useRouter } from 'next/router';
import Header from '@/components/header/Header';
import Divider from '@/components/utils/Divider';
import { useEffect, useState } from 'react';
import { Announcement } from '@/types/Announcement';
import announcementApi from '@/api/announcementApi';
import AdminAnnouncements from '@/components/admin/AdminAnnouncements';

export default function AdminPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    announcementApi.getAnnouncement({ page: 0, size: 30 }).then((res) => {
      setAnnouncements(res);
    });
  }, []);
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
      <div className="h-sv flex flex-row items-center justify-start">
        <AdminAnnouncements announcements={announcements} />
        <div className="w-full" />
      </div>
    </main>
  );
}
