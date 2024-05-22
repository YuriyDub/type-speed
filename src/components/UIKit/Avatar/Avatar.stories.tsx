import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import "../../../styles/variables-for-storybook.scss";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
