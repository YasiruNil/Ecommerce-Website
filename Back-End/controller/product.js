const Product = require("../models/products")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const product = require("../routes/product")
const createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be Uploaded",
      })
    }
    const { name, description, price, category, quantity, shipping } = fields
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: " All fields are required ",
      })
    }
    let product = new Product(fields)
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          status: "Failed to Create a Product",
          statusCode: 400,
          content: err,
        })
      }
      return res.status(200).json({
        status: "Successfully Created a Product",
        statusCode: 200,
        content: result,
      })
    })
  })
}
//id coming from route parameter
const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product is Not Found",
      })
    }
    req.product = product
    next()
  })
}
const readProductById = (req, res) => {
  req.product.photo = undefined
  return res.status(200).json({
    status: "Successfully Fetched requested Product",
    statusCode: 200,
    content: req.product,
  })
}
const removeProductById = (req, res) => {
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Productn is Not Found",
      })
    }
    return res.status(200).json({
      status: "Successfully Deleted the Product",
      statusCode: 200,
      content: req.product,
    })
  })
}
const updateProductById = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be Uploaded",
      })
    }
    const { name, description, price, quantity, shipping } = fields

    if (!name || !description || !price || !quantity || !shipping) {
      return res.status(400).json({
        error: " All fields are required ",
      })
    }
    let product = req.product
    product = _.extend(product, fields)
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      return res.status(200).json(result)
    })
  })
}

// sell and arrival
// by sell = /products?soldBy=sold&order=dec&limit=4
// by arrival = /products?soldBy=createdAt&order=dec&limit=4
// if no params are sent,then all products are returned

const getAllProducts = (req, res) => {
  let category = req.query.category ? req.query.category : "category._id"
  let search = req.query.search ? req.query.search : "description"
  let order = req.query.order ? req.query.order : "asc"
  let sortedBy = req.query.sortedBy ? req.query.sortedBy : "_id"
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortedBy, order, category._id, search]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          status: "Failed to Fetch Sorted Products",
          statusCode: 400,
          content: err,
        })
      }
      return res.status(200).json({
        status: "Successfully Fetched Sorted Products",
        statusCode: 200,
        content: data,
      })
    })
}
const getRelatedProduct = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not Found",
        })
      }
      res.status(200).json({
        status: "Successfully Fetched Related Products",
        statusCode: 200,
        content: products,
      })
    })
}
const getProductCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not Found",
      })
    }
    res.json(categories)
  })
}
const getProductBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc"
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id"
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for (let key in req.body.filtersAll.filter) {
    if (req.body.filtersAll.filter[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filtersAll.filter[key][0],
          $lte: req.body.filtersAll.filter[key][1],
        }
      } else {
        findArgs[key] = req.body.filtersAll.filter[key]
      }
    }
  }
  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        })
      }
      res.status(200).json({
        status: "Successfully Created",
        statusCode: 200,
        size: data.length,
        content: data,
      })
    })
}
const getProductPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("content-Type", req.product.contentType)
    return res.send(req.product.photo.data)
  }
  next()
}
const getSearchFilter = (req, res, next) => {
  const query = {}
  if (req.query.search) {
    query.description = { $regex: req.query.search, $options: "i" }
  }
  if (req.query.category && req.query.category !== "All") {
    query.category = req.query.category
  }
  Product.find(query, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Products not found",
      })
    }
    res.status(200).json({
      status: "Successfully Created",
      statusCode: 200,
      content: product,
      size: product.length,
    })
  }).select("-photo")
}
module.exports = {
  productById,
  createProduct,
  getAllProducts,
  readProductById,
  getProductPhoto,
  getSearchFilter,
  updateProductById,
  removeProductById,
  getRelatedProduct,
  getProductBySearch,
  getProductCategories,
}
