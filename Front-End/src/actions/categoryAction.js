import {
  CREATE_CATEGORY_REQUEST,
  FETCH_CATEGORIES_REQUEST,
} from "../action_types/index"

export const createCategory = (data) => ({
  type: CREATE_CATEGORY_REQUEST,
  data,
})
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES_REQUEST,
})
