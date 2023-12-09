import { produce } from "immer";
import { SET_PRODUCT_LIST_REDUCER } from "./actionTypes";

const initialState = {
  productList: [],
};

export const productListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action?.type) {
      case SET_PRODUCT_LIST_REDUCER:
        draft.productList = action?.data;
        break;
      default:
        return state;
    }
  });
