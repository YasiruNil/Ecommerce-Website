
import { getWithToken, PostWithToken, putReq } from './backendClient'

export const getBraintreeToken = ( userId,token ) => getWithToken(`braibtree/getToken/${userId}`, token)

export const processPayment = ( userId, userToken, paymentData ) => PostWithToken(`braibtree/payment/${userId}`, paymentData, userToken )

export const createOrder = ( userId, userToken, createOrderData ) => PostWithToken(`create-order/${userId}`, createOrderData, userToken )

export const getAllOrders = ( _id, token ) => getWithToken(`order/list/${_id}`, token )

export const getStatus = ( _id, token ) => getWithToken(`order/status-value/${_id}`, token )

export const updateOrderStatus = ( _id, token, orderId, value ) => putReq(`order/${orderId}/status-value/${_id}`, value, token )
