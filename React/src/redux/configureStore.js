import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "./reducers";
import middlewares from "./middlewares";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export const createConfigureStore = () => {
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: getDefaultMiddleware => {
      return [
        ...getDefaultMiddleware({ thunk: false }),
        sagaMiddleware,
        ...middlewares(history),
      ];
    },
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(rootSaga);

  return { store };
};
