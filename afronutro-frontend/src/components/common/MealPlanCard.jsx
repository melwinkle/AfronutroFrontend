import React from "react";
import { Link } from "react-router-dom";

const MealPlanCard=({children,id})=>{
    return(
        <Link to={`/mealplan/${id}/`} className="w-full rounded-lg bg-[url('assets/images/citrus.png')] bg-cover bg-afro-gray col-span-2 md:col-span-1   h-52 p-2  flex items-center justify-center ">
        <div className=" flex flex-col items-center justify-center ">
            <p className="text-white font-bold text-3xl text-center">{children}</p>
            <p className="text-white text-sm">Monthly</p>

        </div>
        </Link>
    )

}
export default MealPlanCard;