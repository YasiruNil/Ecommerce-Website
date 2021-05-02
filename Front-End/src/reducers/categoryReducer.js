import {
    FETCH_CATEGORIES_REQUEST_SUCCESS
  } from "../action_types/index";
  
  const initialstate = {
    fetchCategories: [],
  };
  
  export const categoryReducer = (status = initialstate, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST_SUCCESS:
        return {
          ...status,
          fetchCategories: action.response,
        };
      default:
        return status;
    }
  };
  