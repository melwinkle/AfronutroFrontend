import React from 'react';

const MealType = ({ children, color }) => {
    const variants={
        'breakfast': 'bg-afro-pink-mid/40 text-afro-pink',
        'lunch': 'bg-afro-teal/40 text-afro-teal',
        'dinner': 'bg-afro-purple/40 text-afro-purple',
        'snack': 'bg-afro-orange/40 text-afro-orange',
    }
    return (
        <div className={`${variants[color]} rounded-l-lg  h-48 w-20 flex items-center justify-center `}>
            <p className='text-xl -rotate-90'>{children}</p>
        </div>
    )
}
export default MealType;