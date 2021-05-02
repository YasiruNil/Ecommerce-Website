import Card from "./card"
import Query from "query-string"
import { connect } from "react-redux"
import React, { useState, useEffect } from "react"
import { searchOption, fetchCategories } from "../../actions/index"

const Search = (props) => {
  const [data, setData] = useState({
    result: [],
    search: "",
    category: "",
    categories: [],
  })
  useEffect(() => {
    props.fetchCategories()
  }, [])
  useEffect(() => {
    setData({ ...data, result: props.fetchSearchedItems })
  }, [props.fetchSearchedItems])

  useEffect(() => {
    setData({ ...data, categories: props.categories })
  }, [props.categories])
  const searchSubmit = async (e) => {
    e.preventDefault()
    const { search, category } = data
    if (search === "") {
      const value = { category }
      const datas = Query.stringify(value)
      console.log(datas)
      props.searchOption(datas)
    } else if (search === "" && category === "") {
      const value = {}
      const datas = Query.stringify(value)
      console.log(datas)
      props.searchOption(datas)
    } else if (category === "") {
      const value = { search }
      const datas = Query.stringify(value)
      console.log(datas)
      props.searchOption(datas)
    } else {
      const value = { search, category }
      const datas = Query.stringify(value)
      console.log(datas)
      props.searchOption(datas)
    }
  }
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value })
  }
  return (
    <div className='row'>
      <div className='container'>
        <form onSubmit={searchSubmit}>
          <span className='input-group-text'>
            <div className='input-group input-group-lg'>
              <div className='input-group-append'>
                <select
                  className='btn mr-2'
                  onChange={handleChange("category")}>
                  <option value='All'>Pick Category</option>
                  {data.categories &&
                    data.categories.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type='search'
                className='form-control'
                placeholder='Search by Name'
                onChange={handleChange("search")}
              />
            </div>
            <div className='btn imput-group-append' style={{ border: "none" }}>
              <button className='input-group-text'>Search</button>
            </div>
          </span>
        </form>

        <div className='row mt-4 mb-4'>
          {props.filterSize !== ""
            ? `Found ${props.filterSize} Products`
            : "No Products Found"}
          {data.result &&
            data.result.map((p, i) => (
              <div key={i} className='col-md-4'>
                <Card product={p} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ category, shop }) => ({
  filterSize: shop.filterSize,
  categories: category.fetchCategories,
  fetchSearchedItems: shop.fetchSearchedItems,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    searchOption: (data) => dispatch(searchOption(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
