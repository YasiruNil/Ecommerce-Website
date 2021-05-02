import Card from "../shared/card"
import LayOut from "../shared/layout"
import { connect } from "react-redux"
import CheckBox from "../shared/checkBox"
import RadioBox from "../shared/radioBox"
import { prices } from "../shared/fixedPrices"
import React, { useState, useEffect } from "react"
import { filterProduct, fetchCategories } from "../../actions/index"

const Shop = (props) => {
  const [categoryItems, setCategories] = useState([])
  const [filtersAll, setFiltersAll] = useState({
    filter: { category: [], price: [] },
  })
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  const [size, setSize] = useState(6)

  useEffect(() => {
    props.fetchCategories()
  }, [])
  useEffect(() => {
    const data = { skip, limit, filtersAll }
    props.filterProduct(data)
  }, [filtersAll])
  const handleFilters = (filters, filterBy) => {
    const newfilters = { ...filtersAll }
    newfilters.filter[filterBy] = filters
    if (filterBy === "price") {
      let priceValue = handlePrice(filters)
      newfilters.filter[filterBy] = priceValue
    }
    setFiltersAll(newfilters)
  }
  const handlePrice = (value) => {
    const data = prices
    let arrays = []
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        arrays = data[key].array
      }
    }
    return arrays
  }
  const loadMore =()=>{
    let toSkip =skip + limit
    const data = { toSkip, limit, filtersAll }
    props.filterProduct(data)
    setSkip(toSkip)
  }

  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])
  return (
    <LayOut
      title='Shopping Page'
      description='Node React E-commerce App'
      className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <h4>Filter by Categories</h4>
          <ul>
            <CheckBox
              categories={categoryItems}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter By Price</h4>
          <div>
            <RadioBox
              price={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className='col-md-8'>
          <h2 className='mb-2'> Products</h2>
          <div className='row'>
            {props.fetchFilteredItems &&
              props.fetchFilteredItems.map((item, i) => (
                <div key={i} className='col-md-4'>
                  <Card  product={item} />
                </div>
              ))}
          </div>
          <div className="mt-4 d-flex justify-content-center ">
            <button onClick={()=>loadMore()} className="btn btn-warning w-100 mb-5">Load More</button>
          </div>
        </div>
      </div>
    </LayOut>
  )
}
const mapStateToProps = ({ category, shop }) => ({
  categories: category.fetchCategories,
  fetchFilteredItems: shop.fetchFilteredItems,
})

const mapDispatchToProps = (dispatch) => {
  return {
    filterProduct: (data) => dispatch(filterProduct(data)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
