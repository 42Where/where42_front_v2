import { useEffect } from "react";
import authApi from "@/api/authApi";
import groupApi from "@/api/groupApi";
import {
  useUserStore,
  useGroupsStore,
  useAddedMembersStore,
} from "@/lib/stores";

export function useGroupSet() {
  const { setUser } = useUserStore();
  const { setGroups } = useGroupsStore();
  const { setAddedMembers } = useAddedMembersStore();

  useEffect(() => {
    let userIntraId: number;
    let userDefaultGroupId: number;
    authApi
      .getMyInfo()
      .then((res) => {
        setUser(res);
        userIntraId = res.intraId;
        userDefaultGroupId = res.defaultGroupId;
      })
      .catch((err) => console.error(err))
      .then(() => {
        groupApi.getAllGroups().then((res) => {
          res.map((group) => {
            if (group.groupId === userDefaultGroupId)
              group.groupName = "친구 목록";
          });
          setGroups(res);
          const allMemberIds = res.flatMap((group) =>
            group.members.map((member) => member.intraId),
          );
          allMemberIds.push(userIntraId);
          setAddedMembers(allMemberIds);
        });
      });
  }, []);
}
