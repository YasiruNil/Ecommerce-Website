import {
  FETCH_FILTERED_ITEMS_REQUEST_SUCCESS,
  SEARCH_FILTERED_PRODUCT_REQUEST_SUCCESS,
} from "../action_types/index"

const initialstate = {
  fetchSearchedItems: [],
  fetchFilteredItems: [],
  filterSize:'',
}

export const shopReducer = (status = initialstate, action) => {
  switch (action.type) {
    case FETCH_FILTERED_ITEMS_REQUEST_SUCCESS:
      return {
        ...status,
        fetchFilteredItems: action.response,
      }
    case SEARCH_FILTERED_PRODUCT_REQUEST_SUCCESS:
      return {
        ...status,
        fetchSearchedItems: action.response,
        filterSize: action.additionalData
      }

    default:
      return status
  }
}
