import type { Meta, StoryObj } from "@storybook/react";

import NewGroupIcon from "&/Icons/newGroup.svg";
import FunctionButton from "&/Icons/functionButton.svg";
import Checkbox from "../Checkbox/Checkbox";

import IconButton from "./IconButton";

/**
 * - import한 아이콘 이미지를 Icon으로 전달받아
 * - IconButton 컴포넌트를 렌더링합니다.
 */
export default {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} as Meta;

export const FunctionIconButton: StoryObj<typeof IconButton> = {
  args: { Icon: FunctionButton, size: "medium" },
};

export const NewGroupIconButton: StoryObj<typeof IconButton> = {
  args: { Icon: NewGroupIcon, size: "medium" },
};

export const CheckboxIconButton: StoryObj<typeof IconButton> = {
  args: {
    children: <Checkbox isChecked={true} size={"medium"} />,
    size: "medium",
  },
};

/**
 * - TODO: 미지 로딩 실패시 에러처리 추가 필요
 * - 에러 전파 구조를 어떻게 해야할지 아직은 잘 모르겠음
 */
export const InvalidImage: StoryObj<typeof IconButton> = {
  args: { Icon: "asdasd", size: "medium" },
};
