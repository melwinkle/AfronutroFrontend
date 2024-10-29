import React from "react"

const Tags = ({ children,variant}) => {
    const variants={
        primary: "border border-afro-gray-mid text-afro-gray-mid",
        secondary: "border border-afro-brown text-afro-gray-dark rounded-xl w-full w-full text-center  ",
        danger: "border border-afro-red text-red-700",
        success: "border border-afro-green text-afro-green-700",
        select: "bg-afro-brown text-white rounded-xl w-1/2 text-center  w-full",
    }
    return (
        <div className={`rounded p-1 ${variants[variant]} `}>
            <h2 className="flex items-center justify-center space-x-2 text-base">{children}</h2>
        </div>
        )
        }
        export default Tags;