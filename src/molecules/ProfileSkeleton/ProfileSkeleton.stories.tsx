import type { Meta, StoryObj } from "@storybook/react";

import ProfileSkeleton from "./ProfileSkeleton";
import AIcon from "@/atoms/AIcon/AIcon";

/**
 * - 사용자의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 * - User가 undefined일 경우 스켈레톤을 표시합니다.
 */

export default {
  title: "Molecules/ProfileSkeleton",
  component: ProfileSkeleton,
  tags: ["autodocs"],
} as Meta;

export const Skeleton: StoryObj<typeof ProfileSkeleton> = {
  args: { size: "medium" },
};
