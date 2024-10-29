import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Modal, Spinner } from 'flowbite-react';
import {  generate_meal_plan } from '../../redux/slices/mealplansSlice'; // Add this action
import EditAssessmentModal from './EditAssessmentModal';
import CustomButton from '../common/CustomButton';


// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, onDecline }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Before We Generate Your Meal Plan</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Would you like to review and update your dietary preferences and goals before we generate your meal plan?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        
        <CustomButton variant='orangeoutline' onClick={onDecline}>No, Continue</CustomButton>
        <CustomButton variant='secondary' onClick={onConfirm}>Yes, Update</CustomButton>
        
      </Modal.Footer>
    </Modal>
  );
};

// Loading Modal Component
const LoadingModal = ({ isOpen, status }) => {
  return (
    <Modal show={isOpen} onClose={() => {}} dismissible={false}>
      <Modal.Body>
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <Spinner size="xl" color="purple" />
          <h3 className="text-lg font-semibold mt-4">Generating Your Meal Plan</h3>
          <p className="text-gray-600 text-center">{status}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Success Alert Component
const SuccessAlert = ({ isVisible, message }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-4 right-4 w-96">
      <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        {message}
      </div>
    </div>
  );
};


// Main Component to Manage Generation Flow
const MealPlanGenerationFlow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditPreferences, setShowEditPreferences] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const {assessment}=useSelector((state)=>state.assessment);
  
  const handleGenerateClick = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmationResponse = (wantToEdit) => {
    setShowConfirmation(false);
    if (wantToEdit) {
      setShowEditPreferences(true);
    } else {
      startGeneration();
    }
  };
  
  const startGeneration = async () => {
    setShowLoading(true);
    setLoadingStatus('Analyzing your preferences...');
    
    try {
      setLoadingStatus('Creating your personalized meal plan...');
      const result = await dispatch( generate_meal_plan()).unwrap();
      
      

      if(result.meal_plan_id&&result.meals_structure.length!=0){
        setShowLoading(false);
        setShowSuccess(true);
        navigate(`/mealplan/${result.meal_plan_id}/`);
      }



      
      
      // Hide success message after 3 seconds and navigate
      // setTimeout(() => {
      //   setShowSuccess(false);
        
      // }, 5000);
      
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
      setLoadingStatus('Error generating meal plan. Please try again.');
      setTimeout(() => setShowLoading(false), 2000);
    }
  };
  
  return (
    <>
     
     <div className="flex justify-end">
     <CustomButton variant="greenoutline" onClick={handleGenerateClick} length="cta">Generate Meal Plan</CustomButton>

     </div>
     
      
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => handleConfirmationResponse(true)}
        onDecline={() => handleConfirmationResponse(false)}
      />
      
      <EditAssessmentModal
        isOpen={showEditPreferences}
        onClose={() => setShowEditPreferences(false)}
        assessment={assessment}
      />
      
      <LoadingModal
        isOpen={showLoading}
        status={loadingStatus}
      />
      
      <SuccessAlert
        isVisible={showSuccess}
        message="Meal plan generated successfully! Redirecting..."
      />
    </>
  );
};

export default MealPlanGenerationFlow;