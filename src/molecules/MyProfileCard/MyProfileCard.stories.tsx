import type { Meta, StoryObj } from "@storybook/react";

import MyProfileCard from "./MyProfileCard";
import { DemoUser } from "../../../test/DemoUser";
import { useEffect } from "react";
import useMyDataStore from "@/stores/useMyDataStore";

/**
 * - 본인의 프로필사진과 아이디, 위치, 한줄소개를 표시하는 컴포넌트입니다.
 */

export default {
  title: "Molecules/MyProfileCard",
  component: MyProfileCard,
  tags: ["autodocs"],
} as Meta;

// TODO: zustand store 별도로 적용되도록 구현 필요
export const Default: StoryObj<typeof MyProfileCard> = {
  decorators: [
    (Story) => {
      const { setMyData } = useMyDataStore((state) => state);
      useEffect(() => {
        setMyData({
          ...DemoUser,
          attendanceOnly: false,
          size: "medium",
        });
      }, [setMyData]);
      return <Story />;
    },
  ],
  args: {
    size: "medium",
  },
};

export const WithoutComment: StoryObj<typeof MyProfileCard> = {
  decorators: [
    (Story) => {
      const { setMyData } = useMyDataStore((state) => state);
      useEffect(() => {
        setMyData({
          ...DemoUser,
          comment: "",
          attendanceOnly: false,
          size: "medium",
        });
      }, [setMyData]);
      return <Story />;
    },
  ],
  args: {
    size: "medium",
  },
};

export const Skeleton: StoryObj<typeof MyProfileCard> = {
  args: {
    size: "medium",
  },
};
