import { BoardDataType, createNewBoardType, NameToDelete } from "./boardTypes";
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
    }
  }
});

export const { setBoards, createNewBoard, deleteBoard } = boardSlice.actions

export default boardSlice.reducer