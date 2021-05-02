import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  CLEAR_SIGN_IN_DATA,
  CLEAR_SIGN_OUT_DATA,
  GET_USER_DATA_REQUEST,
  UPDATE_USER_DATA_REQUEST,
  CHANGE_USER_UPDATE_REQUEST,
  GET_USER_PURCHASE_HISTORY_REQUEST,
} from "../action_types/index"

export const UserSignUp = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
})
export const UserSignIn = (data) => ({
  type: SIGN_IN_REQUEST,
  data,
})
export const userSignOut = () => ({
  type: SIGN_OUT_REQUEST,
})
export const clearSignInData = () => ({
  type: CLEAR_SIGN_IN_DATA,
})
export const clearSignOutData = () => ({
  type: CLEAR_SIGN_OUT_DATA,
})
export const getUserData = (data) => ({
  type: GET_USER_DATA_REQUEST,
  data,
})
export const updateUserData = (data) => ({
  type: UPDATE_USER_DATA_REQUEST,
  data,
})
export const changeUserUpdate = () => ({
  type: CHANGE_USER_UPDATE_REQUEST,
})
export const getUserPurchaseHistory = (data) => ({
  type: GET_USER_PURCHASE_HISTORY_REQUEST,
  data,
})
