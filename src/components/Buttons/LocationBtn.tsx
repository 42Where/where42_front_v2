import { Button } from '../ui/button';
import React from 'react';
import User from '@/types/User';

export default function LocationBtn({
  user,
  searchedUser,
}: {
  user: User;
  searchedUser?: any;
}) {
  const [location, setLocation] = React.useState<string>('');
  React.useEffect(() => {
    if (searchedUser) {
      if (searchedUser.location) {
        setLocation(searchedUser.location);
      } else if (searchedUser.inOrOut || searchedUser.inCluster) {
        setLocation('개포');
      } else {
        setLocation('퇴근');
      }
    } else if (user.location) {
      setLocation(user.location);
    } else if (user.inCluster || user.inOrOut) {
      setLocation('개포');
    } else {
      setLocation('퇴근');
    }
  }, [user, searchedUser]);
  return (
    <Button
      className={`rounded-full ${
        location !== '퇴근'
          ? 'bg-[#132743]'
          : 'bg-white hover:bg-white text-[#132743] border-2 border-[#132743]'
      } h-6 md:h-8 px-2 md:px-3 md:text-xl font-gsansMd`}
    >
      {location}
    </Button>
  );
}
