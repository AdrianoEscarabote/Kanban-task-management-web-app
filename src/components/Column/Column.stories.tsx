import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";
import Column from ".";

export default {
  title: "components/Column",
  component: Column,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    colIndex: 0
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