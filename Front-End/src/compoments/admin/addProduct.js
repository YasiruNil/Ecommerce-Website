import LayOut from "../shared/layout"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import MenuItem from "@material-ui/core/MenuItem"
import React, { useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import { createProduct, fetchCategories } from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    justifyContent: "center",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)

const AddProduct = (props) => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({
    name: "",
    price: "",
    photo: "",
    category: "",
    quantity: "",
    description: "",
    shipping: false,
    formData: new FormData(),
  })
  const { user, token } = isAuth()
  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value })
  }
  const handleChangeShippong = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.checked })
  }
  const handleChangePhoto = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    const {
      name,
      photo,
      price,
      formData,
      quantity,
      shipping,
      category,
      description,
    } = products

    formData.append("name", name)
    formData.append("price", price)
    formData.append("photo", photo)
    formData.append("quantity", quantity)
    formData.append("shipping", shipping)
    formData.append("category", category)
    formData.append("description", description)
    let _idOfTheUser = user._id
    const data = { _idOfTheUser, formData, token }
    props.createProduct(data)
  }
  useEffect(() => {
    props.fetchCategories()
  }, [])
  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])
  return (
    <>
      <LayOut title='Add a New Category' description={`${user.name}`}>
        <ValidatorForm onSubmit={handleSubmit}>
          <div className='container mt-4'>
            <div className='row mb-3'>
              <div className='col-md-6 mb-3'>
                <TextValidator
                  label='Product Name'
                  value={products.name}
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
                  label='Description'
                  value={products.description}
                  name='description'
                  onChange={handleChange}
                  fullWidth
                  rows={3}
                  variant='outlined'
                  validators={["required"]}
                  errorMessages={["This field is required!"]}
                />
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-md-6 mb-3'>
                <TextValidator
                  label='Price'
                  value={products.price}
                  name='price'
                  onChange={handleChange}
                  fullWidth
                  variant='outlined'
                  validators={[
                    "required",
                    "minNumber:0",
                    "maxNumber:1000000",
                    "matchRegexp:^[0-9]+$",
                  ]}
                  errorMessages={[
                    "This field is required!",
                    "Should be Greater than 0",
                    "Should be less than 10 Laks",
                    "Should be a Number",
                  ]}
                />
              </div>
              <div className='col-md-6'>
                <TextValidator
                  label='Quantity'
                  value={products.quantity}
                  name='quantity'
                  onChange={handleChange}
                  fullWidth
                  variant='outlined'
                  validators={[
                    "required",
                    "minNumber:0",
                    "maxNumber:100000",
                    "matchRegexp:^[0-9]+$",
                  ]}
                  errorMessages={[
                    "This field is required!",
                    "Should be Greater than 0",
                    "Should be less than 1 Laks",
                    "Should be a Number",
                  ]}
                />
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-md-6 mb-3'>
                <Typography
                  component='div'
                  className='d-flex justify-content-center mb-1'>
                  Shipping
                </Typography>
                <Grid
                  component='label'
                  container
                  alignItems='center'
                  justify='center'
                  spacing={2}>
                  <Grid item>No</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={products.shipping}
                      onChange={handleChangeShippong}
                      name='shipping'
                    />
                  </Grid>
                  <Grid item>Yes</Grid>
                </Grid>
              </div>
              <div className='col-md-6'>
                <FormControl variant='outlined' fullWidth>
                  <TextValidator
                    id='select'
                    select
                    fullWidth
                    variant='outlined'
                    value={products.category}
                    onChange={handleChange}
                    name='category'
                    label='Category'>
                    {categories &&
                      categories.map((c, i) => (
                        <MenuItem value={c._id}>{c.name}</MenuItem>
                      ))}
                  </TextValidator>
                </FormControl>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mb-3'>
                <Button variant='contained' color='primary' component='span'>
                  <input
                    accept='image/*'
                    style={{ border: "none" }}
                    id='contained-button-file'
                    type='file'
                    name='photo'
                    onChange={handleChangePhoto}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className='container mt-3 mb-3'>
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </ValidatorForm>
      </LayOut>
    </>
  )
}
const mapStateToProps = ({ category }) => ({
  categories: category.fetchCategories,
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    createProduct: (data) => dispatch(createProduct(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
