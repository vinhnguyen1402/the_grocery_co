export const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";

export const SET_PRODUCT_LIST_REDUCER = "SET_PRODUCT_LIST_REDUCER";

export const getProductList = () => {
  return {
    type: GET_PRODUCT_LIST_REQUEST,
  };
};

export const setProductListReducer = (data) => {
  return {
    type: SET_PRODUCT_LIST_REDUCER,
    data,
  };
};
