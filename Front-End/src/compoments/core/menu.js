import "./coreStyle.css"
import { isAuth } from "./auth"
import { compose } from "redux"
import { connect } from "react-redux"
import { cartTotal } from './cartHelper'
import React, { useEffect } from "react"
import Badge from '@material-ui/core/Badge'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { userSignOut, clearSignInData } from "../../actions/index"

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 3,
      border: `1px solid ${theme.palette.background.paper}`,
    
    },
  }))(Badge)

const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return { color:'#ff9900',border : 0 }
    }else{
        return { color:'#ffffff',border : 0 }
    }
}
const Menu = (props) =>{
    const signOut = async() =>{
        await props.userSignOut()
        props.clearSignInData()
    }
    useEffect(() => {
        if(props.signInData.role === 1){
            props.history.push("/admin/dashboard")
        }else{
            props.history.push("/dashboard")
        }
      }, [props.signInData])
      useEffect(() => {
        if(props.signOutData !== ""){
            props.history.push("/")
        }
      }, [props.signOutData])
    return (
        <div>
            <ul className='nav nav-tabs bg-primary m-0'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/' style={isActive(props.history,'/')}>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/shop' style={isActive(props.history,'/shop')}>Shop</Link>
                </li>
             
                {isAuth() && isAuth().user.role === 0 &&
                <li className='nav-item'>
                <Link className='nav-link' to='/dashboard' style={isActive(props.history,'/dashboard')}>DashBoard</Link>
                </li>
                }
                 {isAuth() && isAuth().user.role === 1 &&
                 <>
                <li className='nav-item'>
                <Link className='nav-link' to='/admin/dashboard' style={isActive(props.history,'/admin/dashboard')}>DashBoard</Link>
                </li>
                 <li className='nav-item'>
                 <Link className='nav-link' to='/admin/orders-list' style={isActive(props.history,'/admin/orders-list')}>Orders</Link>
                 </li>
                 </>
                }
                {!isAuth() && 
                <>
                 <li className='nav-item'>
                 <Link className='nav-link' to='/sign-in' style={isActive(props.history,'/sign-in')}>SignIn</Link>
                 </li>
                 <li className='nav-item'>
                 <Link className='nav-link' to='/sign-up' style={isActive(props.history,'/sign-up')}>SignUp</Link>
                 </li>
                 </>
                }
               
                {isAuth() && 
                <>
                 <li className='nav-item'>
                 <Link className='nav-link' to= "/" style={{cursor: "pointer",color:"#ffffff",border : 0,}} onClick={()=>signOut()}>Sign Out</Link>
                 </li>
                 </>
                }
                   <li className='nav-item'>
                    <Link className='nav-link' to='/cart' style={isActive(props.history,'/cart')}>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartTotal()} color="secondary" size="small">
                                <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                    </Link>
                </li>
               
            </ul>
        </div>
    )
}

const mapStateToProps = ({user}) => ({
    signOutData: user.signOutData,
    signInData: user.signInData,

})

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOut: (data) => dispatch(userSignOut(data)),
        clearSignInData: (data) => dispatch(clearSignInData(data)),

        
    }
}

export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(Menu)