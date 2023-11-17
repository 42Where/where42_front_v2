import type { Meta, StoryObj } from "@storybook/react";
import {
  DemoUser,
  DemoUserB,
  AbsentUser,
  NotUser,
  JBOK,
  MYKANG,
} from "@/../test/DemoUser";

import FoldableGroupTable from "./FoldableGroupTable";

/**
 * - 사용자들 리스트를 보여주는 컴포넌트입니다.
 * - User가 undefined일 경우 스켈레톤을 표시합니다.
 * - 그대로는 검색결과로만 사용됩니다.
 * - 친구 그룹에서 사용할경우 체크박스가 표시될수도 있습니다
 */

export default {
  title: "Molecules/FoldableGroupTable",
  component: FoldableGroupTable,
  tags: ["autodocs"],
} as Meta;

export const Default: StoryObj<typeof FoldableGroupTable> = {
  args: {
    groupTitle: "친구",
    users: Array.from({ length: 5 }, () => [
      DemoUser,
      DemoUserB,
      AbsentUser,
      NotUser,
      JBOK,
      MYKANG,
    ]).flat(),
    size: "medium",
  },
};
