import React, { useState } from "react";
import { Link } from "react-router-dom";
import personal from "../../assets/images/personal.svg"
import goals from "../../assets/images/goals.svg"
import gym from "../../assets/images/gym.svg"
import pizza from "../../assets/images/pizza.svg"
import ContinueButton from "../common/ContinueButton";

const AssessmentWelcome = ({ nextStep }) => {
  const [agreed, setAgreed] = useState(false); // State to track if the user agreed to the terms

  // Handler for checkbox toggle
  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked); // Update agreed state based on checkbox status
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6 text-afro-brown flex flex-col"><span className="text-afro-gray-dark text-3xl">Welcome to</span> Afronutro Dietary Assessment</h1>
      <p className="mb-8 text-lg">
        We're excited to guide you through our personalized questionnaire to create the perfect meal plan for you.
        Here’s what we’ll do:
      </p>

      {/* Row of Icons and Descriptions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 text-afro-green font-bold">
        <div className="flex flex-col items-center justify-center">
          <img src={personal} className="h-24"/>
          <p>Get personal data</p>
        </div>
        <div className="flex flex-col items-center justify-center">
        <img src={goals} className="h-24"/>
          <p>Understand your goals</p>
        </div>
        <div className="flex flex-col items-center justify-center">
        <img src={gym} className="h-24"/>
          <p>Learn your preferences</p>
        </div>
        <div className="flex flex-col items-center justify-center">
        <img src={pizza} className="h-24"/>
          <p>Understand your dislikes</p>
        </div>
      </div>

      <p className="text-md mb-8">
        After completing the questionnaire, your personalized meal plan will be generated.
        Before proceeding, please agree to our terms and conditions.
      </p>

      

      {/* Checkbox for agreeing to Terms and Conditions */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="checkbox"
          id="agree"
          className="mr-2 rounded"
          onChange={handleAgreeChange} // Update agreed state on checkbox change
        />
        <label htmlFor="agree" className="text-sm">
          I agree to the <Link
          to="/terms-conditions"
          className="text-afro-green underline hover:text-afro-brown"
        >
           Terms and Conditions
        </Link>
        </label>
      </div>

      {/* Next Button */}
      <ContinueButton nextStep={nextStep} agreed={agreed}> Continue</ContinueButton>
    </div>
  );
};

export default AssessmentWelcome;
