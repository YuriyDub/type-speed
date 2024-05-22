import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "../../../styles/index.scss";
import "../../../styles/variables-for-storybook.scss";

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
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    shape: "rounded",
    text: "Outlined Button",
    size: "medium",
    disabled: false,
  },
};
