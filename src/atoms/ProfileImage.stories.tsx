import type { Meta, StoryObj } from "@storybook/react";

import ProfileImage from "./ProfileImage";

/**
 * - 사용자의 프로필사진과 출석여부를 표시하는 컴포넌트입니다.
 * - src가 주어지지 않으면 기본 프로필사진을 표시합니다.
 * - active가 true이면 테두리와 활성화아이콘을 표시합니다.
 * - size가 medium이면 96x96, large이면 128x128 크기로 표시합니다.
 */

export default {
  title: "Atoms/ProfileImage",
  component: ProfileImage,
  argTypes: {
    src: {
      control: {
        type: "text",
      },
    },
    active: {
      control: {
        type: "boolean",
      },
    },
    size: {
      control: {
        type: "select",
        options: ["medium", "large"],
      },
    },
  },
  tags: ["autodocs"],
} as Meta;

// const Template: Story = (args) => <ProfileImage {...args} />;
export const BasicProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    active: true,
    size: "large",
  },
};

export const DefaultProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    active: false,
    size: "large",
  },
};

export const FailedProfileImage: StoryObj<typeof ProfileImage> = {
  args: {
    src: "asdasd",
    active: false,
    size: "large",
  },
};
