import type { Meta, StoryObj } from "@storybook/react";

import FunctionButtonIcon from "&/Icons/functionButton.svg";
import AddUserIcon from "&/Icons/userAdd.svg";
import CheckedIcon from "&/Icons/Checkbox/check.svg";
import { DemoUser, DemoUserB, NotUser } from "@/../test/DemoUser";
import DemoGroup from "../../../test/DemoGroup";
import IconButton from "@/atoms/buttons/IconButton/IconButton";

import ProfileCard from "./ProfileCard";
import AIcon from "@/atoms/AIcon/AIcon";

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
    parentGroup: DemoGroup,
  },
};

export const NotFriend: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUserB,
    parentGroup: DemoGroup,
  },
};

export const WithoutComment: StoryObj<typeof ProfileCard> = {
  args: {
    user: NotUser,
    parentGroup: DemoGroup,
  },
};

export const CheckboxProfile: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUser,
    parentGroup: DemoGroup,
    children: <AIcon icon={CheckedIcon} size="medium" />,
  },
};
