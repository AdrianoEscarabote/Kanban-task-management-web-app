interface EditTaskModalProps {
  closeModal: () => void;
  task: string
}

interface Subtask {
  title: string;
  isCompleted: boolean;
  id: number;
}

export { EditTaskModalProps, Subtask }