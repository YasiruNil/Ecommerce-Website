import Card from "../shared/card"
import LayOut from "../shared/layout"
import { connect } from "react-redux"
import Search from "../shared/search"
import React, { useState, useEffect } from "react"
import { getProductsSold, getProductsArrival } from "../../actions/index"



const Home = (props) => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const loadProductBysell = () => {
    const data = "sold"
    props.getProductsSold(data)
  }
  const loadProductByArrival = () => {
    const data = "createdAt"
    props.getProductsArrival(data)
  }
  useEffect(() => {
    loadProductBysell()
    loadProductByArrival()
  }, [])
  useEffect(() => {
    setProductsBySell(props.productsSortedBySell)
  }, [props.productsSortedBySell])
  useEffect(() => {
    setProductsByArrival(props.productsSortedByArrival)
  }, [props.productsSortedByArrival])
  return (
    <LayOut
      title='Home Page'
      description='Node React E-commerce App'
      className='container'>
      <Search/>
      <h2 className='mb-4'>Best Sellers</h2>
      <div className='row'>
        {productsBySell &&
          productsBySell.map((product, i) => (
            <div key={i} className='col-md-3 mb-3'>
              <Card product={product} />
            </div>
          ))}
      </div>
      <hr />
      <h2 className='mb-4'>New Arrivals</h2>
      <div className='row'>
        {productsByArrival &&
          productsByArrival.map((product, i) => (
            <div key={i} className='col-md-3 mb-3'>
              <Card key={i} product={product} />
            </div>
          ))}
      </div>
    </LayOut>
  )
}

const mapStateToProps = ({ product, shop }) => ({
  fetchSearchedItems:shop.fetchSearchedItems,
  productsSortedBySell: product.productsSortedBySell,
  productsSortedByArrival: product.productsSortedByArrival,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsSold: (data) => dispatch(getProductsSold(data)),
    getProductsArrival: (data) => dispatch(getProductsArrival(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
