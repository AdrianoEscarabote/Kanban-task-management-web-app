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

interface EditTaskType {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
  oldName: string;
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

// change status task interface
interface ChangeStatusType {
  description: string;
  boardName: string;
  name: string;
  status: string;
  subtasks: Subtask[];
}

// create new task interface
interface createNewTask {
  nameColumn: string;
  Task: Task
}

interface Column {
  name: string;
  tasks: Task[];
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
  columns: Column[]
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

interface ChangeRadioChecked {
  title: string;
  isCompleted: boolean;
}

interface DragTaskTypes {
  currentColIndex: number;
  prevColIndex: number;
  taskIndex: number;
  boardName: string;
}

export { DragTaskTypes, EditTaskType, ChangeRadioChecked, Subtask, Board, Task, Column, ChangeStatusType, createNewTask, BoardEditNewType, intialState, ActionProps, BoardDataType, createNewBoardType, NameToDelete, EditBoardType }