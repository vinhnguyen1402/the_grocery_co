import { all } from "redux-saga/effects";

import { productListSagas } from "./ProductList";

export const rootSaga = function* root() {
  yield all([productListSagas()]);
};
