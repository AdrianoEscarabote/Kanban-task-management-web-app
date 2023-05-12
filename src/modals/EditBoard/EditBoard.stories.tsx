import { Meta } from "@storybook/react"
import EditBoard from "."
import { EditBoardProps } from "./EditBoardProps"
import { Provider } from "react-redux"
import store from "../../redux/store"
import { action } from "@storybook/addon-actions"
 
export default {
  title: "shared/EditBoard",
  component: EditBoard,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          {Story()}
        </Provider>
      )
    }
  ]
} as Meta<EditBoardProps>

export const Primary: React.FC<EditBoardProps> = () => {
  // Use o action decorator para criar uma função simulada de closeModal
  const closeModal = action("closeModal");
  
  // Renderize o componente EditBoard com a função simulada como prop
  return <EditBoard closeModal={closeModal} />;
};