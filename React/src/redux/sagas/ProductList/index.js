import { all } from "redux-saga/effects";
import getProductList from "./getProductList";

export const productListSagas = function* root() {
  yield all([getProductList()]);
};
