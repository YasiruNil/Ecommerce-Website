import moment from "moment"
import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import React, { useState, useEffect } from "react"
import { getStatus, getOrders, updateOrderStatus } from "../../actions/index"


const Orders = (props) => {
  const [orders, setOrders] = useState([])
  const [statusValue, setStatusValue] = useState([])
  const {
    user: { _id },
    token,
  } = isAuth()
  useEffect(() => {
    const data = { _id, token }
    props.getOrders(data)
    props.getStatus(data)
  }, [])
  useEffect(() => {
    setOrders(props.getAllOrders)
  }, [props.getAllOrders])
  useEffect(() => {
    setStatusValue(props.getStatusValue)
  }, [props.getStatusValue])

  const noOrders = (orders) => {
    return orders.length < 1 ? <h5>No Orders Remaining!</h5> : null
  }
  const showInput = (key, value) => {
    return (
      <div className='input-group mb-2 mr-sm-2'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>{key}</div>
          <input type='text' value={value} className='form-control' disabled />
        </div>
      </div>
    )
  }
  const handleChangeStatus = (e, orderId) => {
    console.log(e.target.value)
    console.log(_id)
    const statusChanged = e.target.value
    var index = orders.findIndex((el) => el._id === orderId)
    var newValue = [...orders]
    newValue[index].status=e.target.value
    setOrders(newValue)
    props.updateOrderStatus({ _id, token, orderId, statusChanged })
    
  }
  const showStatus = (order) => {
    return (
      <div className='from-group'>
        <h3>Status:{order ? order.status : null}</h3>
        <select
          className='form-control'
          onChange={(e) => handleChangeStatus(e, order._id)}>
          <option>Update Status</option>
          {statusValue.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    )
  }
  return (
    <>
      <LayOut
        title='Add a New Category'
        description={`${isAuth().user.name}'s Orders`}>
        {noOrders(orders)}
        {orders &&
          orders.map((order, i) => (
            <div key={i} className='mt-3 mb-3 ml-4 mr-4'>
              <h2 className='mb-2'>
                <span> order Id:{order._id}</span>
              </h2>
              <ul className='list-group mb-4'>
                <li className='list-group-item'>{showStatus(order)}</li>
                <li className='list-group-item'>
                  Transaction ID:{order.transaction_id}
                </li>
                <li className='list-group-item'>Amount: {order.amount}</li>
                <li className='list-group-item'>
                  Ordered On:{moment(order.createdAt).fromNow()}
                </li>
                <li className='list-group-item'>
                  Delivery Address: {order.address}
                </li>
                <li className='list-group-item'>
                  Total number of order items: {order.products.length}
                </li>
              </ul>

              {order.products.map((p, i) => {
                return (
                  <div
                    key={i}
                    style={{ padding: "20px", border: "1px solid indigo" }}>
                    {showInput("Product Name", p.name)}
                    {showInput("Product Price", p.price)}
                    {showInput("Product Count", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                )
              })}
            </div>
          ))}
      </LayOut>
    </>
  )
}

const mapStateToProps = ({ cart }) => ({
  getAllOrders: cart.getAllOrders,
  getStatusValue: cart.getStatusValue,
})
const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (data) => dispatch(getOrders(data)),
    getStatus: (data) => dispatch(getStatus(data)),
    updateOrderStatus: (data) => dispatch(updateOrderStatus(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
