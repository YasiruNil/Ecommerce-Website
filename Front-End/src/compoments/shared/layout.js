import React from "react"


const LayOut = ({title="Title",description="Description",children, className}) =>{
    return (
        <div>
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
        </div>
    )
}

export default LayOut