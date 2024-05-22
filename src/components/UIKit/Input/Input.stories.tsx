import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import "../../../styles/variables-for-storybook.scss";
import "../../../styles/index.scss";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Password: Story = {
  args: {
    label: "password",
    type: "password",
    limit: 10,
    placeholder: "type your password...",
    value: "123123",
  },
};

export const Valid: Story = {
  args: {
    label: "field",
    placeholder: "type your value...",
    successMessage: "success",
    value: "123123",
  },
};

export const Invalid: Story = {
  args: {
    label: "field",
    placeholder: "type your value...",
    successMessage: "success",
    errorMessage: "error",
    value: "123123",
  },
};
