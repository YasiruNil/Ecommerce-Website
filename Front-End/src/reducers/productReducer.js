import {
  GET_PRODUCTS_REQUEST_SUCCESS,
  GET_PRODUCTS_SOLD_REQUEST_SUCCESS,
  GET_SINGLE_PRODUCT_REQUEST_SUCCESS,
  GET_PRODUCTS_ARRIVAL_REQUEST_SUCCESS,
  FETCH_RELATED_PRODUCTS_REQUEST_SUCCESS,
} from "../action_types/index"

const initialstate = {
  getProducts: [],
  getSingleProduct: {},
  fetchRelatedProducts: [],
  productsSortedBySell: [],
  productsSortedByArrival: [],
}
export const productReducer = (status = initialstate, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SOLD_REQUEST_SUCCESS:
      return {
        ...status,
        productsSortedBySell: action.response,
      }
    case GET_PRODUCTS_ARRIVAL_REQUEST_SUCCESS:
      return {
        ...status,
        productsSortedByArrival: action.response,
      }
    case GET_SINGLE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...status,
        getSingleProduct: action.response,
      }
    case FETCH_RELATED_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...status,
        fetchRelatedProducts: action.response,
      }
      case GET_PRODUCTS_REQUEST_SUCCESS:
      return {
        ...status,
        getProducts: action.response,
      }
      

    default:
      return status
  }
}
