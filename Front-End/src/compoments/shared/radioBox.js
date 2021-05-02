import React, { useState, useEffect } from "react"


const RadioBox = (props) => {
  const [value, setValue] = useState([])
  //   const handleChange = (e) => {
  //     console.log(e.target.value)
  //     setValue(e.target.value)
  //     for (let key in prices) {
  //       if (prices[key].name === e.target.value) {
  //         const data = prices[key].array
  //         console.log(data)
  //         props.filteredPrice(data)

  //       }
  //     }
  //   }
  const handleChange = (e) => {
      props.handleFilters(e.target.value)
      setValue(e.target.value)
  }
  return (
    <>
      {props.price &&
        props.price.map((p, i) => (
          <div key={i}>
            <input
              onChange={handleChange}
              value={p._id}
              name={p}
              type='radio'
              className='mr-2 ml-4'
            />
            <label className="form-check-label">{p.name}</label>
          </div>
        ))}
    </>
  )
}

export default RadioBox
