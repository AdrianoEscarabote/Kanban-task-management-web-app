import themeActionTypes from "./action-types";
import { initialStateProps, ActionProps } from "./themeProps";

const initialState = {
  theme: "dark"
}

const themeReducer = (state: initialStateProps = initialState, action: ActionProps) => {
  switch(action.type) {
    case themeActionTypes.dark: 
      return {
        ...state,
        theme: action.payload
      }
    case themeActionTypes.light:
      return {
        ...state,
        theme: action.payload
      }
    default:
      return {
      ...state
    }
  }
} 

export default themeReducer