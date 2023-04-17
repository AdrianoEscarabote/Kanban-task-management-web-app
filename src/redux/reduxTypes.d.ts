interface themeReducer {
  theme: string
}

interface reducerNameBoard {
  nameBoard: string
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
  tasks: Task[];
}

interface Board {
  name: string;
  columns: Column[];
}

interface BoardDataType {
  boards: Board[];
}

interface rootState {
  themeReducer: themeReducer,
  reducerNameBoard: reducerNameBoard,
  boardSlice: BoardDataType
}

export { rootState, BoardDataType }