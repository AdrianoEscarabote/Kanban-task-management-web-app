import themeActionTypes from "./action-types";
import { themeTypes } from "./themeProps";

export const themeLight = (payload: themeTypes) => ({
  type: themeActionTypes.light,
  payload: payload,
});

export const themeDark = (payload: themeTypes) => ({
  type: themeActionTypes.dark,
  payload: payload,
});

export const setLocalStorageValue = (payload: string) => ({
  type: themeActionTypes.setLocalStorageValue,
  payload: payload,
});