import React, { useState } from "react"


const CheckBox = (props) => {
    const [checked,setChecked] = useState([])

    const handleToggle = categoryId =>{
    const currentCategoryId =checked.indexOf(categoryId)
    const newCheckedCategoryId = [...checked]
    console.log(currentCategoryId)
    if(currentCategoryId === -1){
        newCheckedCategoryId.push(categoryId)
    }else{
        newCheckedCategoryId.splice(currentCategoryId,1)
    }
    setChecked(newCheckedCategoryId)
    props.handleFilters(newCheckedCategoryId)
    }
  return props.categories && props.categories.map((c,i)=>(
      <li key={i} className="list-unstyled">
          <input onChange={()=>handleToggle(c._id)} value={ checked.indexOf(c._id)=== -1 } type="checkbox" className="form-check-input"/>
          <label className="form-check-label">{c.name}</label>
      </li>
  ))
}


export default CheckBox
