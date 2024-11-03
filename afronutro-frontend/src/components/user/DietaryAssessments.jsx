import React, { useState,useEffect,useRef } from "react";
import CustomButton from "../common/CustomButton";
import ProfileCircle from "../common/ProfileCircle";
import sad from "../../assets/images/sad.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchDietaryAssessment, deleteDietaryAssessment } from "../../redux/slices/assessmentSlice"; // adjust import path
import { getBMICategory,getBmiBorderColor,round_to_two_decimal_places } from "../../utils/helper";
import EditPreferencesModal from "../modal/EditPreferencesModal";
import Spinner from "../common/Spinner";

const DietaryAssessments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { assessment, loading } = useSelector((state) => state.assessment);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchAssessmentRef=useRef(false);



  useEffect(() => {
    if (isAuthenticated&!fetchAssessmentRef.current) {
      dispatch(fetchDietaryAssessment());
      fetchAssessmentRef.current=true;

    }
  }, [isAuthenticated, dispatch]);

  const handleAssessment = () => {
    navigate("/mealgenerator");
  };

  const handledelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = (confirmed) => {
    if (confirmed) {
      dispatch(deleteDietaryAssessment());
    }
    setShowDeleteConfirmation(false);
  };

  const handleEditPreferences = () => {
    // do we tske it back to the assessment or we edit in a popup?
    setShowEditModal(true);
  };
  const bmiCategory = getBMICategory(assessment?.bmi);
  const bmiBorderColor = getBmiBorderColor(bmiCategory);

  if (loading) {
    return <Spinner/>; // Consider using a proper loading component
  }
  return (
    <div>
      {isAuthenticated && assessment ? (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-end w-full space-x-2">
            <CustomButton variant="orangeoutline" length="cta" onClick={handleEditPreferences}>
              Edit Preferences
            </CustomButton>
            <CustomButton variant="greenoutline" length="cta" onClick={handledelete}>
              Delete Assessment
            </CustomButton>
          </div>

          <div className="border border-afro-brown p-2 rounded shadow flex flex-col space-y-2">
            <h1 className="font-bold text-2xl">Summary</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-center"><ProfileCircle
              title={"BMI"}
              borderColor={bmiBorderColor}
              info={bmiCategory}
            >
              {round_to_two_decimal_places(assessment.bmi)}
            </ProfileCircle>
            <ProfileCircle
              title={"TDEE"}
              borderColor={"afro-purple-mid"}
              info={"kcal/day"}
            >
              {round_to_two_decimal_places(assessment.tdee)}
            </ProfileCircle>
            <ProfileCircle
              title={"Goals"}
              borderColor={"afro-mint"}
              info={"health"}
            >
              {assessment.health_goals? assessment.health_goals.length:0}
            </ProfileCircle>
            <ProfileCircle
              title={"Preferences"}
              borderColor={"afro-purple"}
              info={"dietary"}
            >
              {assessment.dietary_preferences?assessment.dietary_preferences.length:0}
            </ProfileCircle></div>
            
          </div>
          <div className="border border-afro-brown p-2 rounded shadow">
            <h1 className="font-bold text-2xl">Assessment Summary</h1>
            <p className="text-afro-gray-mid text-justify">
              {assessment?.assessment}
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-afro-brown p-2 shadow rounded flex flex-col items-center justify-center">
            <img  src={sad}/>
            <h1 className="font-bold text-sm">No assessment generated. Fill the survey and get your dietary summary</h1>
            <CustomButton variant="orangeoutline" length="cta" onClick={handleAssessment}>Generate assessment</CustomButton>
        </div>
      )}

{showDeleteConfirmation && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow mx-4">
                <h2 className="font-bold text-lg">Delete Assessment Confirmation</h2>
                <p className="text-afro-gray-mid text-justify">
                  Are you sure you want to delete your dietary assessment?
                </p>
                <div className="flex justify-end space-x-2">
                  <CustomButton variant="orangeoutline" length="cta" onClick={() => handleDeleteConfirmation(false)}>
                    Cancel
                  </CustomButton>
                  <CustomButton variant="greenoutline" length="cta" onClick={() => handleDeleteConfirmation(true)}>
                    Delete
                  </CustomButton>
                </div>
              </div>
            </div>
          )}

<EditPreferencesModal
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  assessment={assessment}
/>
    </div>
  );
};
export default DietaryAssessments;
