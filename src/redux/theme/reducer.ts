import themeActionTypes from "./action-types";
import { initialStateProps, ActionProps } from "./themeProps";

/* const localStorageTheme = typeof window !== 'undefined' && window.localStorage.getItem("theme");

const initialState = {
  theme: localStorageTheme ? localStorageTheme : "dark"
} */


const initialState = {
  theme: "dark"
}

const themeReducer = (state: initialStateProps = initialState, action: ActionProps) => {
  switch(action.type) {
    case themeActionTypes.dark:
      localStorage.setItem("theme", "dark")
      return {
        ...state,
        theme: action.payload
      }
    case themeActionTypes.light:
      localStorage.setItem("theme", "light")
      return {
        ...state,
        theme: action.payload
      }
    case themeActionTypes.setLocalStorageValue: 
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