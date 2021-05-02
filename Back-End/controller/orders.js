const User = require("../models/user")
const { Order } = require("../models/order")
const Product = require("../models/products")
const createOrder = (req, res) => {
  req.body.user = req.profile
  const order = new Order(req.body)
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        status: "Failed add the order",
        statusCode: 400,
        content: error,
      })
    }
    return res.status(200).json({
      status: "Successfully Created a Product",
      statusCode: 200,
      content: data,
    })
  })
}
const listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name ")
    .populate("products", "_id name price count")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: error,
        })
      }
      return res.status(200).json({
        status: "User Orders",
        statusCode: 200,
        content: orders,
      })
    })
}
const decreaseTheQuantity = (req, res, next) => {
  let bulkOps = req.body.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }
  })
  Product.bulkWrite(bulkOps, {}, (error, prod) => {
    if (error) {
      return res.status(400).json({
        status: "Failed to change quantity",
        statusCode: 400,
        content: error,
      })
    }
    next()
  })
}
const getStatus = (req, res) => {
  const value = Order.schema.path("status").enumValues
  return res.status(200).json({
    status: "Status Value",
    statusCode: 200,
    content: value,
  })
}
const orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.status(400).json({
          status: "failed to get order id",
          statusCode: 400,
          content: error,
        })
      }
      req.order = order
      next()
    })
}
const updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.statusChanged } },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          status: "failed to get order id",
          statusCode: 400,
          content: error,
        })
      }
      res.status(200).json({
        status: "changed Status Successfully",
        statusCode: 200,
        content: order,
      })
    }
  )
}
module.exports = {
  orderById,
  getStatus,
  listOrders,
  createOrder,
  updateStatus,
  decreaseTheQuantity,
}
