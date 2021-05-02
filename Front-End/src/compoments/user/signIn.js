import LayOut from "../shared/layout"
import { connect } from "react-redux"
import React, { useState } from "react"
import { UserSignIn, clearSignOutData } from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const SignIn = (props) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmitForm = () => {
    // your submit logic
    const { email, password } = fields
    const data = { email, password }
    props.clearSignOutData()
    props.UserSignIn(data)
  }
  const signInForm = () => {
    return (
    <>
      <ValidatorForm onSubmit={handleSubmitForm}>
        <div className='container'>
          <div className='row '>
            <div className='col-md-12'>
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
            <div className='col-md-12 mt-4'>
            <TextValidator
                label='Password'
                value={fields.password}
                name='password'
                onChange={handleChange}
                fullWidth
                type="password"
                variant='outlined'
                validators={["required"]}
                errorMessages={["This field is required!"]}
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
      </>
    )
  }
  return (
    <LayOut title='signIn' description='Node React E-commerce App'>
      {signInForm()}
    </LayOut>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserSignIn: (data) => dispatch(UserSignIn(data)),
        clearSignOutData : (data) => dispatch(clearSignOutData(data)),
        
    }
}

export default connect(null, mapDispatchToProps)(SignIn)
