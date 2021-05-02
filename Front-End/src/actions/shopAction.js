import {
  FETCH_FILTERED_ITEMS_REQUEST,
  SEARCH_FILTERED_PRODUCT_REQUEST,
} from "../action_types/index"

export const filterProduct = (data) => ({
  type: FETCH_FILTERED_ITEMS_REQUEST,
  data,
})

export const searchOption = (data) => ({
  type: SEARCH_FILTERED_PRODUCT_REQUEST,
  data,
})
