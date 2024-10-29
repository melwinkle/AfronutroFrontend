import React, { useState,useEffect } from "react";
import AssessmentWelcome from "./AssessmentWelcome"; // Your welcome page
import PersonalData from "./PersonalData"; // Your personal data form
import Review from "./Review"; // Your review page
import Goals from "./Goals";
import Preferences from "./Preferences";
import Ingredients from "./Ingredients";
import Loader from "./Loader";
import FinalAssessment from "./FInalAssessment";
import MealPlanSummary from "./MealPlanSummary";
import ActivityLevel from "./ActivityLevel";
import LikedIngredients from "./LikedIngredients";
import { useSelector,useDispatch} from "react-redux";
import { clearAssessment } from "../../redux/slices/assessmentSlice";
import LoaderPlan from "./LoaderPlan";
import CuisinePreference from "./CuisinePreference";

const DietaryAssessment = () => {
  const [step, setStep] = useState(1); // Track the current step
  const assessmentStatus = useSelector((state) => state.assessment.status);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    personalData: {},
    health_goals: [],
    dietary_preferences: [],
    disliked_ingredients: [],
    liked_ingredients: [],
    activity_levels:[],
    cuisine_preferences:[],
    // ... Add more fields for other steps
  });

  const [mealPlanData, setMealPlanData] = useState(null);
  const handleMealPlanGenerated = (data) => {
    setMealPlanData(data);
  };
  useEffect(() => {
    // Clear any previous assessment state when mounting review page
    dispatch(clearAssessment());
  }, [dispatch]);

  // Function to handle next step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to handle previous step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Function to update form data
  const updateFormData = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  // Progress indicator
  const renderProgress = () => (
    <div className="text-center mb-4">
      <p>{`Step ${step} of 13`}</p>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="h-full bg-afro-brown rounded"
          style={{ width: `${(step / 13) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // Rendering the content based on the step
  const renderContent = () => {
    switch (step) {
      case 1:
        return <AssessmentWelcome nextStep={nextStep} />;
      case 2:
        return (
          <PersonalData
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            data={formData.personalData}
          />
        );
        case 3:
        return (
          <ActivityLevel
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            data={formData.activity_levels}
          />
        );
        case 4:
            return (
                <Goals
                nextStep={nextStep}
                prevStep={prevStep}
                updateFormData={updateFormData}
                data={formData.health_goals}
                />
        );
        case 5:
          return (
            <CuisinePreference
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            data={formData.cuisine_preferences}
            />
          );
        case 6:
            return (
                <Preferences
                nextStep={nextStep}
                prevStep={prevStep}
                updateFormData={updateFormData}
                data={formData.dietary_preferences}
                />
            );
            case 7:
            return(
                <LikedIngredients
                nextStep={nextStep}
                prevStep={prevStep}
                updateFormData={updateFormData}
                data={formData.liked_ingredients}
                />
            )
        case 8:
            return(
                <Ingredients
                nextStep={nextStep}
                prevStep={prevStep}
                updateFormData={updateFormData}
                data={formData.disliked_ingredients}
                />
            )
        case 9:
            return(
                <Review
            formData={formData}
            nextStep={nextStep}
            
          />

            );
        case 10:
            return(
                <Loader
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            );
        case 11:
            return(
                <FinalAssessment
                formData={formData}
                nextStep={nextStep}
                />
            );
        case 12:
            return(
              <LoaderPlan
                    nextStep={nextStep}
                    prevStep={prevStep}
                    onMealPlanGenerated={handleMealPlanGenerated}
              />
                
            );
      case 13:
        return (
          <MealPlanSummary formData={formData} mealPlanData={mealPlanData}/>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {renderProgress()}
      {renderContent()}
    </div>
  );
};

export default DietaryAssessment;
