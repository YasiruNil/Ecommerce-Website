import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
    CREATE_CATEGORY_REQUEST,
    FETCH_CATEGORIES_REQUEST,
    CREATE_CATEGORY_REQUEST_FAIL,
    FETCH_CATEGORIES_REQUEST_FAIL,
    CREATE_CATEGORY_REQUEST_SUCCESS,
    FETCH_CATEGORIES_REQUEST_SUCCESS,
 
} from "../action_types/index"
import {
    createCategory,
    fetchCategories
} from "../services/categoryService"

export function* watcherCreateCategory() {
    yield takeLatest(CREATE_CATEGORY_REQUEST, workerCreateCategory)
  }
export function* watcherFetchCategories() {
    yield takeLatest(FETCH_CATEGORIES_REQUEST, workerFetchCategories)
  }
  
  function* workerCreateCategory(payload) {
    const { data } = payload
    console.log(data)
    const {_idOfTheUser, token } = data
    const result = yield createCategory(_idOfTheUser, data, token)
    console.log(result)
    if (result && result.data.statusCode === 200) {
      yield put({ type: CREATE_CATEGORY_REQUEST_SUCCESS, response: result.data.content })
      toast.success(result.data.status)
    } else if (result.data.statusCode === 400) {
      yield put({ type: CREATE_CATEGORY_REQUEST_FAIL })
      toast.error(result.data.status)
    }
  }
  function* workerFetchCategories() {
    const result = yield fetchCategories()
    if (result && result.data.statusCode === 200) {
      yield put({ type: FETCH_CATEGORIES_REQUEST_SUCCESS, response: result.data.content })
    } else if (result.data.statusCode === 400) {
      yield put({ type: FETCH_CATEGORIES_REQUEST_FAIL })
      toast.error(result.data.status)
    }
  }