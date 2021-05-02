import moment from "moment"
import { connect } from "react-redux"
import LayOut from "../shared/layout"
import { isAuth } from "../core/auth"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { getUserPurchaseHistory } from "../../actions/index"

const DashBoard = (props) => {
  const [history, setHistory] = useState([])
  const {
    user: { _id, name, email, role },
    token,
  } = isAuth()

  useEffect(() => {
    props.getUserPurchaseHistory({ _id, token })
  }, [])
  useEffect(() => {
    setHistory(props.userPurchaceHistory)
  }, [props.userPurchaceHistory])

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/cart'>
              My Cart
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  const userInfo = () => {
    return (
      <div className='cart mb-3'>
        <h3 className='card-header'>User Information</h3>
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
  const PurchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </li>
        </ul>
      </div>
    )
  }
  return (
    <LayOut title='DashBoard' description={`${name}'s Dashboard`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>{userLinks()}</div>
          <div className='col-md-8'>
            {userInfo()}
            {PurchaseHistory(history)}
          </div>
        </div>
      </div>
    </LayOut>
  )
}

const mapStateToProps = ({ user }) => ({
  userPurchaceHistory: user.userPurchaceHistory,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPurchaseHistory: (data) => dispatch(getUserPurchaseHistory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
