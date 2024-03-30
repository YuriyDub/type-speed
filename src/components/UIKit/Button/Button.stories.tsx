import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "../../../index.scss";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    shape: "rounded",
    text: "Primary Button",
    size: "medium",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    shape: "rounded",
    text: "Outlined Button",
    size: "medium",
  },
};
