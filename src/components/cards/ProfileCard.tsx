import ProfilePic from '@/components/ProfilePic';
import { Checkbox } from '@/components/ui/checkbox';
import UserSettingModal from '@/components/modals/UserSettingModal';
import { LocationBtn } from '@/components/buttons';
import { useCheckedUsersStore } from '@/lib/stores';
import { User } from '@/types/User';
import Group from '@/types/Group';

export default function ProfileCard({
  user,
  isEdit,
  isCheck,
  group,
}: {
  user: User;
  isEdit: boolean;
  isCheck: boolean;
  group: Group;
}) {
  const { checkedUsers, setCheckedUsers } = useCheckedUsersStore();
  function clickHandler() {
    if (isEdit) {
      const temp = [...checkedUsers];
      if (isCheck) temp.splice(temp.indexOf(user), 1);
      else temp.push(user);
      setCheckedUsers(temp);
    }
  }
  return (
    <button
      type="button"
      className={`flex cursor-default flex-row items-center justify-between break-all border-b p-2 md:rounded-2xl md:border-2 md:p-4 md:hover:border-basepink ${
        isEdit && 'cursor-pointer'
      }`}
      onClick={clickHandler}
    >
      <div className="flex flex-row items-center gap-2 md:gap-4">
        <ProfilePic user={user} type="userCard" />
        <div className="flex flex-col items-start gap-1 md:gap-2">
          <LocationBtn user={user} />
          <h2 className="text-xl text-darkblue md:text-3xl">{user.intraName}</h2>
          <p className="text-md lg:text-lg">{user.comment}</p>
        </div>
      </div>
      {isEdit ? (
        <Checkbox className="size-8 rounded-lg border-4" checked={isCheck} />
      ) : (
        <UserSettingModal targUser={user} targGroup={group} />
      )}
    </button>
  );
}
