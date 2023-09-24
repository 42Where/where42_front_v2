import type { Meta, StoryObj } from "@storybook/react";

import User from "@/Types/User";
import { Size } from "@/Types/enums";

import ProfileImage from "./ProfileImage";

/**
 * - 사용자의 프로필사진과 출석여부를 표시하는 컴포넌트입니다.
 * - src가 주어지지 않으면 기본 프로필사진을 표시합니다.
 * - active가 true이면 테두리와 활성화아이콘을 표시합니다.
 * - size가 small이면 64*64 medium이면 96*96, large이면 128*128 크기로 표시합니다.
 */

export default {
  title: "Atoms/ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
} as Meta;

// const Template: Story = (args) => <ProfileImage {...args} />;
export const BasicProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: {
      login: "",
      profileImgSrc:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
      location: "개포",
    } as User,
    size: Size.Medium,
  },
};

export const DefaultProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    user: {
      login: "test",
      profileImgSrc: undefined,
      location: undefined,
    } as User,
  },
};

export const Mykang: StoryObj<typeof ProfileImage> = {
  args: {
    user: {
      login: "mykang",
      profileImgSrc:
        "https://cdn.intra.42.fr/users/7ba3314a458b65fd50c749fd184301da/mykang.jpg",
      location: "개포",
    } as User,
    size: Size.Medium,
  },
};
