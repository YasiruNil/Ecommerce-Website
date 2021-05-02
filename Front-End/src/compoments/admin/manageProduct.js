import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import EditProduct from "./editProduct"
import React, { useState, useEffect } from "react"
import { getProducts, updateAProduct, deleteAProduct } from "../../actions/index"


const ManageProducts = (props) => {
  const [productsFetch, setProductFetch] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState({})
  const {
    user: { _id },
    token,
  } = isAuth()
  const handleDelete = (productId) => {
    console.log(productId)
    console.log(_id)
    const data = { productId, _id, token }
    props.deleteAProduct(data)
  }
  const onCreate = (values) => {
    var index = productsFetch.findIndex((el) => el._id === values._id)
    var newValue = [...productsFetch]
    const { name, description, price, quantity, sold, shipping } = values
    newValue[index].name = name
    newValue[index].sold = sold
    newValue[index].price = price
    newValue[index].quantity = quantity
    newValue[index].shipping = shipping
    newValue[index].description = description
    let newFormData = new FormData()
    newFormData.append("name",name)
    newFormData.append("sold",sold)
    newFormData.append("price",price)
    newFormData.append("quantity",quantity)
    newFormData.append("shipping",shipping)
    newFormData.append("description",description)
    let productId = values._id
    const newData = {productId,_id,token,newFormData }
    props.updateAProduct(newData)
    setProductFetch(newValue)
    setVisible(false)
  }

  useEffect(() => {
    props.getProducts()
  }, [])
  useEffect(() => {
    setProductFetch(props.getProductsItem)
  }, [props.getProductsItem])

  return (
    <>
      <LayOut title='Manage Product' description='Perform CRUD on Products'>
        <div classNeme='row'>
          <div className='col-md-12'>
            <ul className='list-group'>
              {productsFetch &&
                productsFetch.map((p, i) => (
                  <>
                    <li
                      key={i}
                      className='list-group-item d-flex justify-content-between align-items-center'>
                      <strong>{p.name}</strong>

                      <span
                        className='badge badge-warning badge-pill'
                        onClick={() => {
                          setVisible(true)
                          setSelectedProduct(p)
                        }}>
                        Update
                      </span>

                      <span
                        onClick={() => handleDelete(p._id)}
                        className='badge badge-warning badge-pill'>
                        Delete
                      </span>
                    </li>
                    <EditProduct
                      visible={visible}
                      onCreate={onCreate}
                      onCancel={() => {
                        setVisible(false)
                      }}
                      selectedProduct={selectedProduct}
                    />
                  </>
                ))}
            </ul>
          </div>
        </div>
      </LayOut>
    </>
  )
}
const mapStateToProps = ({ product }) => ({
  getProductsItem: product.getProducts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (data) => dispatch(getProducts(data)),
    deleteAProduct: (data) => dispatch(deleteAProduct(data)),
    updateAProduct: (data) => dispatch(updateAProduct(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts)
