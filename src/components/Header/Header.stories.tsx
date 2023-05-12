import { Meta, StoryObj } from "@storybook/react"
import Header from "."
import { Provider } from "react-redux"
import store from "../../redux/store"

export default {
  title: "components/Header",
  component: Header,
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
