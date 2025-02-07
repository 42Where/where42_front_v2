import { User } from '@/types/User';
import NewGroupModal from '@/components/modals/group/new/NewGroupModal';
import MySettingModal from '@/components/modals/my-setting/MySettingModal';
import CustomLocationModal from '@/components/modals/my-setting/custom-location/CustomLocationModal';
import ProfilePic from '@/components/cards/ProfilePic';
import { SetCheckBtn } from '@/components/buttons';

export default function MyProfileCard({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 pb-1 md:pb-4 lg:px-8">
      <div className="flex min-h-full min-w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4 lg:gap-6">
          <ProfilePic user={user} type="myCard" />
          <div className="flex flex-col items-start gap-1 md:gap-2">
            <CustomLocationModal />
            <h2 className="text-xl text-darkblue lg:text-3xl">{user.intraName}</h2>
            <p className="text-l lg:text-xl">{user.comment}</p>
          </div>
        </div>
        <MySettingModal />
      </div>
      <div className="flex w-full flex-row justify-end gap-2">
        <SetCheckBtn />
        <NewGroupModal />
      </div>
    </div>
  );
}
