import type { Meta, StoryObj } from "@storybook/react";

import TextBox from "./TextBox";

/**
 * 텍스트 컴포넌트
 */

export default {
  title: "Atoms/TextBox",
  component: TextBox,
  tags: ["autodocs"],
} as Meta;

export const TextBox1: StoryObj<typeof TextBox> = {
  args: {
    text: "개포 어딘가",
    primary: true,
    size: "medium",
  },
};

export const TextBox2: StoryObj<typeof TextBox> = {
  args: {
    text: "퇴근",
    size: "medium",
  },
};
