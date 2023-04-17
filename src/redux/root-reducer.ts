import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/reducer";
import reducerNameBoard from "./nameBoard/reducer";
import boardSlice from "./board/reducer" 

const rootReducer = combineReducers({
  themeReducer,
  reducerNameBoard,
  boardSlice,
}) 

export default rootReducer