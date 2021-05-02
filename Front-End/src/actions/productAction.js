import {
  GET_PRODUCTS_REQUEST,
  CREATE_PRODUCT_REQUEST,
  GET_PRODUCTS_SOLD_REQUEST,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_PRODUCTS_ARRIVAL_REQUEST,
  DELETE_SINGLE_PRODUCT_REQUEST,
  UPDATE_SINGLE_PRODUCT_REQUEST,
  FETCH_RELATED_PRODUCTS_REQUEST,
} from "../action_types/index"

export const createProduct = (data) => ({
  type: CREATE_PRODUCT_REQUEST,
  data,
})
export const getProducts = () => ({
  type: GET_PRODUCTS_REQUEST,
})
export const getProductsSold = (data) => ({
  type: GET_PRODUCTS_SOLD_REQUEST,
  data,
})
export const getProductsArrival = (data) => ({
  type: GET_PRODUCTS_ARRIVAL_REQUEST,
  data,
})
export const loadSingleProduct = (data) => ({
  type: GET_SINGLE_PRODUCT_REQUEST,
  data,
})
export const relatedProducts = (data) => ({
  type: FETCH_RELATED_PRODUCTS_REQUEST,
  data,
})
export const deleteAProduct = (data) => ({
  type: DELETE_SINGLE_PRODUCT_REQUEST,
  data,
})
export const updateAProduct = (data) => ({
  type: UPDATE_SINGLE_PRODUCT_REQUEST,
  data,
})
