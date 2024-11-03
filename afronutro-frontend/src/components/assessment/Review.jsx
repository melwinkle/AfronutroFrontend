import React, { useEffect } from "react";
import ContinueButton from "../common/ContinueButton";
import weight from "../../assets/images/weights.svg";
import Tags from "../common/Tags";
import {
  getActivityLevels,
  getLabelByValue,
  getGoalLabelByValue,
} from "../../utils/helper";
import {
  createDietaryAssessment,
  clearAssessment,
} from "../../redux/slices/assessmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLevel,fetchDietaryPreference,fetchHealthGoal } from "../../redux/slices/dataSlice";
import { Alert } from "flowbite-react";

const ReviewPage = ({ formData, nextStep }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading, error, status } = useSelector((state) => state.assessment);
  const {activityLevels,healthGoals,dietaryPreferences} = useSelector((state) => state.data);


  useEffect(() => {
    dispatch(fetchActivityLevel());
    dispatch(fetchHealthGoal());
    dispatch(fetchDietaryPreference());
  }, [dispatch]);

  useEffect(() => {
    // Move to loader page if submission was successful
    if (status === "succeeded") {
      nextStep();
    }
  }, [status, nextStep]);

  const handleSubmit = async () => {
    if (isAuthenticated) {
      dispatch(createDietaryAssessment(formData));
    } else {
      // Just proceed to next step for unauthenticated users
      nextStep();
    }
  };

  const handleActivityLevelChange = (value) => {
    // chekc if the value in the parameter is eqaul to the valeu in a sub array if yes then retuen the display_name
    const activityLevel = activityLevels.find((item) => item.value === value);
    return activityLevel ? activityLevel.display_name : "";
  }

  const handleGoalChange = (value) => {
    const goal = healthGoals.find((item) => item.value === value);
    return goal ? goal.display_name : "";
    }
    
    const handleDietaryPreferenceChange = (value) => {
      const preference = dietaryPreferences.find((item) => item.value === value);
      return preference ? preference.display_name : "";
      }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Review Your Information
      </h2>
      {error && (
        <Alert variant="info" className="mb-4">
          Please try submitting again.
        </Alert>
      )}

      {/* Display user data for review */}
      <div className="mb-4">
        <h3 className="text-lg font-bold">Personal Data</h3>
        <div className="flex  flex-col lg:flex-row  lg:space-x-2 ">
          <div className="flex flex-col space-y-1 w-full lg:w-1/2">
            <p>Name</p>
            <input
              type="text"
              value={formData.personalData.name}
              className=" border border-afro-brown rounded"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-1  w-full lg:w-1/2">
            <p>Age</p>
            <input
              type="text"
              value={formData.personalData.age}
              className=" border border-afro-brown rounded"
              readOnly
            />
          </div>
          <div className="flex flex-col space-y-1  w-full lg:w-1/2">
            <p>Gender</p>
            <input
              type="text"
              value={formData.personalData.gender}
              className=" border border-afro-brown rounded"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-1  w-full lg:w-1/2">
            <p>Weight(kg)</p>
            <input
              type="text"
              value={formData.personalData.weight}
              className=" border border-afro-brown rounded"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-1  w-full lg:w-1/2">
            <p>Height(cm)</p>
            <input
              type="text"
              value={formData.personalData.height}
              className=" border border-afro-brown rounded"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Activity Level:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.activity_levels.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>
                <img src={weight} />
                {handleActivityLevelChange(goal)}
              </Tags>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Goals:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.health_goals.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>
                <img src={weight} />
                {handleGoalChange(goal)}
              </Tags>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Cuisines:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.cuisine_preference.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>
                <img src={weight} />
                {goal}
              </Tags>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Dietary Preferences:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.dietary_preferences.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>
                <img src={weight} />
                {handleDietaryPreferenceChange(goal)}
              </Tags>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Liked Ingredients:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.liked_ingredients.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>{goal}</Tags>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Disliked Ingredients:</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
          {formData.disliked_ingredients.map((goal, index) => (
            <div key={index} onClick={() => toggleGoal(goal)}>
              <Tags variant={"secondary"}>{goal}</Tags>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}

      <div className="flex justify-end">
        <ContinueButton nextStep={handleSubmit} agreed={!loading}>
          {loading ? "Submitting..." : "Submit"}
        </ContinueButton>
      </div>
    </div>
  );
};

export default ReviewPage;
