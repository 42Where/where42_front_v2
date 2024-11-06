import { useEffect } from "react";
import authApi from "@/api/authApi";
import groupApi from "@/api/groupApi";
import {
  useUserStore,
  useGroupsStore,
  useAddedMembersStore,
} from "@/lib/stores";

export function useInfoSet() {
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
          const sortedGroup = [...res].sort((a, b) => a.groupId - b.groupId);
          const defaultGroup = sortedGroup.find(
            (group) => group.groupName === "친구 목록",
          );
          if (defaultGroup) {
            sortedGroup.splice(sortedGroup.indexOf(defaultGroup), 1);
            sortedGroup.push(defaultGroup);
          }
          setGroups(sortedGroup);
          const allMemberIds = res.flatMap((group) =>
            group.members.map((member) => member.intraId),
          );
          allMemberIds.push(userIntraId);
          setAddedMembers(allMemberIds);
        });
      });
  }, []);
}
