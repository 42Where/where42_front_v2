import UserProfileCard from "@/molecules/UserProfileCard/UserProfileCard";
import FoldableGroupTable from "@/molecules/FoldableGroupTable/FoldableGroupTable";

import useMyDataStore from "@/stores/useUserStore";
import useGroupStore from "@/stores/useGroupStore";
import { useEffect } from "react";

import styles from "./MainMain.module.css";

// 테스트용 더미 유저, 그룹, api
import { JBOK } from "../../../../test/DemoUser";
import DemoGroup from "../../../../test/DemoGroup";
import demoApi from "../../../../test/DemoApi";

function MainMain() {
  const { user, setUser } = useMyDataStore((state) => state);
  const { groups, setGroups } = useGroupStore((state) => state);
  useEffect(() => {
    if (!user) {
      demoApi(() => {
        setUser(JBOK);
      });
      demoApi(() => {
        setGroups([
          DemoGroup,
          { ...DemoGroup, id: 3, name: "4242" },
          { ...DemoGroup, id: 2, name: "친구", isFolded: false },
          {
            id: 4,
            name: "테스트용 빈 그룹",
            users: [],
            isInEdit: false,
            isFolded: true,
          },
          {
            id: 5,
            name: "테스트용 빈 그룹2",
            users: [],
            isInEdit: false,
            isFolded: true,
          },
          {
            id: 6,
            name: "테스트용 빈 그룹3",
            users: [],
            isInEdit: false,
            isFolded: true,
          },
        ]);
      });
      // 테스트용 더미유저와 그룹을 넣어줌
      // api 호출하는것처럼 보이게 하기 위해 비동기 demoApi 함수 사용
      // TODO: 인증 완료되면 api 사용해서 갱신해놓고 루트페이지에서 바로 메인페이지로 이동
    }
  }, [user, setUser, setGroups]);
  return (
    <div className={styles.main_content}>
      <UserProfileCard />
      {groups.map((group) => {
        return <FoldableGroupTable key={group.id} userGroup={group} />;
      })}
    </div>
  );
}

export default MainMain;
