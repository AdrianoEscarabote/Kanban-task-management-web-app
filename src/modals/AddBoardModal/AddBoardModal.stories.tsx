import { Meta } from "@storybook/react"
import { AddBoardModalProps } from "./AddBoardModalProps"
import AddBoardModal from "."
import { Provider } from "react-redux"
import store from "../../redux/store"
import { action } from "@storybook/addon-actions"

export default {
  title: "Modals/Add Board",
  component: AddBoardModal,
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
} as Meta<AddBoardModalProps>

export const Primary: React.FC<AddBoardModalProps> = () => {
  // Use o action decorator para criar uma função simulada de closeModal
  const closeModal = action("closeModal");
  
  // Renderize o componente AddBoardModal com a função simulada como prop
  return <AddBoardModal closeModal={closeModal} />;
};