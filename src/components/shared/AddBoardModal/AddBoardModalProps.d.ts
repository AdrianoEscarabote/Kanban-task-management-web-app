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

export { AddBoardModalProps, ActionProps }