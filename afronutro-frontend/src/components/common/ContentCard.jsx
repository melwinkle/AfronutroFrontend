import React from "react"
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const ContentCard = ({ children, img, title, id }) => {
    return (
        <div className="col-span-1 w-full">
            <div className="card-body">
                
                <img src={img} alt="" className="rounded-lg w-full object-cover bg-afro-light h-48"  onError={(e)=>{e.target.src=defaultImage}} />
                <h5 className="text-afro-brown font-bold text-2xl">{title}</h5>
                <p className="text-afro-gray text-sm line-clamp-1">{children}</p>
                <Link to={`/blog/${id}`}><CustomButton variant="greenoutline" length="content">Read More</CustomButton></Link>
                
            </div>
        </div>

        )
        }
export default ContentCard;