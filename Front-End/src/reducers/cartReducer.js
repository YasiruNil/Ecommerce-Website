import {
  GET_STATUS_REQUEST_SUCCESS,
  GET_ALL_ORDERS_REQUEST_SUCCESS,
  PROCESS_PAYMENT_REQUEST_SUCCESS,
  GET_BRAINTREE_TOKEN_REQUEST_SUCCESS,
  REMOVE_PROCESS_PAYMENT_REQUEST_SUCCESS,
} from "../action_types/index";

const initialstate = {
  getAllOrders: [],
  braintreeToken: [],
  getStatusValue: [],
  paymentProcess: false,
};

export const cartReducer = (status = initialstate, action) => {
  switch (action.type) {
    case GET_BRAINTREE_TOKEN_REQUEST_SUCCESS:
      return {
        ...status,
        braintreeToken: action.response,
      };
    case PROCESS_PAYMENT_REQUEST_SUCCESS:
      return {
        ...status,
        paymentProcess: action.response,
      };
    case GET_ALL_ORDERS_REQUEST_SUCCESS:
      return {
        ...status,
        getAllOrders: action.response,
      };
    case GET_STATUS_REQUEST_SUCCESS:
      return {
        ...status,
        getStatusValue: action.response,
      };
      case REMOVE_PROCESS_PAYMENT_REQUEST_SUCCESS:
      return {
        ...status,
        paymentProcess: action.response,
      };
      
    default:
      return status;
  }
};
