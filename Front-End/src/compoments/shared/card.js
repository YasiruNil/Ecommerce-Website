import ShowImage from "./showImage"
import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { addItem, updateItem, removeItem } from "../core/cartHelper"

const Card = ({
  product,
  cartUpdate = false,
  showRemoveItemButton = false,
  setRun = (f) => f, // default value of function
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const handleChange = (e) => {
    setRun(!run)
    setCount(e.target.value < 1 ? 1 : e.target.value)
    if (e.target.value >= 1) {
      updateItem(product._id, e.target.value)
    }
  }
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }
  const cartUpdateShow = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={(e, product) => handleChange(e, product)}
            />
          </div>
        </div>
      )
    )
  }
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }
  const showRemoveItem = (showRemoveItemButton) => {
    if (showRemoveItemButton) {
      return (
        <button
          className='btn btn-outline-dange mt-2 mb-2'
          onClick={() => {
            removeItem(product._id)
            setRun(!run)
          }}>
          Remove Product
        </button>
      )
    }
  }
  return (
    <div className='card'>
      <div className='card-header'>{product.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <p> {product.description.substring(0, 50)}... </p>
        <p> ${product.price} </p>
        <Link to={`product/${product._id}`}>
          <button className='btn btn-outline-primary mt-2 mb-2'>
            View Product
          </button>
        </Link>
        <button
          onClick={addToCart}
          className='btn btn-outline-warning mt-2 mb-2'>
          Add to Cart
        </button>

        {cartUpdateShow(cartUpdate)}
        {showRemoveItem(showRemoveItemButton)}
      </div>
    </div>
  )
}
export default Card
