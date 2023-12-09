import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { productListReducer  } from "./ProductList";

const createRootReducer = (history) => {
  const reducers = combineReducers({
    productList: productListReducer,
    router: connectRouter(history),
  });
  return reducers;
};

export default createRootReducer;
