import { BoardDataType, createNewBoardType, EditBoardType, NameToDelete } from "./boardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

// estado inicial 
const initialState: BoardDataType = { boards: [] }

// cria o slice usando o createSlice
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<BoardDataType>) => {
      state.boards = action.payload.boards;
    },
    createNewBoard: (state, action: PayloadAction<createNewBoardType>) => {
      const { name, boards } = action.payload;
      state.boards.push({ name: name, columns: boards })
    },
    deleteBoard: (state, action: PayloadAction<NameToDelete>) => {
      state.boards = state.boards.filter((board) => board.name !== action.payload.name)
    },
    deleteTask: (state, action: PayloadAction<NameToDelete>) => {
      const { name } = action.payload
      state.boards = state.boards.map((board) => {
        const newColumns = board.columns.map((col) => {
          if (!col.tasks) return col;

          const newTasks = col.tasks.filter((task) => task.title !== name)

          return {
            ...col,
            tasks: newTasks.length ? newTasks : undefined
          }
        })

        return {
          ...board,
          columns: newColumns
        }
      })
    },
    editBoard: (state, action: PayloadAction<EditBoardType>) => {

      const { nameBoard, nameToAdd, boards } = action.payload

      state.boards = state.boards.map(board => {
        if (board.name === nameBoard) {
          return {
            ...board,
            name: nameToAdd,
            columns: boards.map(newBoard => {
              const existingColumn = board.columns.find(col => col.name === newBoard.name)

              if (existingColumn){
                return { 
                  ...existingColumn,
                  name: newBoard.name
                 }
              } else {
                return { ...board, name: newBoard.name }
              }      
               
            })
          }
        }
        return board
      })
    },
    addNewTask: (state, action: PayloadAction<EditBoardType>) => {
      
    }
  }
});

export const { setBoards, createNewBoard, deleteBoard, editBoard, deleteTask, addNewTask } = boardSlice.actions

export default boardSlice.reducer