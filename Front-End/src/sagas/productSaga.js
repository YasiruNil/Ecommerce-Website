import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
  GET_PRODUCTS_REQUEST,
  CREATE_PRODUCT_REQUEST,
  GET_PRODUCTS_SOLD_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_ARRIVAL_REQUEST,
  UPDATE_SINGLE_PRODUCT_REQUEST,
  DELETE_SINGLE_PRODUCT_REQUEST,
  FETCH_RELATED_PRODUCTS_REQUEST,
  GET_PRODUCTS_SOLD_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST_SUCCESS,
  GET_SINGLE_PRODUCT_REQUEST_FAIL,
  GET_PRODUCTS_SOLD_REQUEST_SUCCESS,
  GET_PRODUCTS_ARRIVAL_REQUEST_FAIL,
  UPDATE_SINGLE_PRODUCT_REQUEST_FAIL,
  DELETE_SINGLE_PRODUCT_REQUEST_FAIL,
  GET_SINGLE_PRODUCT_REQUEST_SUCCESS,
  FETCH_RELATED_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_ARRIVAL_REQUEST_SUCCESS,
  UPDATE_SINGLE_PRODUCT_REQUEST_SUCCESS,
  DELETE_SINGLE_PRODUCT_REQUEST_SUCCESS,
  FETCH_RELATED_PRODUCTS_REQUEST_SUCCESS,
} from "../action_types/index"
import {
  getProducts,
  createProduct,
  getSingleProduct,
  getProductSorted,
  updateSingleProduct,
  deleteSingleProduct,
  fetchRelatedProducts,
  getProductSortedByArrival,
} from "../services/productService"

export function* watcherCreateProduct() {
  yield takeLatest(CREATE_PRODUCT_REQUEST, workerCreateProduct)
}
export function* watcherGetProductsSold() {
  yield takeLatest(GET_PRODUCTS_SOLD_REQUEST, workerGetProductsSold)
}
export function* watcherGetProductsArrival() {
  yield takeLatest(GET_PRODUCTS_ARRIVAL_REQUEST, workerGetProductsArrival)
}
export function* watcherGetProducts() {
  yield takeLatest(GET_PRODUCTS_REQUEST, workerGetProducts)
}
export function* watcherGetSingleProduct() {
  yield takeLatest(GET_SINGLE_PRODUCT_REQUEST, workerGetSingleProduct)
}
export function* watcherFetchRelatedProducts() {
  yield takeLatest(FETCH_RELATED_PRODUCTS_REQUEST, workerFetchRelatedProducts)
}
export function* watcherDeleteSingleProduct() {
  yield takeLatest(DELETE_SINGLE_PRODUCT_REQUEST, workerDeleteSingleProduct)
}
export function* watcherUpdateSingleProduct() {
  yield takeLatest(UPDATE_SINGLE_PRODUCT_REQUEST, workerUpdateSingleProduct)
}

function* workerCreateProduct(payload) {
  const { data } = payload
  const { _idOfTheUser, token, formData } = data
  const result = yield createProduct(_idOfTheUser, formData, token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: CREATE_PRODUCT_REQUEST_SUCCESS,
      response: result.data.content,
    })
    toast.success(result.data.status)
  } else if (result.data.statusCode === 400) {
    yield put({ type: CREATE_PRODUCT_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerGetProductsSold(payload) {
  const { data } = payload
  const result = yield getProductSorted(data)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_PRODUCTS_SOLD_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_PRODUCTS_SOLD_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerGetProductsArrival(payload) {
  const { data } = payload
  const result = yield getProductSortedByArrival(data)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_PRODUCTS_ARRIVAL_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_PRODUCTS_ARRIVAL_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerGetProducts() {
  const result = yield getProducts()
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_PRODUCTS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_PRODUCTS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerGetSingleProduct(payload) {
  const {data} = payload
  console.log(data)
  const result = yield getSingleProduct(data)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_SINGLE_PRODUCT_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_SINGLE_PRODUCT_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerFetchRelatedProducts(payload) {
  const {data} = payload
  console.log(data)
  const result = yield fetchRelatedProducts(data)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: FETCH_RELATED_PRODUCTS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: FETCH_RELATED_PRODUCTS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerDeleteSingleProduct(payload) {
  const {data} = payload
  const {productId,_id,token} = data
  const result = yield deleteSingleProduct(productId,_id,token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: DELETE_SINGLE_PRODUCT_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: GET_PRODUCTS_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: DELETE_SINGLE_PRODUCT_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerUpdateSingleProduct(payload) {
  const {data} = payload
  console.log(data)
  const {productId,_id,token,newFormData } = data
  const result = yield updateSingleProduct(productId,_id,token,newFormData )
  if (result && result.data.statusCode === 200) {
    yield put({
      type: UPDATE_SINGLE_PRODUCT_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: GET_PRODUCTS_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: UPDATE_SINGLE_PRODUCT_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
