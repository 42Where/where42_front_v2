import type { Meta, StoryObj } from "@storybook/react";

import User from "@/types/User";
import { Size } from "@/types/enums";

import { DemoUser, AbsentUser, JBOK, MYKANG } from "@/../test/DemoUser";

import ProfileImage from "./ProfileImage";

/**
 * - 사용자의 프로필사진과 출석여부를 표시하는 컴포넌트입니다.
 * - src가 주어지지 않으면 기본 프로필사진을 표시합니다.
 * - active가 true이면 테두리를 표시합니다.
 * - size가 small이면 64*64 medium이면 96*96, large이면 128*128 크기로 표시합니다.
 */

export default {
  title: "Atoms/ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
} as Meta;

export const BasicProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: DemoUser,
  },
};

export const DefaultProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: { ...DemoUser, image: "대충 비정상 링크" },
  },
};

export const AbsentProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: AbsentUser,
  },
};

export const JBOKProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: JBOK,
  },
};

export const MYKANGProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: MYKANG,
  },
};
