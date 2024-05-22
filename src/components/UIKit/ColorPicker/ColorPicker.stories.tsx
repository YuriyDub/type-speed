import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";
import "../../../styles/variables-for-storybook.scss";
import "../../../styles/index.scss";

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Password: Story = {
  args: {
    label: "color",
    variable: "primary",
  },
};
