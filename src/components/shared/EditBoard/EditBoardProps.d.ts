interface EditBoardProps {
  closeModal: () => void,
}

interface Columns {
  id: number;
  value: string;
}

type formData = {
  nameBoard: string;
  columns: Columns[];
}

export { EditBoardProps, formData }