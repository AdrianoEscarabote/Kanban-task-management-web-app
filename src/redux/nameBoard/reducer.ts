import { ActionProps } from "../theme/themeProps";
import nameBoardTypes from "./action-types";
import { initialStateTypes } from "./initialStateTypes"; 

const initialState = {
  nameBoard: ""
} 

const reducerNameBoard = (state: initialStateTypes = initialState, action: ActionProps) => {
  switch(action.type) {
    case nameBoardTypes.setBoardName:
      localStorage.setItem("nameBoard", action.payload)
      return {
        ...state,
        nameBoard: action.payload
      }
    default: 
      return {
        ...state
      }
  }
}

export default reducerNameBoard;