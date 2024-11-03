import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ children, img, title, id, calories, time, rating, totalRatings }) => {
  return (
    <div className="col-span-1 lg:col-span-1 xl:col-span-1 lg:w-full xl:w-64 h-full">
      <Link to={`/recipes/${id}`} className="h-full">
        <div className="shadow rounded h-full flex flex-col">
          <img
            src={img}
            alt=""
            className="rounded-t w-full object-cover bg-afro-light h-36"
          />
          <div className="p-2 flex flex-col flex-grow">
            <hr className="bg-afro-brown w-1/4 h-1" />
            <div className="flex-grow flex flex-col min-h-[100px]">
              <h5 className="text-afro-dark font-bold text-xl line-clamp-2 mb-2">
                {title}
              </h5>
              <p className="text-afro-gray text-xs  mb-2">
                {children}
              </p>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between w-4/5 md:w-3/4">
              <div className="flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-afro-green dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="font-light text-xs text-afro-gray-dark">
                  {time} mins
                </p>
              </div>
              <div className="flex justify-center items-center">
                <svg
                  className="w-6 h-6 text-afro-green dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1"
                    d="M5 5v14m14 0V8h2M3 8h6m0-2v8.5858c0 .8909 1.0771 1.3371 1.7071.7071l.5858-.5858c.3905-.3905 1.0237-.3905 1.4142 0l.5858.5858c.3905.3905 1.0237.3905 1.4142 0l.5858-.5858c.3905-.3905 1.0237-.3905 1.4142 0l.5858.5858c.63.63 1.7071.1838 1.7071-.7071V6c0-.55228-.4477-1-1-1h-8c-.55229 0-1 .44772-1 1Z"
                  />
                </svg>
                <p className="font-extralight text-xs text-afro-gray-dark">
                  {calories} kcal
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default RecipeCard;