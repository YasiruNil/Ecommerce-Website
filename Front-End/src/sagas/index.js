import { all, fork } from "redux-saga/effects"
import {
watcherUserSignUp as UserSignUp,
watcherUserSignIn as UserSignIn,
watcherUserSignOut as UserSignOut,
watcherGetUserData as GetUserData,
watcherUpdateUserData as UpdateUserData,
watcherChangeUserUpdate as ChangeUserUpdate,
watcherGetUserPurchaseHistory as GetUserPurchaseHistory,
} from "./userSaga"
import {
  watcherCreateCategory as CreateCategory,
  watcherFetchCategories as FetchCategories,
} from "./categorySaga"
import {
  watcherGetProducts as GetProducts,
  watcherCreateProduct as CreateProduct,
  watcherGetProductsSold as GetProductsSold,
  watcherGetSingleProduct as GetSingleProduct,
  watcherGetProductsArrival as GetProductsArrival,
  watcherDeleteSingleProduct as DeleteSingleProduct,
  watcherUpdateSingleProduct as UpdateSingleProduct,
  watcherFetchRelatedProducts as FetchRelatedProducts,
  
} from "./productSaga"
import {
  watcherSearchFilter as SearchFilter,
  watcherFilterOutProduct as FilterOutProduct,
} from "./shopSaga"
import {
  watcherGetStatus as GetStatus,
  watcherCreateOrder as CreateOrder,
  watcherGetAllOrders as GetAllOrders,
  watcherProcessPayment as ProcessPayment,
  watcherUpdateOrderStatus as UpdateOrderStatus,
  watcherGetBraintreeToken as GetBraintreeToken,
  watcherRemoveProcessPayment as RemoveProcessPayment,
} from "./cartSaga"

export default function* rootSaga() {
  yield all([
    fork(GetStatus),
    fork(UserSignUp),
    fork(UserSignIn),
    fork(GetUserData),
    fork(UserSignOut),
    fork(GetProducts),
    fork(CreateOrder),
    fork(GetAllOrders),
    fork(SearchFilter),
    fork(CreateProduct),
    fork(UpdateUserData),
    fork(ProcessPayment),
    fork(CreateCategory),
    fork(FetchCategories),
    fork(GetProductsSold),
    fork(ChangeUserUpdate),
    fork(GetSingleProduct),
    fork(FilterOutProduct),
    fork(UpdateOrderStatus),
    fork(GetBraintreeToken),
    fork(GetProductsArrival),
    fork(UpdateSingleProduct),
    fork(DeleteSingleProduct),
    fork(FetchRelatedProducts),
    fork(RemoveProcessPayment),
    fork(GetUserPurchaseHistory),
  ])
}
