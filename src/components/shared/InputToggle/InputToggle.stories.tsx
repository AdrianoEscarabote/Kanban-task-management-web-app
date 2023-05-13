import { Meta, StoryObj } from "@storybook/react";
import InputToggle from ".";
import { Provider } from "react-redux";
import store from "../../../../.storybook/storybook-store";

export default {
  title: "shared/Input Toggle",
  component: InputToggle,
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