import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import "../../../index.scss";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
  },
};
