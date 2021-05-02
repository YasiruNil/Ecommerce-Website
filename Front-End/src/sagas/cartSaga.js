import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
  GET_STATUS_REQUEST,
  CREATE_ORDER_REQUEST,
  GET_ALL_ORDERS_REQUEST,
  GET_STATUS_REQUEST_FAIL,
  PROCESS_PAYMENT_REQUEST,
  CREATE_ORDER_REQUEST_FAIL,
  GET_STATUS_REQUEST_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST,
  GET_ALL_ORDERS_REQUEST_FAIL,
  GET_BRAINTREE_TOKEN_REQUEST,
  CREATE_ORDER_REQUEST_SUCCESS,
  PROCESS_PAYMENT_REQUEST_FAIL,
  REMOVE_PROCESS_PAYMENT_REQUEST,
  GET_ALL_ORDERS_REQUEST_SUCCESS,
  PROCESS_PAYMENT_REQUEST_SUCCESS,
  GET_BRAINTREE_TOKEN_REQUEST_FAIL,
  UPDATE_ORDER_STATUS_REQUEST_FAIL,
  UPDATE_ORDER_STATUS_REQUEST_SUCCESS,
  GET_BRAINTREE_TOKEN_REQUEST_SUCCESS,
  REMOVE_PROCESS_PAYMENT_REQUEST_SUCCESS,
} from "../action_types/index"
import { getStatus, getAllOrders, createOrder, getBraintreeToken, processPayment, updateOrderStatus } from "../services/cartService"

export function* watcherGetBraintreeToken() {
  yield takeLatest(GET_BRAINTREE_TOKEN_REQUEST, workerGetBraintreeToken)
}
export function* watcherProcessPayment() {
  yield takeLatest(PROCESS_PAYMENT_REQUEST, workerProcessPayment)
}
export function* watcherCreateOrder() {
  yield takeLatest(CREATE_ORDER_REQUEST, workerCreateOrder)
}
export function* watcherGetAllOrders() {
  yield takeLatest(GET_ALL_ORDERS_REQUEST, workerGetAllOrders)
}
export function* watcherGetStatus() {
  yield takeLatest(GET_STATUS_REQUEST, workerGetStatus)
}
export function* watcherUpdateOrderStatus() {
  yield takeLatest(UPDATE_ORDER_STATUS_REQUEST, workerUpdateOrderStatus)
}
export function* watcherRemoveProcessPayment() {
  yield takeLatest(REMOVE_PROCESS_PAYMENT_REQUEST, workerRemoveProcessPayment)
}

function* workerGetBraintreeToken(payload) {
  const { data } = payload
  const { userId, userToken } = data
  const result = yield getBraintreeToken(userId,userToken)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_BRAINTREE_TOKEN_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 500) {
    yield put({ type: GET_BRAINTREE_TOKEN_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerProcessPayment(payload) {
  const { data } = payload
  const { userId, userToken, paymentData} = data
  const result = yield processPayment(userId, userToken, paymentData)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: PROCESS_PAYMENT_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: PROCESS_PAYMENT_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerCreateOrder(payload) {
  const { data } = payload
  console.log(data)
  const { userId, userToken, createOrderData} = data
  const result = yield createOrder(userId, userToken, createOrderData)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: CREATE_ORDER_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: REMOVE_PROCESS_PAYMENT_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: CREATE_ORDER_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerGetAllOrders(payload) {
  const { data } = payload
  const { _id, token } = data
  const result = yield getAllOrders(_id,token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_ALL_ORDERS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_ALL_ORDERS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerGetStatus(payload) {
  const { data } = payload
  const { _id, token } = data
  const result = yield getStatus(_id,token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_STATUS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_STATUS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerUpdateOrderStatus(payload) {
  const { data } = payload
  const { _id, token, orderId, statusChanged } = data;
  const value = { statusChanged, orderId };
  const result = yield updateOrderStatus(_id, token, orderId, value)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: UPDATE_ORDER_STATUS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: UPDATE_ORDER_STATUS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerRemoveProcessPayment() {
    yield put({
      type: REMOVE_PROCESS_PAYMENT_REQUEST_SUCCESS,
      response: false,
    })
}


