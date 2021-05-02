import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { UserSignUp } from "../../actions/index"
import React, { useState, useEffect } from "react"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const SignUp = (props) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  })
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== fields.password) {
        return false
      }
      return true
    })
  }, [fields,fields.confirm_password])
  const handleSubmit = (e) => {
    // your submit logic
    e.preventDefault()
    const { name, email, password } = fields
    const data = { name, email, password }
    props.UserSignUp(data)
  }

  const signUpForm = () => {
    return (
      <ValidatorForm onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <TextValidator
                label='Name'
                value={fields.name}
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
                value={fields.email}
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
                value={fields.password}
                name='password'
                onChange={handleChange}
                fullWidth
                type="password"
                variant='outlined'
                validators={["required",'matchRegexp:^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})']}
                errorMessages={["This field is required!","Should have at least one number and one upper latter"]}
              />
            </div>
            <div className='col-md-6'>
              <TextValidator
                label='Confirm Password'
                value={fields.confirm_password}
                name='confirm_password'
                onChange={handleChange}
                fullWidth
                type="password"
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
  return (
    <LayOut title='signUp' description='Node React E-commerce App'>
      {signUpForm()}
    </LayOut>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserSignUp: (data) =>
        dispatch(UserSignUp(data)),
    }
}

export default connect(null, mapDispatchToProps)(SignUp)
