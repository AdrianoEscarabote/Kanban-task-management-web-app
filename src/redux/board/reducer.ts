import { BoardDataType } from "./boardTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

// estado inicial 
const initialState: BoardDataType = { boards: [] }

// cria o slice usando o createSlice
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<BoardDataType>) => {
      // Atualiza o estado com os dados recebidos da ação
      state.boards = action.payload.boards
    }
  }
})

export const { setBoards } = boardSlice.actions

export default boardSlice.reducer