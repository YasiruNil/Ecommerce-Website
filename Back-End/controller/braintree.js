const braintree = require("braintree")
const User = require("../models/user")
require("dotenv").config()

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  merchantId: process.env.BRAINTREE_MERCHENT_ID,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})
const generateToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).json({
        status: "Failed to send the token",
        statusCode: 500,
        content: err,
      })
    }
    res.status(200).json({
      status: "Successfully sent the token",
      statusCode: 200,
      content: response,
    })
  })
}
const processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (error) {
        res.status(400).json({
          status: "Failed to do the transaction",
          statusCode: 400,
          content: error,
        })
      } else {
        res.status(200).json({
          status: "Successfully transfered",
          statusCode: 200,
          content: result,
        })
      }
    }
  )
}

module.exports = {
  generateToken,
  processPayment,
}
