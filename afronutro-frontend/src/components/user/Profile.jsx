import React, { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton";
import NutritionCircle from "../common/NutritionCircle";
import ProfileCircle from "../common/ProfileCircle";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"; // Import useNavigate
import { updateProfile,resetPassword,getProfile } from "../../redux/slices/authSlice.js"; // Import updateProfile function from authSlice
import { calculateBMI, calculateTDEE,getActivityLevel,getBMICategory,getBmiBorderColor} from "../../utils/helper.js"; // Import helper functions
import { recalculateDietaryAssessment,fetchDietaryAssessment } from "../../redux/slices/assessmentSlice.js";
import { useRef } from "react";
import { setAuthenticated } from "../../redux/slices/authSlice.js";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state
  const dispatch = useDispatch();
  const {assessment}=useSelector((state)=>state.assessment);
  const fetchAssesment=useRef(false);

  const profileFetched = useRef(false);

  // Fetch profile data if not available
  useEffect(() => {
    if (!user && !isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, user, isAuthenticated]);

  // Initialize form data after user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        gender: user.gender || "Male",
        weight: user.weight || 0.0,
        height: user.height || 0.0,
        activity_levels: user.activity_levels || 1.55
      });
    }
  }, [user]);


  // State to manage edit mode and input values
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    gender: user?.gender || "Male",
    weight: user?.weight || 0.0,
    height: user?.height || 0.0,
    activity_levels: user?.activity_levels||1.55
  });

  // Update formData on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated&&!fetchAssesment.current) {
      dispatch(fetchDietaryAssessment());
      fetchAssesment.current=true;
    }
  }, [isAuthenticated, dispatch]);

  // Handle profile update
  const handleUpdate = async () => {
    // Check if weight, height, or activity_levels changed
    const statsChanged = 
      formData.weight !== user.weight ||
      formData.height !== user.height ||
      formData.activity_levels !== user.activity_levels;
  
    // Update profile
    dispatch(updateProfile(formData));
    
    // If critical stats changed and user has an assessment, recalculate
    if (statsChanged && assessment.user==user.id) {
       dispatch(recalculateDietaryAssessment());
    }
    
    setEditMode(false);
  };

  const handlesendrequest=()=>{
    dispatch(resetPassword({email:user.email}));
    }

    useEffect(() => {
      if (user && !isAuthenticated) {
        // If we have a user but isAuthenticated is false, fix the state
        dispatch(setAuthenticated(true));
      }
    }, [user, isAuthenticated, dispatch]);

 

  

  // Calculate missing TDEE and BMI
  const bmi = user?.bmi || calculateBMI(formData.height, formData.weight);
  const tdee = user?.tdee || calculateTDEE(formData.weight, formData.height, user?.age, formData.gender,formData.activity_levels);
  const bmiCategory = getBMICategory(bmi);
  const activitylevel=getActivityLevel(user?.activity_levels)
  const bmiBorderColor = getBmiBorderColor(bmiCategory);

//   request password change
// deactivte account 

if (!isAuthenticated) {
  console.log('Redirecting due to no auth');
  return <Navigate to="/" replace />;
}

  return (
    <div className="flex flex-col space-y-4">
      <div className="shadow rounded w-full flex flex-col lg:flex-row p-4  divide-afro-gray-mid-light">
        <div className="flex flex-col  items-center justify-center  w-full lg:w-1/4 lg:border-r ">
          <img className="h-20 w-20 bg-afro-teal rounded-full object-cover" />
          <h1 className="text-center text-4xl font-bold">{user ? user.username : null}</h1>
          <p className="text-center text-sm">{user ? user.email : null}</p>
          <CustomButton variant="orangeoutlines" length="secondary" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Edit Profile"}
          </CustomButton>
        </div>

        <div className="flex flex-col">

   
        <div className="grid grid-cols-3 gap-12 lg:items-center justify-center p-4 w-full ">
          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Age</h1>
            <p className="text-lg">{user ? user.age : 0}</p>
          </div>

          {/* Gender field */}
          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Gender</h1>
            {editMode ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="text-lg border p-1 rounded w-full "
              />
            ) : (
              <p className="text-lg">{formData.gender}</p>
            )}
          </div>

          {/* Weight field */}
          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Weight</h1>
            {editMode ? (
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="text-lg border p-1 rounded w-full"
              />
            ) : (
              <p className="text-lg">{formData.weight} kg</p>
            )}
          </div>

          {/* Height field */}
          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Height</h1>
            {editMode ? (
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="text-lg border p-1 rounded w-full"
              />
            ) : (
              <p className="text-lg">{formData.height} cm</p>
            )}
          </div>

          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Activity Level</h1>
            {editMode ? (
              <input
                type="number"
                name="activity_levels"
                value={formData.activity_levels}
                onChange={handleInputChange}
                className="text-lg border p-1 rounded w-full"
              />
            ) : (
              <p className="text-lg">{activitylevel} </p>
            )}
          </div>

          <div>
            <h1 className="text-sm text-afro-gray-mid-light">Status</h1>
            <p className="text-lg">{user ? user.is_verified.toString() : "True"}</p>
          </div>

        </div>

        {editMode && (
        <div className="flex justify-end">
          <CustomButton variant="orangeoutlines" length="secondary" onClick={handleUpdate}>
            Update Profile
          </CustomButton>
        </div>
      )}
           </div>

        <div className="p-2 flex flex-col lg:flex-row space-y-4 lg:space-x-10 justify-center items-center">
          <ProfileCircle title={"TDEE"} borderColor={"afro-purple"} info={"kcal/day"}>
            {tdee}
          </ProfileCircle>
          <ProfileCircle title={"BMI"} borderColor={bmiBorderColor} info={bmiCategory}>
            {bmi}
          </ProfileCircle>
        </div>
      </div>

      

      <div className="shadow rounded w-full p-2 space-y-4">
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="flex justify-between items-center">
          <p className="w-1/2">Change Password</p>
          <CustomButton variant="orangeoutline" length="cta" onClick={handlesendrequest}>
            Change
          </CustomButton>
        </div>
        <div className=" flex justify-between items-center">
          <p className="w-1/2">Deactivate</p>
          <CustomButton variant="orangeoutline" length="cta">
            Deactivate
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Profile;
