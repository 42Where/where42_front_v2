import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

/**
 * - 외부 hook을 받아 체크박스를 표시합니다
 * - IconButton을 사용합니다
 */

export default {
  title: "Atoms/Buttons/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} as Meta;

export const CheckboxCheck: StoryObj<typeof Checkbox> = {
  args: {
    isChecked: true,
    size: "medium",
  },
};

export const CheckboxUncheck: StoryObj<typeof Checkbox> = {
  args: {
    isChecked: false,
    size: "medium",
  },
};
