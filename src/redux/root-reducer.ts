import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/reducer";

const rootReducer = combineReducers({
  themeReducer,
}) 

export default rootReducer