interface AddBoardModalProps {
  closeModal: () => void
}

interface Column {
  name: string;
}

interface ActionProps {
  name: string
  columns: Column[]
}

type FormData = {
  nameInput: string;
  columns: string[];
};

export { AddBoardModalProps, ActionProps, FormData }