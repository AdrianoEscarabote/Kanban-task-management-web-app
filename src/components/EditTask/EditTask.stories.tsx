import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";
import EditTaskModalProps from "./EditTaskModalProps"
import EditTask from "./index"

export default {
  title: "Modals/Edit Task",
  component: EditTask,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeModal: () => {},
    task: "Design settings and search pages",
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