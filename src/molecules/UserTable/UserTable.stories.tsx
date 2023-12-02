import type { Meta, StoryObj } from "@storybook/react";
import {
  DemoUser,
  DemoUserB,
  AbsentUser,
  NotUser,
  JBOK,
  MYKANG,
} from "@/../test/DemoUser";
import DemoGroup from "@/../test/DemoGroup";

import UserTable from "./UserTable";

/**
 * - 사용자들 리스트를 보여주는 컴포넌트입니다.
 * - User가 undefined일 경우 스켈레톤을 표시합니다.
 * - 그대로는 검색결과로만 사용됩니다.
 * - ProfileCard에서 사용할 아이콘을 여기서 결정합니다
 * - 친구 그룹에서 사용할경우 체크박스가 표시될수도 있습니다
 */

export default {
  title: "Molecules/UserTable",
  component: UserTable,
  tags: ["autodocs"],
} as Meta;

export const Default: StoryObj<typeof UserTable> = {
  args: {
    users: DemoGroup.users,
    size: "medium",
    parentGroup: DemoGroup,
  },
};

// TODO: 추가 구현 필요
// export const Skeleton: StoryObj<typeof UserTable> = {
//   args: {
//     users: undefined,
//     size: "medium",
//   },
// };
