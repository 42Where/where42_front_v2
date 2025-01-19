import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import useMyInfo from '@/hooks/useMyInfo';
import LocationBtn from '@/components/buttons/LocationBtn';
import CustomLocationContent from '@/components/utils/CustomLocationContent';

export default function CustomLocationModal() {
  const user = useMyInfo().data;
  const [resultMessage, setResultMessage] = React.useState<string>('');
  if (!user) return null;
  return (
    <Dialog
      onOpenChange={(open) => {
        // TODO: Take a look into this later.. do we really need timer?
        if (!open) {
          setTimeout(() => {
            setResultMessage('');
          }, 100);
        } else {
          setResultMessage('');
        }
      }}
    >
      <DialogTrigger>
        {/* 20240910: Nested button warning can happen in dev mode,
        but nothing is wrong on production mode. Relax. */}
        <LocationBtn user={user} isMyProfile />
      </DialogTrigger>
      <CustomLocationContent resultMessage={resultMessage} setResultMessage={setResultMessage} />
    </Dialog>
  );
}
