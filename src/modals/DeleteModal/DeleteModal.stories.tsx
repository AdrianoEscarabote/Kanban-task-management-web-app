import store from "../../redux/store";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { DeleteModalTypes } from "./DeleteModalTypes";
import { action } from "@storybook/addon-actions"
import DeleteModal from ".";

export default {
  title: "shared/DeleteModal",
  component: DeleteModal,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          {Story()}
        </Provider>
      )
    }
  ]
} as Meta<DeleteModalTypes>

export const Primary: React.FC<DeleteModalTypes> = () => {
  // Use o action decorator para criar uma função simulada de closeModal
  const closeModal = action("closeModal");
  
  // Renderize o componente DeleteModal com a função simulada como prop
  return <DeleteModal closeModal={closeModal} NameToDelete="Example Board" />;
};