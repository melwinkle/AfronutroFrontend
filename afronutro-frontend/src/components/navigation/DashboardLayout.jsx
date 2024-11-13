import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { getProfile, setAuthenticated } from "../../redux/slices/authSlice";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!user && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, user, isAuthenticated]);

  useEffect(() => {
    console.log('Auth State:', { 
      isAuthenticated, 
      loading, 
      hasUser: !!user,
      userData: user 
    });
  }, [isAuthenticated, loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!isAuthenticated) {
  //   console.log('Redirecting due to no auth');
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="flex mx-4 mt-4">
      <UserMenu />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;