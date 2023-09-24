import type { Meta, StoryObj } from "@storybook/react";

import { Size } from "@/Types/enums";

import ProfileCard, { ProfileCardProps } from "./ProfileCard";
import IconButton from "@/atoms/Buttons/IconButton";

import FunctopnButtonIcon from "&/Icons/functionButton.svg";

/**
 * - 사용자의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 * - 다른 사용자의 컴포넌트로 사용합니다.
 * - src가 주어지지 않으면 기본 프로필사진을 표시합니다.
 * - active가 true이면 테두리와 활성화아이콘을 표시합니다.
 * - 친구가 아닐경우 친구추가 버튼을 표시하고 친구일경우 드롭다운 메뉴를 열 수 있는 버튼을 표시합니다.
 */

export default {
  title: "Molecules/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
} as Meta;

export const BasicProfileCard: StoryObj<typeof ProfileCard> = {
  args: {
    user: {
      login: "lorem",
      profileImgSrc:
        "https://cards.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      location: "개포 클러스터 내부",
      comment: "안녕하세요",
      locationUsageAgreement: true,
      isFriend: true,
    },
    size: Size.Medium,
  },
};

export const NotFriendProfileCard: StoryObj<typeof ProfileCard> = {
  args: {
    user: {
      login: "ipsum",
      profileImgSrc:
        "https://cards.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      location: "개포 클러스터 내부",
      // comment: "안녕하세요",
      locationUsageAgreement: false,
      isFriend: false,
    },
    size: Size.Medium,
  },
};

export const Mykang: StoryObj<typeof ProfileCard> = {
  args: {
    user: {
      login: "mykang",
      profileImgSrc:
        "https://cdn.intra.42.fr/users/7ba3314a458b65fd50c749fd184301da/mykang.jpg",
      location: "개포",
      comment: "안녕하세요",
      locationUsageAgreement: true,
      isFriend: true,
    },
    size: Size.Medium,
    children: <IconButton Icon={FunctopnButtonIcon} />,
  },
};
