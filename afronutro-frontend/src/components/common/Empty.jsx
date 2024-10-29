import React from "react"
import sad from "../../assets/images/sad.svg"

const Empty=()=>{
    return(
        <div className="p-8 text-afro-gray font-bold flex justify-center items-center flex-col">
            <img src={sad}/>
            <h1 className="text-3xl text-center">Oh no! There is no data</h1>
        </div>
    )}
export default Empty;