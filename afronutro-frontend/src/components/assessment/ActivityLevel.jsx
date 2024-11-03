import React, { useState, useEffect,useRef} from "react";
import Tags from "../common/Tags";
import ContinueButton from "../common/ContinueButton";
import taco from "../../assets/images/Taco.svg";
import { getActivityLevel } from "../../utils/helper";
import { fetchActivityLevel } from "../../redux/slices/dataSlice";
import { useDispatch,useSelector } from "react-redux";

const ActivityLevel = ({ nextStep, prevStep, updateFormData, data }) => {
  const dispatch = useDispatch();
  const {activityLevels} = useSelector((state) => state.data);
  // useRef const fetchContent=useRef(false);
  const fetchContent=useRef(false);



  

  // Fetch activity levels when the component mounts
  useEffect(() => {
    if (!fetchContent.current) {
      dispatch(fetchActivityLevel());
      fetchContent.current = true;
      }
  }, [dispatch]);

  // const activityLevels = [
  //   { value: 'SED', label: 'Sedentary ' },
  //   { value: 'LIG', label: 'Lightly Active' },
  //   { value: 'MOD', label: 'Moderately Active ' },
  //   { value: 'VER', label: 'Very Active' },
  //   { value: 'EXT', label: 'Extra Active ' },
  // ];

  // Initialize selectedLevel with data if it exists, otherwise empty array
  const [selectedLevel, setSelectedLevel] = useState(() => {
    // Ensure we're working with an array
    return Array.isArray(data) ? data : [];
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  // Optional: Update selectedLevel if data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSelectedLevel(data);
    }
  }, [data]);

  const toggleLevel = (levelValue) => {
    setSelectedLevel([levelValue]); // Always set as an array with single value
  };

  const filteredLevels = activityLevels.filter((level) =>
    level.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  const handleNext = () => {
    // Ensure we're updating with the correct field name
    updateFormData({ activity_levels: selectedLevel });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-center">How active are you?</h2>
      <p className="text-center text-afro-gray-mid mb-4">
        Choose your activity level to continue
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search level..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-afro-brown p-2 rounded-full w-full"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
        {filteredLevels.map((level, index) => (
          <div 
            key={index} 
            onClick={() => toggleLevel(level.value)}
            className="cursor-pointer"
          >
            <Tags 
              variant={
                Array.isArray(selectedLevel) && selectedLevel.includes(level.value) 
                  ? "select" 
                  : "secondary"
              }
            >
              <img src={taco} alt="Icon" />
              {level.display_name}
            </Tags>
          </div>
        ))}
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={prevStep}
          className="border border-afro-brown text-afro-brown py-4 px-4 rounded bg-transparent w-1/2"
        >
          Previous
        </button>
        <ContinueButton 
          nextStep={handleNext} 
          agreed={Array.isArray(selectedLevel) && selectedLevel.length > 0}
        >
          Next
        </ContinueButton>
      </div>
    </div>
  );
};

export default ActivityLevel;