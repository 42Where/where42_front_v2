import type { Meta, StoryObj } from "@storybook/react";

import NewGroupIcon from "&/Icons/newGroup.svg";

import IconTextButton from "./IconTextButton";

import Checkbox from "../Checkbox/Checkbox";
import IconButton from "./IconButton";

/**
 * - 자식 컴포넌트로 아이콘을 전달받아 IconTextButton 컴포넌트를 렌더링합니다.
 * - 자식 컴포넌트에도 사이즈를 명시해주어야 합니다
 * TODO?: 자식 컴포넌트에 사이즈를 명시해주지 않아도 자동으로 전달해주는 방법이 있는지 확인 필요
 */
export default {
  title: "Atoms/Buttons/IconTextButton",
  component: IconTextButton,
  tags: ["autodocs"],
} as Meta;

export const NewGroupSmall: StoryObj<typeof IconTextButton> = {
  args: {
    children: <IconButton Icon={NewGroupIcon} size={"small"} />,
    size: "small",
    text: "새 그룹",
  },
};
export const NewGroupMedium: StoryObj<typeof IconTextButton> = {
  args: {
    children: <IconButton Icon={NewGroupIcon} size={"medium"} />,
    size: "medium",
    text: "새 그룹",
  },
};
export const NewGroupLarge: StoryObj<typeof IconTextButton> = {
  args: {
    children: <IconButton Icon={NewGroupIcon} size={"large"} />,
    size: "large",
    text: "새 그룹",
  },
};

export const CheckboxSmall: StoryObj<typeof IconTextButton> = {
  args: {
    children: <Checkbox isChecked={false} size={"small"} />,
    size: "small",
    text: "체크박스",
  },
};
export const CheckboxMedium: StoryObj<typeof IconTextButton> = {
  args: {
    children: <Checkbox isChecked={false} size={"medium"} />,
    size: "medium",
    text: "체크박스",
  },
};
export const CheckboxLarge: StoryObj<typeof IconTextButton> = {
  args: {
    children: <Checkbox isChecked={false} size={"large"} />,
    size: "large",
    text: "체크박스",
  },
};
