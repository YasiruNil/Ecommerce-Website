import Card from "../shared/card"
import CheckOut from "./checkOut"
import LayOut from "../shared/layout"
import { getCartItems } from "./cartHelper"
import React, { useEffect, useState } from "react"




const Cart = () => {
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false)

  const showItems = (items) => {
    return (
      <div>
        <h3>Your cart has {`${items.length}`} items</h3>
        <hr />
        {items && items.map((product, i) => (
          <Card
            key={i}
            product={product}
            cartUpdate={true}
            showRemoveItemButton={true}
            run={run}
            setRun={setRun}
          />
        ))}
      </div>
    )
  }

  useEffect(() => {
    setItems(getCartItems())
  }, [run])
  return (
    <LayOut
      title='Shopping Cart'
      description='Manage your cart items'
      className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          {items.length > 0 ? showItems(items) : "no items in the cart"}
        </div>
        <div className='col-md-4'>
          <h2 className='mb-4'> Your Cart Summery</h2>
          <hr />
          <CheckOut products={items} setRun={setRun}/>
        </div>
      </div>
    </LayOut>
  )
}

export default Cart
