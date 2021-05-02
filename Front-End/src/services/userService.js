import { get, post, getWithToken, putReq } from './backendClient'

export const createUserSignUp = data => post('sign-up', data)

export const UserSignIn = data => post('sign-in', data)

export const UserSignOut = params => get('sign-out',params)

export const fetchUserData = (_id,token) => getWithToken(`user-read/${_id}`, token)

export const updateUser = (_id,token,values) => putReq(`user-update/${_id}`, values, token)

export const getUserPurchaseHistory = ( _id,token ) => getWithToken(`orders/by/user/${_id}`, token)