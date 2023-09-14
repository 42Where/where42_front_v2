import type { Meta, StoryObj } from "@storybook/react";

import ProfileCard from "./ProfileCard";

/**
 * - 사용자의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 * - src가 주어지지 않으면 기본 프로필사진을 표시합니다.
 * - active가 true이면 테두리와 활성화아이콘을 표시합니다.
 * - large는 로그인한 사용자 본인의 컴포넌트로 사용하고
 * - medium, small은 다른 사용자의 컴포넌트로 사용합니다.
 */

export default {
  title: "Molecules/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
} as Meta;

export const BasicProfileCard: StoryObj<typeof ProfileCard> = {
  args: {
    loginId: "test",
    location: "개포 클러스터 내부",
    userComment: "안녕하세요",
    profileImageSrc:
      "https://cards.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    size: "medium",
  },
};

export const DefaultProfileCard: StoryObj<typeof ProfileCard> = {
  args: {
    loginId: "aaaaa",
  },
};
