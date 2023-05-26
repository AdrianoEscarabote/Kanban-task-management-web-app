import { rootState } from "@/redux/reduxTypes";
import { setLocalStorageValue } from "../../redux/theme/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: rootState) => state.themeReducer);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme && localStorageTheme !== theme) {
      dispatch(setLocalStorageValue(localStorageTheme));
    }
  }, [dispatch, theme]);

  return theme;
};