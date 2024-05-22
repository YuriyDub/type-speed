import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import "../../../styles/variables-for-storybook.scss";

const meta: Meta<typeof Divider> = {
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    variant: "vertical",
  },
};
