import type { Meta, StoryObj } from "@storybook/react"
import Header from "./Header"
import { Provider } from "react-redux"
import store from "../../redux/store"
import { HeaderProps } from "./HeaderProps"

export default {
  title: "components/Header",
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    open: true
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
} as Meta<HeaderProps>


export const Primary: StoryObj = {}

export const HeaderNoTrue: StoryObj = {
  args: {
    open: false
  }
}