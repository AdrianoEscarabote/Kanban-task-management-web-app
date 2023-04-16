import { ActionProps } from "../theme/themeProps";
import nameBoardTypes from "./action-types";
import { initialStateTypes } from "./initialStateTypes"; 

const initialState = {
  nameBoard: ""
} 

const reducerNameBoard = (state: initialStateTypes = initialState, action: ActionProps) => {
  switch(action.type) {
    case nameBoardTypes.setBoardName:
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