import React from "react";
import ProfilePic from "@/components/ProfilePic";
import { User } from "@/types/User";
import { useCheckedUsersStore } from "@/lib/stores";
import { Checkbox } from "../ui/checkbox";
import UserSettingModal from "../modals/UserSettingModal";
import Group from "@/types/Group";
import LocationBtn from "../buttons/LocationBtn";

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
  return (
    <div
      className={`flex flex-row items-center justify-between rounded-2xl border-2 p-4 hover:border-[#FFB5B5] md:p-6 ${
        isEdit && "cursor-pointer"
      }`}
      onClick={() => {
        if (isEdit) {
          const temp = checkedUsers;
          if (isCheck) {
            temp.splice(temp.indexOf(user), 1);
            setCheckedUsers(temp);
          } else {
            temp.push(user);
            setCheckedUsers(temp);
          }
        }
      }}
    >
      <div className="flex flex-row items-center gap-4 md:gap-6">
        <ProfilePic user={user} type="userCard" />
        <div className="flex flex-col items-start gap-1 md:gap-2">
          <LocationBtn user={user} />
          <h2 className=" text-darkblue text-xl md:text-3xl">
            {user.intraName}
          </h2>
          <p className=" text-l  lg:text-xl">{user.comment}</p>
        </div>
      </div>
      {isEdit ? (
        <Checkbox className="size-8 rounded-lg border-4" checked={isCheck} />
      ) : (
        <UserSettingModal targUser={user} targGroup={group} />
      )}
    </div>
  );
}
