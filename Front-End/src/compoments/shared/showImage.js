import React from "react"
import "../core/coreStyle.css"
import { APIBASEURL } from "../../config"

const ShowImage = (props) => {
  const { item, url } = props
  return (
    <div className='product-img'>
      <img
        src={`${APIBASEURL}${url}/photo/${item._id}`}
        alt={item.name}
        className='mb-3'
        style={{ maxHeight: "100%", maxWidth: "100%" }}></img>
    </div>
  )
}

export default ShowImage
