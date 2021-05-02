const { isAuth } = require("../controller/auth")
const { generateToken, processPayment } =require("../controller/braintree")
const { requireSignin, userById } = require("../controller/user")


module.exports = (app) => {
  app.param("userId", userById)

  app.get("/braibtree/getToken/:userId", requireSignin, isAuth,generateToken)

  app.post("/braibtree/payment/:userId", requireSignin, isAuth, processPayment)
}
