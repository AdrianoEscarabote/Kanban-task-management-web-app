import { Meta, StoryObj } from "@storybook/react";
import Ellipsis from "./Ellipsis";
import { Provider } from "react-redux";
import store from "../../../redux/store";

export default {
  title: "shared/Ellipsis",
  component: Ellipsis,
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