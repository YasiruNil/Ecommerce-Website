import React from "react"
import LayOut from "../shared/layout"
import { isAuth } from "../core/auth"
import { Link } from "react-router-dom"

const AdminDashBoard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuth()
  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>Admin Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/create-category'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/create-product'>
              Create Product
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/orders-list'>
              Orders List
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to='/admin/products'>
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const adminInfo = () => {
    return (
      <div className='cart mb-3'>
        <h3 className='card-header'>Admin Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    )
  }
  return (
    <LayOut title='DashBoard' description={`${name}'s Dashboard`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>{adminLinks()}</div>
          <div className='col-md-8'>{adminInfo()}</div>
        </div>
      </div>
    </LayOut>
  )
}

export default AdminDashBoard
