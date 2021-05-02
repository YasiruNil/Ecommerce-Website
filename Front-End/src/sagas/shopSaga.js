import { toast } from "react-toastify";
import { put, takeLatest } from "redux-saga/effects";
import {
  FETCH_FILTERED_ITEMS_REQUEST,
  SEARCH_FILTERED_PRODUCT_REQUEST,
  FETCH_FILTERED_ITEMS_REQUEST_FAIL,
  SEARCH_FILTERED_PRODUCT_REQUEST_FAIL,
  FETCH_FILTERED_ITEMS_REQUEST_SUCCESS,
  SEARCH_FILTERED_PRODUCT_REQUEST_SUCCESS,
} from "../action_types/index";
import { fetchProductFilted, fetchSearchFilter } from "../services/shopService";

export function* watcherFilterOutProduct() {
  yield takeLatest(FETCH_FILTERED_ITEMS_REQUEST, workerFilterOutProduct);
}
export function* watcherSearchFilter() {
    yield takeLatest(SEARCH_FILTERED_PRODUCT_REQUEST, workerSearchFilter);
  }

function* workerFilterOutProduct(payload) {
  const { data } = payload;
  const result = yield fetchProductFilted(data);
  console.log(result);
  if (result && result.data.statusCode === 200) {
    yield put({
      type: FETCH_FILTERED_ITEMS_REQUEST_SUCCESS,
      response: result.data.content,
    });
  } else if (result.data.statusCode === 400) {
    yield put({ type: FETCH_FILTERED_ITEMS_REQUEST_FAIL });
    toast.error(result.data.status);
  }
}
function* workerSearchFilter(payload) {
    const { data } = payload;
    const result = yield fetchSearchFilter(data);
    console.log(result);
    if (result && result.data.statusCode === 200) {
      yield put({
        type: SEARCH_FILTERED_PRODUCT_REQUEST_SUCCESS,
        response: result.data.content, additionalData:result.data.size
      });
    } else if (result.data.statusCode === 400) {
      yield put({ type: SEARCH_FILTERED_PRODUCT_REQUEST_FAIL });
      toast.error(result.data.status);
    }
  }
  
