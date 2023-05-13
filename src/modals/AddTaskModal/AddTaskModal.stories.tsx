import { Meta, StoryObj } from "@storybook/react";
import AddTaskModal from ".";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";

export default {
  title: "Modals/Add task",
  component: AddTaskModal,
  parameters: {
    layout: 'fullscreen',
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