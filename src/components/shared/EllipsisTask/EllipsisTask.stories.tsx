import { Meta, StoryObj } from "@storybook/react";
import EllipsisTask from "./index";
import { Provider } from "react-redux";
import store from "../../../../.storybook/storybook-store";

export default {
  title: "shared/Ellipsis Task",
  component: EllipsisTask,
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