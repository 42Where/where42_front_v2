import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/User";
import { useCheckedStore } from "@/lib/stores";
import NewGroupModal from "../modals/NewGroupModal";
import MySettingModal from "../modals/MySettingModal";
import CustomLocationModal from "../modals/CustomLocationModal";
import ProfilePic from "@/components/ProfilePic";

export default function MyProfileCard({ user }: { user: User }) {
  useEffect(() => {
    if (localStorage.getItem("checked") === "true") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);
  const { checked, setChecked } = useCheckedStore();
  return (
    <div className="relative flex flex-row items-center justify-between pb-12 pt-0 lg:px-8">
      <div className="flex flex-row items-center gap-4 lg:gap-6">
        <ProfilePic user={user} type="myCard" />
        <div className="flex flex-col items-start gap-2">
          <CustomLocationModal />
          <h2 className="text-darkblue text-xl lg:text-3xl">
            {user.intraName}
          </h2>
          <p className=" text-l  lg:text-xl">{user.comment}</p>
        </div>
      </div>
      <MySettingModal />
      <div className="absolute bottom-0 right-0 flex flex-row justify-center gap-2 lg:right-10">
        <Button
          className="text-l border-darkblue text-darkblue h-8 w-40
           gap-1 rounded-full border-2
           bg-white p-2 hover:bg-gray-200  lg:h-10 lg:w-52 lg:gap-2 lg:p-4 lg:text-xl"
          onClick={() => {
            setChecked(!checked);
            localStorage.setItem("checked", JSON.stringify(!checked));
          }}
        >
          <Checkbox checked={checked} className="size-4 border-2" size={12} />
          출근한 친구만 보기
        </Button>
        <NewGroupModal />
      </div>
    </div>
  );
}
