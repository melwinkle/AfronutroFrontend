import React, { useState, useEffect } from "react";
import ContinueButton from "../common/ContinueButton";
import { useSelector } from "react-redux";

const PersonalData = ({ nextStep, prevStep, updateFormData, data }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  


  // Initialize state with a function to ensure proper evaluation
  const [personalData, setPersonalData] = useState(() => {
    // First check if we have data passed from parent
    if (data && Object.keys(data).length > 0) {
      return data;
    }
    
    // Then check if we have authenticated user data
    if (isAuthenticated && user) {
      return {
        name: user.username || '',
        age: user.age || '',
        weight: user.weight || '',
        height: user.height || '',
        gender: user.gender || '',
      };
    }
    
    // Default empty state
    return {
      name: '',
      age: '',
      weight: '',
      height: '',
      gender:'' 
    };
  });

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  // Effect to update personal data when user data becomes available
  useEffect(() => {
    if (isAuthenticated && user && !data) {
      setPersonalData({
        name: user.username || personalData.name,
        age: user.age || personalData.age,
        weight: user.weight || personalData.weight,
        height: user.height || personalData.height,
        gender: user.gender || personalData.gender
      });
    }
  }, [isAuthenticated, user, data]);

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate if all required fields are filled
  useEffect(() => {
    const { name, age, weight, height,gender } = personalData;
    const isValid = Boolean(
      name?.trim() && 
      age && 
      gender &&
      weight && 
      height
    );
    setIsNextDisabled(!isValid);
  }, [personalData]);

  const handleNext = () => {
    updateFormData({ personalData });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-center">Tell us a bit about yourself</h2>
      <p className="text-center text-afro-gray-mid mb-4">We are happy you are here with us</p>
      
      {/* Name field */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={personalData.name || ''}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Age field */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Age</label>
        <input
          type="number"
          name="age"
          value={personalData.age || ''}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
          min="0"
        />
      </div>

      <div className="flex space-x-2 w-full">
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-bold mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={personalData.weight || ''}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            min="0"
            step="0.1"
          />
        </div>



        <div className="mb-4 w-1/2">
          <label className="block text-sm font-bold mb-2">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={personalData.height || ''}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            min="0"
          />
        </div>

        {/*select for gender */}
        <div className="mb-4 w-1/2">
  <label className="block text-sm font-bold mb-2">Gender</label>
  <select
    name="gender"
    value={personalData.gender || ''} // Ensure default value is set correctly
    onChange={handleChange}
    className="border border-gray-300 p-2 rounded w-full"
  >
    <option value="" disabled>Select Gender</option> {/* Make this option disabled to prevent selection */}
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={prevStep}
          className="border border-afro-brown text-afro-brown py-4 px-4 rounded bg-transparent w-1/2"
        >
          Previous
        </button>
        <ContinueButton nextStep={handleNext} agreed={!isNextDisabled}>
          Next
        </ContinueButton>
      </div>
    </div>
  );
};

export default PersonalData;