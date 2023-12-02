import MyProfileCard from "@/molecules/MyProfileCard/MyProfileCard";
import FoldableGroupTable from "@/molecules/FoldableGroupTable/FoldableGroupTable";

// import styles from "./MainMain.module.scss"

import useMyDataStore from "@/stores/useMyDataStore";
import useGroupStore from "@/stores/useGroupStore";
import { useEffect } from "react";

// 테스트용 더미 유저, 그룹, api
import { JBOK } from "../../../../test/DemoUser";
import DemoGroup from "../../../../test/DemoGroup";
import demoApi from "../../../../test/DemoApi";

function MainMain() {
  const { myData, setMyData } = useMyDataStore((state) => state);
  const { groups, setGroups } = useGroupStore((state) => state);
  useEffect(() => {
    if (myData.id === 0) {
      demoApi(() => {
        setMyData({
          ...JBOK,
          attendanceOnly: false,
          token: "",
          refreshToken: "",
          size: "medium",
        });
      });
      demoApi(() => {
        setGroups([
          DemoGroup,
          { ...DemoGroup, id: 3, name: "4242" },
          { ...DemoGroup, id: 2, name: "친구" },
          { id: 4, name: "테스트용 빈 그룹", users: [], isInEdit: false },
          { id: 5, name: "테스트용 빈 그룹2", users: [], isInEdit: false },
          { id: 6, name: "테스트용 빈 그룹3", users: [], isInEdit: false },
        ]);
      });
      // 테스트용 더미유저와 그룹을 넣어줌
      // api 호출하는것처럼 보이게 하기 위해 비동기 demoApi 함수 사용
      // TODO: 인증 완료되면 api 사용해서 갱신해놓고 루트페이지에서 바로 메인페이지로 이동
    }
  }, [myData, setMyData, setGroups, groups]);
  return (
    <>
      <MyProfileCard size={myData?.size ?? "medium"} />
      {groups.map((group) => {
        return (
          <FoldableGroupTable
            key={group.id}
            userGroup={group}
            size={myData?.size ?? "medium"}
          />
        );
      })}
    </>
  );
}

export default MainMain;
