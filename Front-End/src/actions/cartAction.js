import {
  GET_STATUS_REQUEST,
  CREATE_ORDER_REQUEST,
  GET_ALL_ORDERS_REQUEST,
  PROCESS_PAYMENT_REQUEST,
  UPDATE_ORDER_STATUS_REQUEST,
  GET_BRAINTREE_TOKEN_REQUEST,
  REMOVE_PROCESS_PAYMENT_REQUEST,
} from "../action_types/index"

export const getBraintreeToken = (data) => ({
  type: GET_BRAINTREE_TOKEN_REQUEST,
  data,
})
export const processPayment = (data) => ({
  type: PROCESS_PAYMENT_REQUEST,
  data,
})
export const createOrder = (data) => ({
  type: CREATE_ORDER_REQUEST,
  data,
})
export const getOrders = (data) => ({
  type: GET_ALL_ORDERS_REQUEST,
  data,
})
export const getStatus = (data) => ({
  type: GET_STATUS_REQUEST,
  data,
})
export const updateOrderStatus = (data) => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
  data,
})
export const removeProcessPayment = () => ({
  type: REMOVE_PROCESS_PAYMENT_REQUEST,
})
