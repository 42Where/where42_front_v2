import React from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog } from '@/components/ui/dialog';
import { useUserStore } from '@/lib/stores';
import LocationBtn from '../Buttons/LocationBtn';
import CustomLocationContent from '../Utils/CustomLocationContent';

export default function CustomLocationModal() {
  const { user } = useUserStore();
  const [resultMessage, setResultMessage] = React.useState<string>('');
  if (!user) return null;
  return (
    <Dialog
      onOpenChange={(open) => {
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
        {/* 20240910: Nested button warning can happen in dev mode, but nothing is wrong on production mode. Relax. */}
        <LocationBtn user={user} isMyProfile />
      </DialogTrigger>
      <CustomLocationContent
        resultMessage={resultMessage}
        setResultMessage={setResultMessage}
      />
    </Dialog>
  );
}
