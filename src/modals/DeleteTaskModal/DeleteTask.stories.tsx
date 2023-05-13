import { Meta, StoryObj } from "@storybook/react";
import DeleteTaskModal from ".";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";

export default {
  title: "Modals/Delete Task",
  component: DeleteTaskModal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeModal: () => {},
    NameToDelete: "Add account management endpoints"
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          {Story()}
        </Provider>
      )
    }
  ]
} as Meta

export const Primary: StoryObj = {}