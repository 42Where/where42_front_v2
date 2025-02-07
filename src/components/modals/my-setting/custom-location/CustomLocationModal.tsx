import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { LocationBtn } from '@/components/buttons';
import { useMyInfo } from '@/hooks';
import CustomLocationContent from './CustomLocationContent';

export default function CustomLocationModal() {
  const user = useMyInfo().data;
  const [resultMessage, setResultMessage] = useState<string>('');

  if (!user) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <LocationBtn user={user} isMyProfile />
      </DialogTrigger>
      <CustomLocationContent resultMessage={resultMessage} setResultMessage={setResultMessage} />
    </Dialog>
  );
}
