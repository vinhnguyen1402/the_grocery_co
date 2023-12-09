import loggerMiddleware from "../middlewares/logger";
import routerMiddleware from "../middlewares/router";
import sagaMiddleware from "../middlewares/saga";

export default history => {
  if (process.env.NODE_ENV !== "production") {
    return [routerMiddleware(history), loggerMiddleware, sagaMiddleware];
  } else {
    return [routerMiddleware(history), sagaMiddleware];
  }
};
