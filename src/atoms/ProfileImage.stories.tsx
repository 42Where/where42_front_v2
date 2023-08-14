import type { Meta, StoryObj } from "@storybook/react";

import ProfileImage from "./ProfileImage";

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
