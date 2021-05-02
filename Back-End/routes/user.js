const { 
  userById,
  userRead,
  userUpdate,
  userSignUp,
  userSignIn, 
  userSignOut, 
  requireSignin, 
  purchaseHistory,
} = require("../controller/user")
const { isAuth, isAdmin } = require("../controller/auth")
const { userSignUpValidator  } = require("../validator")

module.exports = (app) => {
  app.param("userId", userById )

  app.post("/sign-in" , userSignIn )

  app.get("/sign-out" , userSignOut )

  app.post("/sign-up", userSignUpValidator , userSignUp )

  app.get("/user-read/:userId", requireSignin,isAuth, userRead )

  app.put("/user-update/:userId",requireSignin, isAuth,userUpdate )

  app.get("/orders/by/user/:userId", requireSignin,isAuth, purchaseHistory )

}
