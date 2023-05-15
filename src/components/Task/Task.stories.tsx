import { Meta, StoryObj } from "@storybook/react";
import Task from ".";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";

export default {
  title: "components/Task",
  component: Task,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    taskName: "Build UI for onboarding flow",
    taskIndex: 0, 
    colIndex: 0,
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