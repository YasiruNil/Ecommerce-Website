import moment from "moment"
import Card from "../shared/card"
import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { useParams } from "react-router"
import { APIBASEURL } from "../../config"
import ModalImage from "react-modal-image"
import React, { useState, useEffect } from "react"
import { loadSingleProduct, relatedProducts } from "../../actions/index"

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const params = useParams()

  useEffect(() => {
    props.loadSingleProduct(params.productId)
    props.relatedProducts(params.productId)
  }, [])
  useEffect(() => {
    setProduct(props.getSingleProduct)
  }, [props.getSingleProduct])
  useEffect(() => {
    setRelatedProducts(props.fetchRelatedProducts)
  }, [props.fetchRelatedProducts])

  return (
    <LayOut
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 150)
      }
      className='container mb-3'>
      <p>Product Page</p>
      <div style={{ display: "flex" }}>
        <ModalImage
          small={`${APIBASEURL}product/photo/${product._id}`}
          large={`${APIBASEURL}product/photo/${product._id}`}
          alt='Hello World!'
        />
        <div
          style={{
            border: "1px solid black",
            marginLeft: "100px",
            borderRadius: "10px",
          }}>
          <div style={{ marginBottom: "10px" }}>Name: {product.name}</div>
          <div style={{ marginBottom: "10px" }}>
            Description:{product.description}
          </div>
          <div style={{ marginBottom: "10px" }}>Price: {product.price}</div>
          <div style={{ marginBottom: "10px" }}>
            Added on {moment(product.createdAt).fromNow()}
          </div>
          <div>
            {product.quantity > 0 ? (
              <span className='badge badge-primary badge-pill'>In Stock</span>
            ) : (
              <span className='badge badge-primary badge-pill'>
                Out of Stock
              </span>
            )}
          </div>

          <button className='btn btn-outline-warning mt-2 mb-2'>
            {" "}
            Add to Cart
          </button>
        </div>
      </div>
      <div className='mt-5 col-4'>
        <h3> Related Products</h3>
        {relatedProducts &&
          relatedProducts.map((p, i) => (
            <div key={i}>
              <Card product={p} />
            </div>
          ))}
      </div>
    </LayOut>
  )
}

const mapStateToProps = ({ product }) => ({
  getSingleProduct: product.getSingleProduct,
  fetchRelatedProducts: product.fetchRelatedProducts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (data) => dispatch(loadSingleProduct(data)),
    relatedProducts: (data) => dispatch(relatedProducts(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)
