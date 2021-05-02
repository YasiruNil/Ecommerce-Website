import {
  CLEAR_SIGN_IN_DATA,
  CLEAR_SIGN_OUT_DATA,
  SIGN_UP_REQUEST_SUCCESS,
  SIGN_IN_REQUEST_SUCCESS,
  SIGN_OUT_REQUEST_SUCCESS,
  GET_USER_DATA_REQUEST_SUCCESS,
  UPDATE_USER_DATA_REQUEST_SUCCESS,
  CHANGE_USER_UPDATE_REQUEST_SUCCESS,
  GET_USER_PURCHASE_HISTORY_REQUEST_SUCCESS,
} from "../action_types/index"

const initialstate = {
  userData: [],
  signUpData: {},
  signInData: {},
  signOutData: "",
  userUpdate: false,
  userPurchaceHistory: [],
}

export const userReducer = (status = initialstate, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST_SUCCESS:
      return {
        ...status,
        signUpData: action.response,
      }
    case SIGN_OUT_REQUEST_SUCCESS:
      return {
        ...status,
        signOutData: action.response,
      }
    case SIGN_IN_REQUEST_SUCCESS:
      return {
        ...status,
        signInData: action.response,
      }
    case CLEAR_SIGN_IN_DATA:
      return {
        ...status,
        signInData: {},
      }
    case CLEAR_SIGN_OUT_DATA:
      return {
        ...status,
        signOutData: "",
      }
    case GET_USER_DATA_REQUEST_SUCCESS:
      return {
        ...status,
        userData: action.response,
      }
    case UPDATE_USER_DATA_REQUEST_SUCCESS:
      return {
        ...status,
        userUpdate: action.response,
      }
    case CHANGE_USER_UPDATE_REQUEST_SUCCESS:
      return {
        ...status,
        userUpdate: action.response,
      }
    case GET_USER_PURCHASE_HISTORY_REQUEST_SUCCESS:
      return {
        ...status,
        userPurchaceHistory: action.response,
      }

    default:
      return status
  }
}
