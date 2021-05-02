import { combineReducers } from "redux"
import { cartReducer as cart } from "./cartReducer"
import { userReducer as user } from "./userReducer"
import { shopReducer as shop } from "./shopReducer"
import { productReducer as product } from "./productReducer"
import { categoryReducer as category } from "./categoryReducer"

const rootReducer = combineReducers({
    cart,
    shop,
    user,
    product,
    category,
})

export default rootReducer
