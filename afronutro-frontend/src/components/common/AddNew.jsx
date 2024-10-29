import React from "react"

const AddNew=({onAdd})=>{
    return(
        <div className="h-48 border border-dashed border-afro-brown  w-64 p-2 flex flex-col items-center justify-center rounded">
            <a onClick={()=>onAdd()} className="flex flex-col items-center justify-center">
            <svg class="w-6 h-6 text-afro-brown dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
<h1 className="text-2xl font-bold text-afro-brown">Add New</h1>
            </a>
            



        </div>
    )
}
export default AddNew;  //exporting the component