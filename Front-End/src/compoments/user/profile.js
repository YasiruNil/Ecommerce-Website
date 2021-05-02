import LayOut from "../shared/layout"
import { isAuth } from "../core/auth"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { userUpdateInLs } from "../core/cartHelper"
import {
  getUserData,
  updateUserData,
  changeUserUpdate,
} from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const Profile = (props) => {
  let history = useHistory()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  const {
    user: { _id },
    token,
  } = isAuth()
  useEffect(() => {
    props.getUserData({ _id, token })
  }, [])
  useEffect(() => {
    setUser(props.userData)
  }, [props.userData])
  useEffect(() => {
    const { name, email } = user
    const newValues = { name, email }
    if (props.userUpdate === true) {
      userUpdateInLs(newValues, () => {
        return history.push("/dashboard"), props.changeUserUpdate()
      })
    }
  }, [props.userUpdate])

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== user.password) {
        return false
      }
      return true
    })
  }, [user, user.confirm_password])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    // your submit logic
    e.preventDefault()
    const { name, email, password } = user
    const values = { name, email, password }
    const data = { _id, token, values }
    props.updateUserData(data)
    console.log(data)
  }

  const profileUpdate = (name, email, password) => {
    return (
      <ValidatorForm onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row mt-3'>
            <div className='col-md-6'>
              <TextValidator
                label='Name'
                value={name && name}
                name='name'
                onChange={handleChange}
                fullWidth
                variant='outlined'
                validators={["required"]}
                errorMessages={["This field is required!"]}
              />
            </div>
            <div className='col-md-6'>
              <TextValidator
                label='Email'
                value={email && email}
                name='email'
                onChange={handleChange}
                fullWidth
                variant='outlined'
                validators={["required", "isEmail"]}
                errorMessages={[
                  "This field is required!",
                  "email is not valid",
                ]}
              />
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-md-6'>
              <TextValidator
                label='Password'
                value={password && password}
                name='password'
                onChange={handleChange}
                fullWidth
                type='password'
                variant='outlined'
                validators={[
                  "required",
                  "matchRegexp:^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
                ]}
                errorMessages={[
                  "This field is required!",
                  "Should have at least one number and one upper latter",
                ]}
              />
            </div>
            <div className='col-md-6'>
              <TextValidator
                label='Confirm Password'
                value={confirm_password && confirm_password}
                name='confirm_password'
                onChange={handleChange}
                fullWidth
                type='password'
                variant='outlined'
                validators={["required", "isPasswordMatch"]}
                errorMessages={["This field is required!", "password mismatch"]}
              />
            </div>
          </div>
        </div>
        <div className='container mt-3'>
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
      </ValidatorForm>
    )
  }
  const { name, email, password, confirm_password } = user
  return (
    <LayOut title='User Profile' description={`${name}'s User Profile`}>
      {profileUpdate(name, email, password, confirm_password)}
    </LayOut>
  )
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
  userUpdate: user.userUpdate,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (data) => dispatch(getUserData(data)),
    changeUserUpdate: () => dispatch(changeUserUpdate()),
    updateUserData: (data) => dispatch(updateUserData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
