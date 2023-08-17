import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import MainTemplate from "./MainTemplate";

const meta = {
  title: "Components/templates/MainTemplate",
  component: MainTemplate,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MainTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const headerEl = () => {
  return (
    <div
      style={{
        backgroundColor: "green",
        height: "64px",
        flex: "0 0 auto",
        width: "100%",
      }}
    >
      header
    </div>
  );
};
const bodyEl = () => {
  return (
    <div
      style={{
        backgroundColor: "green",
        flex: 1,
        width: "100%",
      }}
    >
      body
    </div>
  );
};

export const Default: Story = {
  args: {
    headerComponent: () => headerEl(),
    bodyComponent: () => bodyEl(),
  },
  render: (args) => (
    <div
      style={{
        width: "1000px",
        height: "400px",
        resize: "both",
        overflow: "auto",
      }}
    >
      <MainTemplate {...args} />
    </div>
  ),
};
