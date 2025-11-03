import { configureStore, type Middleware } from "@reduxjs/toolkit";
import type { AnyAction, Dispatch } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const typedLogger = logger as unknown as Middleware<
  unknown,
  unknown,
  Dispatch<AnyAction>
>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(typedLogger),
});

export default store;
