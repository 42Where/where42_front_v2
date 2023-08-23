import { Meta, StoryObj } from "@storybook/react";

import LoginMain from "./LoginMain";

const meta = {
  title: "Page/Login",
  component: LoginMain,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoginMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
