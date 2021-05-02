const User = require("../models/user")
const { Order } = require("../models/order")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
})
const userSignUp = (req, res) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        status: "User failed to create",
        statusCode: 400,
        error: err,
      })
    }
    res.status(200).json({
      status: "User Successfully Created",
      statusCode: 200,
      user,
    })
  })
}
const userSignIn = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        status: "User with the Email does not Exist.Please SignUp",
        statusCode: 400,
        error: "User with the Email does not Exist.Please SignUp",
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: "Email and Password Dont Match",
        statusCode: 401,
        error: "Email and Password Dont Match",
      })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie("t", token, { expire: new Date() + 9999 })
    const { _id, name, email, role } = user
    return res.json({
      statusCode: 200,
      status: "Successfully Loged In",
      token,
      user: { _id, email, name, role },
    })
  })
}
const userSignOut = (req, res) => {
  res.clearCookie("t")
  res.json({
    statusCode: 200,
    status: "Successfully Loged Out",
    message: "Sign Out Success",
  })
}
const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      })
    }
    req.profile = user
    next()
  })
}
const userRead = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json({
    statusCode: 200,
    status: "User Profile",
    content: req.profile,
  })
}
const userUpdate = (req, res) => {
  const { name, email, password } = req.body
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: { name, email, password } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not Authorized to Perform this Action",
        })
      }
      user.hashed_password = undefined
      user.salt = undefined
      return res.status(200).json({
        statusCode: 200,
        status: "User Profile edited successfully",
        content: req.user,
      })
    }
  )
}
const addOrderToUserHistory = (req, res, next) => {
  let history = []

  req.body.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.transaction_id,
      amount: req.body.amount,
    })
  })

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    {
      new: true,
    },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          status: "Could not update User purchase history",
          statusCode: 400,
          content: error,
        })
      }
      next()
    }
  )
}

const purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "id name")
    .sort("-createdAt")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          status: "Could not find purchase history",
          statusCode: 400,
          content: error,
        })
      }
      return res.status(200).json({
        status: "Purchase History List",
        statusCode: 200,
        content: orders,
      })
    })
}

module.exports = {
  userById,
  userRead,
  userUpdate,
  userSignUp,
  userSignIn,
  userSignOut,
  requireSignin,
  purchaseHistory,
  addOrderToUserHistory,
}
