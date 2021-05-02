import { isAuth } from "./auth"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { removeCart } from "./cartHelper"
import DropIn from "braintree-web-drop-in-react"
import React, { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import {
  createOrder,
  processPayment,
  getBraintreeToken,
  removeProcessPayment,
} from "../../actions/index"


const CheckOut = (props) => {
  const { setRun, run } = props
  const [data, setData] = useState({
    err: "",
    address: "",
    instance: {},
    success: false,
    clientToken: null,
  })
  const userId = isAuth() && isAuth().user._id
  const userToken = isAuth() && isAuth().token

  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value })
  }
  useEffect(() => {
    const data = { userId, userToken }
    props.getBraintreeToken(data)
  }, [])
  useEffect(() => {
    setData({
      data,
      clientToken: props.braintreeToken.clientToken,
    })
  }, [props.braintreeToken])

  useEffect(() => {
    setData({
      ...data,
      success: props.paymentProcessValue.success,
    })
    if (props.paymentProcessValue.success) {
      const createOrderData = {
        address: data.address,
        products: props.products,
        amount: props.paymentProcessValue.transaction.amount,
        transaction_id: props.paymentProcessValue.transaction.id,
      }
      const datas = { userId, userToken, createOrderData }
      props.createOrder(datas)
        removeCart(() => 
        setRun(!run),
        props.removeProcessPayment()
        )
    }
  }, [props.paymentProcessValue])
  useEffect(() => {
    setData({
      ...data,
      success: false,
    })
  }, [])

  const payItems = () => {
    let nonce
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(props.products),
        }
        props.processPayment({ userId, userToken, paymentData })
      })
      .catch((error) => {
        setData({ ...data, err: error.message })
      })
  }

  const getTotal = (total) => {
    return total.reduce((cu, newVal) => {
      return cu + newVal.price * newVal.count
    }, 0)
  }
  const showDopIn = () => {
    return (
      <div onBlur={() => setData({ ...data, err: "" })}>
        {data.clientToken !== null && props.products.length > 0 ? (
          <div>
            <div className='mb-3'>
              <TextField
                id='outlined-basic'
                value={data.address}
                label='Address'
                variant='outlined'
                multiline
                rows={4}
                onChange={handleAddress}
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className='btn btn-success' onClick={payItems}>
              Pay Order Items
            </button>
          </div>
        ) : null}
      </div>
    )
  }
  const showError = (err) => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: err ? "" : "none" }}>
        {err}
      </div>
    )
  }
  const showSuccess = (success) => {
    return (
      <div
        className='alert alert-info'
        style={{ display: success ? "" : "none" }}>
        Thanks! Your Payment was Successfull
      </div>
    )
  }
  return (
    <div>
      <div>
        <h2>Total: ${getTotal(props.products)}</h2>
        <div>{showSuccess(data.success)}</div>
        <div>{showError(data.err)}</div>
        {isAuth() ? (
          <>
            <div>{showDopIn()}</div>
          </>
        ) : (
          <Link to='/sign-in'>
            <button className='btn btn-primary'>Sign in to checkout</button>
          </Link>
        )}
      </div>
    </div>
  )
}
const mapStateToProps = ({ cart }) => ({
  braintreeToken: cart.braintreeToken,
  paymentProcessValue: cart.paymentProcess,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data) => dispatch(createOrder(data)),
    processPayment: (data) => dispatch(processPayment(data)),
    removeProcessPayment:() => dispatch(removeProcessPayment()),
    getBraintreeToken: (data) => dispatch(getBraintreeToken(data)),
   
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
