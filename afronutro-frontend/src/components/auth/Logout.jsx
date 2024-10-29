import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner } from 'flowbite-react';
import { logoutUser } from '../../redux/slices/authSlice.js';
import CustomButton from '../common/CustomButton';

const Logout = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (

    //     <CustomButton onClick={handleLogout} agreed={loading}>
    //   {loading ? (
    //     <>
    //       <Spinner size="sm" className="mr-3" />
    //       Logging out...
    //     </>
    //   ) : 'Logout'}
    //   </CustomButton>
      <a
      href="#"
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    >
      Sign out
    </a>
 
  );
};

export default Logout;