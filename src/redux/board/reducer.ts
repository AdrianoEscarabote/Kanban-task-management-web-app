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
            columns: boards.map(board => ({ name: board.name }))
          }
        }
        return board
      })
    }
  }
});

export const { setBoards, createNewBoard, deleteBoard, editBoard } = boardSlice.actions

export default boardSlice.reducer