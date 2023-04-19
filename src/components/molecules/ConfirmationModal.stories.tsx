import type { Meta, StoryObj } from "@storybook/react";

import ConfirmationModal from "./ConfirmationModal";

const meta: Meta<typeof ConfirmationModal> = {
  title: "ConfirmationModal",
  component: ConfirmationModal,
};

export default meta;
type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
  args: {
    open: true,
    message: "Message",
    handleClose: () => {},
    handleSuccess: () => {},
  },
};
