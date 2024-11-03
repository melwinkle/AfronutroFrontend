import React, { useState,useEffect,useRef } from "react";
import Tags from "../common/Tags"; // Adjust the import path based on your file structure
import ContinueButton from "../common/ContinueButton";
import weight from "../../assets/images/weights.svg";
import { useDispatch,useSelector } from "react-redux";
import { fetchHealthGoal } from "../../redux/slices/dataSlice";

const Goals = ({ nextStep, prevStep, updateFormData,data }) => {
  // Sample goals array
  const dispatch = useDispatch();
  const {healthGoals} = useSelector((state) => state.data);
  const fetchContent=useRef(false);


  

  // Fetch activity levels when the component mounts
  useEffect(() => {
    if(fetchContent.current){
      dispatch(fetchHealthGoal());
      fetchContent.current=true;
      }
  }, [dispatch]);

  // const goalsArray = [
  //   { value: 'LOS', label: 'Lose Weight ' },
  //   { value: 'MAI', label: 'Maintain Weight' },
  //   { value: 'GAI', label: 'Gain Weight ' },
  //   { value: 'FIT', label: 'Improve Fitness' },
  //   { value: 'MUS', label: 'Increase Muscle' },
  // ];

  const [selectedGoals, setSelectedGoals] = useState(() => {
    // Ensure we're working with an array
    return Array.isArray(data) ? data : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle goal selection
  const toggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  // Optional: Update selectedLevel if data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSelectedGoals(data);
    }
  }, [data]);



  

  // Filter goals based on search term
  const filteredGoals = healthGoals.filter((goal) =>
    goal.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    updateFormData({ health_goals: selectedGoals });
    nextStep();
  };

  return (
    <div >
      <h2 className="text-2xl font-bold mb-1 text-center">What are your dietary goals?</h2>
      <p className="text-center text-afro-gray-mid mb-4">
        Choose at least one goal to continue
      </p>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search goals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-afro-brown p-2 rounded-full w-full"
        />
      </div>

      {/* Tags display */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
        {filteredGoals.map((goal, index) => (
          <div key={index} onClick={() => toggleGoal(goal.value)}>
            <Tags variant={selectedGoals.includes(goal.value) ? "select" : "secondary"}>
              <img src={weight}/>{goal.display_name}
            </Tags>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={prevStep}
          className="border border-afro-brown text-afro-brown py-4 px-4 rounded bg-transparent w-1/2"
        >
          Previous
        </button>

        {/* Next button - disabled if no goals are selected */}
        <ContinueButton nextStep={handleNext} agreed={selectedGoals.length > 0}>
          Next
        </ContinueButton>
      </div>
    </div>
  );
};

export default Goals;
