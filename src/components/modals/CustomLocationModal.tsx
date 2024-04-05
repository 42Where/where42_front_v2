import React from 'react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog } from '@/components/ui/dialog';
import { useUserStore } from '@/lib/stores';
import LocationBtn from '../LocationBtn';
import CustomLocationContent from '../CustomLocationContent';

export default function CustomLocationModal() {
  const { user } = useUserStore();
  console.log(user);
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
        <LocationBtn user={user} />
      </DialogTrigger>
      <CustomLocationContent
        resultMessage={resultMessage}
        setResultMessage={setResultMessage}
      />
    </Dialog>
  );
}
