import "./App.css"
import Cart from './compoments/core/cart'
import Home from "./compoments/core/home"
import Menu from "./compoments/core/menu"
import Shop from "./compoments/core/shop"
import SignIn from "./compoments/user/signIn"
import SignUp from "./compoments/user/signup"
import Orders from "./compoments/admin/orders"
import "react-toastify/dist/ReactToastify.css"
import Profile from "./compoments/user/profile"
import Product from "./compoments/core/product"
import { ToastContainer } from "react-toastify"
import { Switch, Route } from "react-router-dom"
import AddProduct from "./compoments/admin/addProduct"
import DashBoard from "./compoments/user/userDashBoard"
import AddCategory from "./compoments/admin/addCategory"
import AdminRoute from "./compoments/authRoutes/adminRoutes"
import ManageProducts from "./compoments/admin/manageProduct"
import AdminDashBoard from "./compoments/user/adminDashBoard"
import PrivateRoute from "./compoments/authRoutes/privateRoute"

function App() {
  return (
    <>
      <Menu />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/product/:productId' component={Product} />
        <PrivateRoute exact path='/dashboard' component={DashBoard} />
        <AdminRoute exact path='/admin/orders-list' component={Orders} />
        <PrivateRoute exact path='/profile/:userId' component={Profile} />
        <AdminRoute exact path='/admin/products' component={ManageProducts} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard} />
        <AdminRoute exact path='/admin/create-product' component={AddProduct} />
        <AdminRoute exact path='/admin/create-category' component={AddCategory} />
      </Switch>
    </>
  )
}

export default App
