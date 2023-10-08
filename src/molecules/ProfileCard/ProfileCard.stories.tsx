import type { Meta, StoryObj } from "@storybook/react";

import ProfileCard from "./ProfileCard";
import DemoUser from "../../../test/DemoUser";

/**
 * - 사용자의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 * - User가 undefined일 경우 스켈레톤을 표시합니다.
 */

export default {
  title: "Molecules/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
} as Meta;

export const Default: StoryObj<typeof ProfileCard> = {
  args: {
    user: DemoUser,
    size: "medium",
  },
};

export const Friend: StoryObj<typeof ProfileCard> = {
  args: {
    user: { ...DemoUser, isFriend: true },
    size: "medium",
  },
};

export const WithoutComment: StoryObj<typeof ProfileCard> = {
  args: {
    user: { ...DemoUser, comment: "" },
    size: "medium",
  },
};

export const Skeleton: StoryObj<typeof ProfileCard> = {
  args: {
    size: "medium",
  },
};
