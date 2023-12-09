import { put, takeLatest, call } from "redux-saga/effects";
import { GET_PRODUCT_LIST_REQUEST, setProductListReducer } from "../../reducers/ProductList/actionTypes";
import ApiService from "../../../services/api_services";
// import { ToastService } from "services/toast_service";

function* requestGetProductList(data) {
  try {
    // yield put(setLoading(true));
    const response = yield call(ApiService.GET, `/products/`, { skip: 0, limit: 100 });
    yield put(setProductListReducer(response));
  } catch (error) {
    yield console.log(error);
    // yield ToastService.error("Sorry, an error occurred.");
  } finally {
    // yield put(setLoading(false));
  }
}

function* getProductList() {
  yield takeLatest(GET_PRODUCT_LIST_REQUEST, requestGetProductList);
}

export default getProductList;
