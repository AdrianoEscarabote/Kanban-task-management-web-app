interface ViewTaskModalProps {
  taskTarget: string;
  closeModal: () => void;
  closeElipsis: () => void;
}

interface sideTaskTypes {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

export { ViewTaskModalProps, sideTaskTypes }