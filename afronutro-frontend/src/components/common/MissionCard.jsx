import React from "react";

const MissionCards = ({ children, number, header, plan,order="primary" }) => {
    const variants={
        primary:'order-1',
        secondary:'order-1 md:order-last'
    }
  return (
    <div className={`flex flex-col md:flex-row items-center justify-center space-x-2 `}>
        <div className={`flex-grow ${variants[order]} `}>
        <img src={plan} className="w-5/6 h-3/4"/>

        </div>
     
      <div className={`flex flex-col md:flex-row w-full md:w-3/5 ${order === 'primary' ? 'order-2' : 'order-1'}`}>
        <h1 className="text-afro-brown font-extrabold text-8xl ">0{number}</h1>
        <div className="flex flex-col -space-y-1">
          <p className="font-bold text-xl">{header}</p>
          <p className="text-sm/5 text-justify">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCards;
