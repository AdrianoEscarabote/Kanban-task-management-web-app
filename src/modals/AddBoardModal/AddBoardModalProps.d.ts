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

interface Columns {
  id: number;
  value: string;
}

export { Columns, AddBoardModalProps, ActionProps, FormData }