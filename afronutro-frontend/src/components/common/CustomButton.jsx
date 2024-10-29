import React from 'react';

const CustomButton = ({ children, onClick, variant = 'primary',length= 'primary',type="button" }) => {
  const baseClasses = 'py-2 px-4 transition-colors font-medium ';
  
  const variants = {
    primary: 'bg-afro-green hover:bg-afro-teal text-white rounded-full ',
    secondary: 'bg-afro-green hover:bg-afro-mint text-white hover:text-white rounded ',
    cta: 'bg-afro-brown hover:bg-afro-brown text-white rounded ',
    outline: 'bg-transparent border border-white rounded-full text-white',
    greenoutline:'bg-transparent border border-afro-green rounded text-afro-green',
    greenoutlines:'bg-transparent border border-afro-green rounded-full text-afro-green',
    orangeoutline:'bg-transparent border border-afro-brown rounded text-afro-brown',
    orangeoutlines:'bg-transparent border border-afro-brown rounded-full text-afro-brown',
  };

  const lengths ={
    primary: 'w-full',
    secondary: 'w-1/2',
    cta: 'lg:w-1/4 w-3/4',
    content:'lg:w-3/4 w-1/2',
    plan: 'w-1/4'
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${lengths[length]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CustomButton;