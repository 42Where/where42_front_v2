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
  const { user, setUser, token } = useMyDataStore((state) => state);
  const { groups, setGroups } = useGroupStore((state) => state);
  useEffect(() => {
    if (token) {
      groupApi
        .getAllGroups()
        .then((res) => {
          setGroups(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 테스트용 더미유저와 그룹을 넣어줌
    // api 호출하는것처럼 보이게 하기 위해 비동기 demoApi 함수 사용
    // TODO: 인증 완료되면 api 사용해서 갱신해놓고 루트페이지에서 바로 메인페이지로 이동
  }, [setGroups, token]);
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
