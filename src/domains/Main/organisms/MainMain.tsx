import { useEffect } from "react";

import useGroupStore from "@/stores/useGroupStore";
import useMyDataStore from "@/stores/useUserStore";

import UserProfileCard from "@/molecules/UserProfileCard/UserProfileCard";
import FoldableGroupTable from "@/molecules/FoldableGroupTable/FoldableGroupTable";

import groupApi from "@/api/groupApi";

import styles from "./MainMain.module.css";

// 테스트용 더미 유저, 그룹, api

import { Skeleton } from "antd";

function MainMain() {
  const { user, setUser } = useMyDataStore((state) => state);
  const { groups, setGroups } = useGroupStore((state) => state);
  return (
    <div className={styles.main_content}>
      <UserProfileCard />
      {groups.length === 0 ? (
        <div>
          <Skeleton active />
        </div>
      ) : (
        groups.map((group) => {
          return <FoldableGroupTable key={group.groupId} userGroup={group} />;
        })
      )}
    </div>
  );
}

export default MainMain;
