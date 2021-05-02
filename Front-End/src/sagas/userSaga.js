import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST_FAIL,
  SIGN_IN_REQUEST_FAIL,
  GET_USER_DATA_REQUEST,
  SIGN_OUT_REQUEST_FAIL,
  SIGN_UP_REQUEST_SUCCESS,
  SIGN_IN_REQUEST_SUCCESS,
  UPDATE_USER_DATA_REQUEST,
  SIGN_OUT_REQUEST_SUCCESS,
  CHANGE_USER_UPDATE_REQUEST,
  GET_USER_DATA_REQUEST_FAIL,
  UPDATE_USER_DATA_REQUEST_FAIL,
  GET_USER_DATA_REQUEST_SUCCESS,
  UPDATE_USER_DATA_REQUEST_SUCCESS,
  GET_USER_PURCHASE_HISTORY_REQUEST,
  CHANGE_USER_UPDATE_REQUEST_SUCCESS,
  GET_USER_PURCHASE_HISTORY_REQUEST_FAIL,
  GET_USER_PURCHASE_HISTORY_REQUEST_SUCCESS,
} from "../action_types/index"
import {
  updateUser,
  UserSignIn,
  UserSignOut,
  fetchUserData,
  createUserSignUp,
  getUserPurchaseHistory,
} from "../services/userService"

export function* watcherUserSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, workerUserSignUp)
}
export function* watcherUserSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, workerUserSignIn)
}
export function* watcherUserSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, workerUserSignOut)
}
export function* watcherGetUserData() {
  yield takeLatest(GET_USER_DATA_REQUEST, workerGetUserData)
}
export function* watcherUpdateUserData() {
  yield takeLatest(UPDATE_USER_DATA_REQUEST, workerUpdateUserData)
}
export function* watcherChangeUserUpdate() {
  yield takeLatest(CHANGE_USER_UPDATE_REQUEST, workerChangeUserUpdate)
}
export function* watcherGetUserPurchaseHistory() {
  yield takeLatest(GET_USER_PURCHASE_HISTORY_REQUEST, workerGetUserPurchaseHistory)
}


function* workerUserSignUp(payload) {
  const { data } = payload
  const result = yield createUserSignUp(data)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({ type: SIGN_UP_REQUEST_SUCCESS, response: result.data.user })
    toast.success(result.data.status)
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_UP_REQUEST_FAIL })
    toast.error(`${result.data.error.keyValue.email} already exists`)
  }
}
function* workerUserSignIn(payload) {
  const { data } = payload
  console.log(data)
  const result = yield UserSignIn(data)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({ type: SIGN_IN_REQUEST_SUCCESS, response: result.data.user })
    yield localStorage.setItem("JWTtoken", JSON.stringify(result.data))
    toast.success(result.data.status)
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_IN_REQUEST_FAIL })
    toast.error(result.data.error)
  } else if (result.data.statusCode === 401) {
    yield put({ type: SIGN_IN_REQUEST_FAIL })
    toast.error(result.data.error)
  }
}

function* workerUserSignOut() {
  const result = yield UserSignOut()
  if (result && result.data.statusCode === 200) {
    yield put({
      type: SIGN_OUT_REQUEST_SUCCESS,
      response: result.data.message,
    })
    yield localStorage.removeItem("JWTtoken")
    toast.success(result.data.message)
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_OUT_REQUEST_FAIL })
  }
}
function* workerGetUserData(payload) {
  const { data } = payload
  const { _id, token } = data
  const result = yield fetchUserData(_id, token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_USER_DATA_REQUEST_SUCCESS,
      response: result.data.content,
    })
    toast.success(result.data.message)
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_USER_DATA_REQUEST_FAIL })
  }
}
function* workerUpdateUserData(payload) {
  const { data } = payload
  console.log(data)
  const { _id, token, values } = data
  const result = yield updateUser(_id, token, values)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: UPDATE_USER_DATA_REQUEST_SUCCESS,
      response: true,
    })
    toast.success(result.data.message)
  } else if (result.data.statusCode === 400) {
    yield put({ type: UPDATE_USER_DATA_REQUEST_FAIL })
  }
}
function* workerChangeUserUpdate() {
    yield put({
      type: CHANGE_USER_UPDATE_REQUEST_SUCCESS,
      response: false,
    })
}
function* workerGetUserPurchaseHistory(payload) {
  const { data } = payload
  console.log(data)
  const { _id, token } = data
  const result = yield getUserPurchaseHistory(_id, token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_USER_PURCHASE_HISTORY_REQUEST_SUCCESS,
      response: result.data.content,
    })
    toast.success(result.data.message)
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_USER_PURCHASE_HISTORY_REQUEST_FAIL })
  }
}