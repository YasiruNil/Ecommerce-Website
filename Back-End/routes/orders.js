const { isAuth, isAdmin } = require("../controller/auth")
const { requireSignin, userById, addOrderToUserHistory } = require("../controller/user")
const { getStatus, listOrders,orderById, createOrder, updateStatus, decreaseTheQuantity } = require("../controller/orders")

module.exports = (app) => {
  
  app.param("userId", userById )

  app.param("orderId", orderById )

  app.get("/order/list/:userId",requireSignin, isAuth, isAdmin, listOrders )

  app.get("/order/status-value/:userId",requireSignin, isAuth, isAdmin, getStatus )

  app.put("/order/:orderId/status-value/:userId",requireSignin, isAuth, isAdmin, updateStatus )

  app.post("/create-order/:userId", requireSignin, isAuth, addOrderToUserHistory,decreaseTheQuantity, createOrder )

}
