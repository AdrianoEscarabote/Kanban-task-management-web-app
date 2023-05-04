interface EditTaskModalProps {
  closeModal: () => void;
  task: string
}

interface Subtask {
  title: string;
  isCompleted: boolean;
  id: number;
}

type formData = {
  title: string;
  subtasks: string[];
}

export { EditTaskModalProps, Subtask, formData }