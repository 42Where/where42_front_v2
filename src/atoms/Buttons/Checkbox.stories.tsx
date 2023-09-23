import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

/**
 * - 외부 hook을 받아 체크박스를 표시합니다
 */

export default {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} as Meta;

export const CheckboxStory: StoryObj<typeof Checkbox> = {
  args: {},
};
