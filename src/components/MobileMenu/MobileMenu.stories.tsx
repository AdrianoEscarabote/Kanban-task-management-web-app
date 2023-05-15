import { Meta, StoryObj } from "@storybook/react";
import MobileMenu from ".";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";

export default {
  title: "components/Mobile Menu",
  component: MobileMenu,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    handleModal: () => {},
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