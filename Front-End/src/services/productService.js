import { get, adminPostWithFormData, deleteWithToken, putReq} from './backendClient'

export const createProduct = ( _idOfTheUser, data, token ) => adminPostWithFormData(`admin/create-product/${_idOfTheUser}`, data, token)

export const getProductSorted = ( sortedBy ) => get(`products?sortedBy=${sortedBy}&order=desc&limit=6`)

export const getProductSortedByArrival = ( sortedBy ) => get(`products?sortedBy=${sortedBy}&order=desc&limit=6`)

export const getProducts = () => get('products')

export const getSingleProduct = (data) => get(`product/${data}`)

export const fetchRelatedProducts = (data) => get(`products/related/${data}`)

export const deleteSingleProduct = (productId,userId,token) => deleteWithToken(`product/${productId}/${userId}`,token)

export const updateSingleProduct = (productId,userId,token,data) => adminPostWithFormData(`product/${productId}/${userId}`,data,token)

