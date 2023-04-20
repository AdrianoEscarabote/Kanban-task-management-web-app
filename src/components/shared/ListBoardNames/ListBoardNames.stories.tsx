import { Meta, StoryObj } from "@storybook/react";
import ListBoardNames from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "shared/ListBoardNames",
  component: ListBoardNames,
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