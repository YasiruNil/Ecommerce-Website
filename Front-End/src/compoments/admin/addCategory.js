import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import React, { useState } from "react"
import { createCategory } from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const AddCategory = (props) => {
  const [name, setName] = useState("")

  const { user, token } = isAuth()
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = async (e) => {
    let _idOfTheUser = user._id
    const data = { _idOfTheUser, name, token }
    props.createCategory(data)
  }
  return (
    <>
      <LayOut title='Add a New Category' description={`${user.name}`}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className='container mt-4'>
            <div className='row '>
              <div className='col-md-12'>
                <TextValidator
                  label='Category Name'
                  value={name}
                  name='name'
                  onChange={handleChange}
                  fullWidth
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
      </LayOut>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCategory: (data) => dispatch(createCategory(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddCategory)
