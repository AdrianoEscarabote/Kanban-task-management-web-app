import { Meta, StoryObj } from "@storybook/react";
import SidebarDesktop from ".";
import { Provider } from "react-redux";
import store from "../../../.storybook/storybook-store";

export default {
  title: "components/Side bar Desktop",
  component: SidebarDesktop,
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