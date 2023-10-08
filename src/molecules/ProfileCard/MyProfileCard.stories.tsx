import type { Meta, StoryObj } from "@storybook/react";

import MyProfileCard from "./MyProfileCard";
import DemoUser from "../../../test/DemoUser";

/**
 * - 본인의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 */

export default {
  title: "Molecules/MyProfileCard",
  component: MyProfileCard,
  tags: ["autodocs"],
} as Meta;

export const Default: StoryObj<typeof MyProfileCard> = {
  args: {
    user: DemoUser,
    size: "medium",
  },
};

export const WithoutComment: StoryObj<typeof MyProfileCard> = {
  args: {
    user: { ...DemoUser, comment: "" },
    size: "medium",
  },
};

export const Skeleton: StoryObj<typeof MyProfileCard> = {
  args: {
    size: "medium",
  },
};
