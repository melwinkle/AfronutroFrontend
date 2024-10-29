import React,{useEffect, useRef} from "react"
import { useParams,useNavigate } from 'react-router-dom';
import BackButton from "../common/BackButton";
import { useDispatch,useSelector } from "react-redux";
import { fetchEducationalContentById } from "../../redux/slices/contentSlice";

const EducationalContentSingle=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { contentDetail, loading, error } = useSelector((state) => state.content);
    const fetchContent=useRef(false)

    useEffect(() => {
        if(fetchContent.current===false){
            dispatch(fetchEducationalContentById(id));
            fetchContent.current=true
            }
      }, [dispatch,id]);

 
    return(
        <div>
           
            <div className="bg-afro-mint h-96 flex flex-col items-center justify-center bg-opacity-55 p-4 text-center ">
                <h1 className="font-bold text-3xl md:text-5xl text-afro-brown">{contentDetail?.title} </h1>
                <p className="text-afro-gray-mid">{contentDetail?.description}</p>


            </div>
            
            <div  className="p-4">
            <BackButton/>
                <p className="text-justify">
                    The age of time i slike aponkey and kakra
                </p>
            </div>

        </div>
    )
}
export default EducationalContentSingle;  