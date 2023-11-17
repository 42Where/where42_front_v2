import type { Meta, StoryObj } from "@storybook/react";

import FunctionButtonIcon from "&/Icons/functionButton.svg";
import AddUserIcon from "&/Icons/userAdd.svg";
import { DemoUser, DemoUserB, NotUser } from "@/../test/DemoUser";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import Checkbox from "@/atoms/buttons/Checkbox/Checkbox";
import ProfileCard from "./ProfileCard";

/**
 * - 사용자의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 * - User가 undefined일 경우 스켈레톤을 표시합니다.
 */

export default {
  title: "Molecules/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
} as Meta;

export const Friend: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUser,
    size: "medium",
    children: <IconButton Icon={FunctionButtonIcon} size="medium" />,
  },
};

export const NotFriend: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUserB,
    size: "medium",
    children: <IconButton Icon={AddUserIcon} size="medium" />,
  },
};

export const WithoutComment: StoryObj<typeof ProfileCard> = {
  args: {
    user: NotUser,
    size: "medium",
    children: <IconButton Icon={FunctionButtonIcon} size="medium" />,
  },
};

export const CheckboxProfile: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUser,
    size: "medium",
    children: <Checkbox isChecked={true} size="medium" />,
  },
};

export const Skeleton: StoryObj<typeof ProfileCard> = {
  args: {
    size: "medium",
  },
};
