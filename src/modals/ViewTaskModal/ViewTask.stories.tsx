import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";
import ViewTaskModal from ".";

export default {
  title: "Modals/View Task",
  component: ViewTaskModal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    taskTarget: "Add account management endpoints",
    openDeleteTaskModal: () => {},
    closeModal: () => {},
    openEditTaskModal: () => {}
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