import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    color: "default",
    title: "Header Title",
  },
};

export const Transparent: Story = {
  args: {
    color: "transparent",
    title: "Header Title",
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
    title: "Header Title",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    title: "Header Title",
  },
};
