import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { adminApi, announcementApi } from '@/api';
import Header from '@/components/header/Header';
import { Divider } from '@/components/utils/Divider';
import {
  AdminAnnouncements,
  AnnouncementWriter,
  AdminHeader,
  AnnouncementRemover,
} from '@/components/admin';
import { Announcement } from '@/types/Announcement';

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
        if (res.admin === false) router.push('/');
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
