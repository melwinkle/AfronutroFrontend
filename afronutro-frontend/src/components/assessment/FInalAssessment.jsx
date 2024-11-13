import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"; // To access the auth state
import Loader from "./Loader";
import ContinueButton from "../common/ContinueButton";
import confetti from "../../assets/images/Confetti.svg";
import NutritionCircle from "../common/NutritionCircle";
import Modal from "../common/Modal"; // Assuming you have a modal component or create one
import CustomButton from "../common/CustomButton";
import { useNavigate,useLocation } from "react-router-dom";
import { registerUser,logoutUser } from "../../redux/slices/authSlice";
import { fetchDietaryAssessment,createDietaryAssessment,setFormData,setHasRegistered,clearFormData } from "../../redux/slices/assessmentSlice";
import EmailVerificationModal from "../modal/EmailVerificationModal";
import { Alert } from "flowbite-react";
import { calculateBMI,calculateTDEE,getActivityLevelV } from "../../utils/helper";


const FinalAssessment = ({ formData, nextStep }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user=useSelector((state) => state.auth.user);
  const { assessment } = useSelector((state) => state.assessment);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const persistedFormData = useSelector((state) => state.assessment.formData);
  const hasRegistered = useSelector((state) => state.assessment.hasRegistered);
  const location = useLocation();

  

  // Only fetch assessment if user is authenticated and active, and hasn't just registered
  useEffect(() => {
    if (isAuthenticated && user?.is_active && !hasRegistered) {
      dispatch(fetchDietaryAssessment());
    }
  }, [isAuthenticated, user?.is_active, hasRegistered, dispatch]);

  
  useEffect(() => {
    if (formData) {
      dispatch(setFormData(formData));
    }
  }, [formData, dispatch]);



  useEffect(() => {
    const shouldClearData = !location.pathname.includes('/mealgenerator');
    
    if (shouldClearData) {
      dispatch(clearFormData());
    }

    return () => {
      if (shouldClearData) {
        dispatch(clearFormData());
      }
    };
  }, [location.pathname, dispatch]);

  // Safe access to form data with fallbacks
  const safeFormData = persistedFormData || formData || {
    personalData: {},
    dietary_preferences: [],
    activity_levels: [],
    health_goals: [],
    liked_ingredients: [],
    disliked_ingredients: []
  };

  const level = safeFormData.activity_levels?.[0] ? getActivityLevelV(safeFormData.activity_levels[0]) : '';
  const weight = parseFloat(safeFormData.personalData?.weight) || 0;
  const height = parseFloat(safeFormData.personalData?.height) || 0;
  const age = parseInt(safeFormData.personalData?.age) || 0;
  const name = safeFormData.personalData?.name || 'User';
  const bmi = height && weight ? calculateBMI(height, weight) : 0;
  const tdee = height && weight && age ? calculateTDEE(
    weight,
    height,
    age,
    safeFormData.personalData?.gender || 'M',
    level
  ) : 0;

  const handleEmailSubmit = async (email) => {
    try {
      setIsProcessing(true);
      
      const registrationData = {
        email,
        username: name,
        password: 'Afronutro12345$',
        password2: 'Afronutro12345$',
        age: age,
        gender: safeFormData.personalData?.gender || 'M',
        height: height,
        weight: weight,
        activity_levels: level,
        tdee: parseFloat(tdee),
        bmi: parseFloat(bmi),
        is_active: "True"
      };

      const registerResponse = await dispatch(registerUser(registrationData)).unwrap();
      const userId = registerResponse.user.id;
      const username = registerResponse.user.username;
      
      const assessmentData = {
        dietary_preferences: safeFormData.dietary_preferences || [],
        activity_levels: safeFormData.activity_levels || [],
        health_goals: safeFormData.health_goals || [],
        liked_ingredients: safeFormData.liked_ingredients || [],
        disliked_ingredients: safeFormData.disliked_ingredients || [],
      };
      
      await dispatch(createDietaryAssessment(assessmentData)).unwrap();
      await dispatch(logoutUser()).unwrap();

      dispatch(setHasRegistered(true));
      
      setShowModal(false);
      setShowVerificationAlert(true);

    } catch (error) {
      console.error('Registration/Assessment creation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {

      nextStep();
    }
  };

  // Clear persisted data when leaving the assessment flow
  const handleLater = () => {
    dispatch(clearFormData());
    navigate('/assessment');
  };

  // Determine if the Generate Meal Plan button should be shown
  const showGenerateMealPlan = isAuthenticated || (!isAuthenticated && !hasRegistered);



  if (!safeFormData) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Submission Complete</h2>

      {showVerificationAlert && (
        <Alert
          variant="success"
          className="mb-4"
          onDismiss={() => setShowVerificationAlert(false)}
        >
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-bold">Verification Email Sent</h3>
              <p className="text-sm">
                Please check your email to verify your account. You can continue exploring
                the app in the meantime. Your account has been registered and assessment have been saved!
                Your temporary password is Afronutro12345$
              </p>
            </div>
          </div>
        </Alert>
      )}

      <div className="flex flex-col items-center">
        <img src={confetti} className="h-12 w-12" alt="Confetti" />
        <h3 className="font-bold text-afro-gray-dark text-4xl">
          Congratulations, {name}!
        </h3>
        <p className="text-sm text-afro-gray">
          Your dietary assessment has been generated. Here is your statistics summary below:
        </p>

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mx-8 p-4">
          <NutritionCircle title="TDEE" borderColor="afro-purple">
            {Math.round((isAuthenticated ? assessment?.tdee || tdee : tdee) * 100) / 100}
          </NutritionCircle>
          <NutritionCircle title="BMI" borderColor="afro-purple-mid">
            {Math.round((isAuthenticated ? assessment?.bmi || bmi : bmi) * 100) / 100}
          </NutritionCircle>
          <NutritionCircle title="Goals" borderColor="afro-orange">
            {(isAuthenticated ? assessment?.data.health_goals?.length : safeFormData.health_goals?.length) || 0}
          </NutritionCircle>
          <NutritionCircle title="Preferences" borderColor="afro-mint">
            {(isAuthenticated ? assessment?.data.dietary_preferences?.length : safeFormData.dietary_preferences?.length) || 0}
          </NutritionCircle>
        </div>
        </div>

        <div className="flex justify-center space-x-2">
        {isAuthenticated ? (
          <CustomButton 
            agreed={true} 
            variant="orangeoutline" 
            onClick={handleLater}
            length="plan"
          >
            Later
          </CustomButton>
        ) : null}
        
        {showGenerateMealPlan && (
          <ContinueButton 
            nextStep={handleNext} 
            agreed={true} 
            length="plan"
          >
            Generate Meal Plan
          </ContinueButton>
        )}
      </div>

      {showModal && (
        <Modal title="Login Required" onClose={() => setShowModal(false)}>
          <EmailVerificationModal
            onSubmit={handleEmailSubmit}
            onClose={() => setShowModal(false)}
            isProcessing={isProcessing}
          />
        </Modal>
      )}
    </div>
  );
};
export default FinalAssessment;

