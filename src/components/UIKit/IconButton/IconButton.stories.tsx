import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { MdSearch } from "react-icons/md";
import "../../../styles/variables-for-storybook.scss";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    icon: <MdSearch />,
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    icon: <MdSearch />,
    disabled: false,
  },
};
