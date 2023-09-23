import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "./IconButton";
import Checkbox from "./Checkbox";
import NewGroupIcon from "&/Icons/newGroup.svg";

/**
 * - import한 아이콘 이미지 또는 컴포넌트를 Icon으로 전달받아
 * - IconButton 컴포넌트를 렌더링합니다.
 */

export default {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} as Meta;

export const BasicIconButton: StoryObj<typeof IconButton> = {
  args: { Icon: Checkbox, size: "small", text: "체크박스" },
};

export const NewGroupButton: StoryObj<typeof IconButton> = {
  args: { Icon: NewGroupIcon, size: "small", text: "새 그룹" },
};

export const ShowLoginToggleButton: StoryObj<typeof IconButton> = {
  args: {
    Icon: Checkbox,
    value: false,
    size: "small",
    text: "출근한 친구만 보기",
  },
};
