interface intialState {
  name: string
  number: number
}

interface boardTypes {
  board: []
}

interface ActionProps {
  type: string,
  payload: {
    name: string
    columns: Column[]
  }
}

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface Column {
  name: string;
  tasks?: Task[];
}

interface Board {
  name: string;
  columns: Column[];
}

interface BoardDataType {
  boards: Board[]; 
}
interface NameToDelete {
  name: string
}

interface createNewBoardType {
  name: string;
  boards: Board[]
}

interface ColumnNewBoard {
  name: string;
}

export { intialState, ActionProps, BoardDataType, createNewBoardType, NameToDelete }