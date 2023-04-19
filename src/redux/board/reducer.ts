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
    }
  }
});

export const { setBoards, createNewBoard, deleteBoard, editBoard } = boardSlice.actions

export default boardSlice.reducer