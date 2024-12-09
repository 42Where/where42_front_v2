import adminApi from '@/api/adminApi';
import { useRouter } from 'next/router';
import Header from '@/components/header/Header';
import Divider from '@/components/utils/Divider';
import { useEffect, useState } from 'react';
import { Announcement } from '@/types/Announcement';
import announcementApi from '@/api/announcementApi';
import AdminAnnouncements from '@/components/admin/AdminAnnouncements';
import AnnouncementWriter from '@/components/admin/AnnouncementWriter';
import AdminHeader from '@/components/admin/AdminHeader';
import AnnouncementRemover from '@/components/admin/AnnouncementRemover';

export default function AdminPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDelete, setIsDelete] = useState(false);

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
      <AdminHeader isDelete={isDelete} setIsDelete={setIsDelete} />
      <Divider />
      <div className="flex flex-row items-start justify-center pt-2">
        <AdminAnnouncements announcements={announcements} />
        {isDelete ? <AnnouncementRemover /> : <AnnouncementWriter />}
      </div>
    </main>
  );
}
