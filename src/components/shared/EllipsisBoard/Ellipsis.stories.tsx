import { Meta, StoryObj } from "@storybook/react";
import Ellipsis from ".";
import { Provider } from "react-redux";
import store from "../../../redux/store";

export default {
  title: "shared/Ellipsis Board",
  component: Ellipsis,
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

export const Default: StoryObj = {}