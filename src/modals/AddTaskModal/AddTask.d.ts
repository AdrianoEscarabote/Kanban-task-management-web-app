interface AddTaskModalTypes {
  closeModal: () => void
}

interface Subtask {
  id: number;
  value: string;
}

type formData = {
  title: string;
  status: string;
  subtasks: Subtask[];
}

export { AddTaskModalTypes, formData }