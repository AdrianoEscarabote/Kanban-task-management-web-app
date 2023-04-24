interface intialState {
  name: string
  number: number
}

interface boardTypes {
  boards: Board[];
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
  isCompleted?: boolean;
}


// create new task interface
interface createNewTask {
  nameColumn: string;
  Task: Task
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

// createNewBoard
interface createNewBoardType {
  name: string;
  boards: Board[]
}

// EditBoard
interface EditBoardType {
  nameBoard: string
  nameToAdd: string
  boards: BoardEditNewType[]
}

interface BoardEditNewType {
  name: string
}

interface ColumnNewBoard {
  name: string;
}

export { createNewTask, BoardEditNewType, intialState, ActionProps, BoardDataType, createNewBoardType, NameToDelete, EditBoardType }