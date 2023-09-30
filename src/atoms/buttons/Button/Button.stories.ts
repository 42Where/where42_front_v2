import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Atoms/Buttons/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    children: "Secondary",
  },
};

export const Large: Story = {
  args: {
    size: "Large",
    children: "Large",
  },
};

export const Small: Story = {
  args: {
    size: "Small",
    children: "Small",
  },
};

/**
 * TODO: icon support
 */
// export const WithIcon: Story = {
//   args: {
//     children: "With Icon",
//     icon: "HelpIcon",
//   },
// };
