import React, { useState,useEffect,useRef} from "react";
import Tags from "../common/Tags"; // Adjust the import path based on your file structure
import ContinueButton from "../common/ContinueButton";
import taco from "../../assets/images/Taco.svg";
import { useDispatch,useSelector } from "react-redux";
import { fetchDietaryPreference } from "../../redux/slices/dataSlice";


const Preferences = ({ nextStep, prevStep, updateFormData,data }) => {
  // Sample dietary preferences array

  const dispatch = useDispatch();
  const {dietaryPreferences} = useSelector((state) => state.data);
  const fetchContent=useRef(false);


  

  // Fetch activity levels when the component mounts
  useEffect(() => {
    if(!fetchContent.current){
      dispatch(fetchDietaryPreference());
      fetchContent.current=true;
      }
  }, [dispatch]);
  
  // const preferencesArray = [
  //   { value: 'GLU', label: 'Gluten-Free' },
  //   { value: 'VGT', label: 'Vegetarian' },
  //   { value: 'VEG', label: 'Vegan' },
  //   { value: 'DAI', label: 'Dairy-Free' },
  //   { value: 'NUT', label: 'Nut-Free' },
  //   { value: 'KET', label: 'Keto' },
  //   { value: 'PAL', label: 'Paleo' },
  //   { value: 'LAC', label: 'Lactose-Free' },
  //   { value: 'SHE', label: 'Shellfish-Free' },
  //   { value: 'EGG', label: 'Egg-Free' },
  //   { value: 'SOY', label: 'Soy-Free' },
  //   { value: 'PEA', label: 'Peanut-Free' },
  //   { value: 'KOS', label: 'Kosher' },
  //   { value: 'HAL', label: 'Halal' },
  //   { value: 'LSU', label: 'Low Sugar' },
  //   { value: 'DIA', label: 'Diabetic' },
  //   { value: 'SPI', label: 'Spicy Food' },
  //   { value: 'SWE', label: 'Sweet Food' },
  //   { value: 'SAV', label: 'Savory Food' },
  //   { value: 'ORG', label: 'Organic' },
  //   { value: 'HPR', label: 'High Protein' },
  //   { value: 'LCA', label: 'Low Carb' },
  //   { value: 'HFI', label: 'High Fiber' }
  // ];
  



  const [selectedPreferences, setSelectedPreferences] = useState(() => {
    // Ensure we're working with an array
    return Array.isArray(data) ? data : [];
  })
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle preference selection
  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(selectedPreferences.filter((p) => p !== preference));
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

   // Optional: Update selectedLevel if data changes
   useEffect(() => {
    if (data && Array.isArray(data)) {
      setSelectedPreferences(data);
    }
  }, [data]);

  // Filter preferences based on search term
  const filteredPreferences = dietaryPreferences.filter((preference) =>
    preference.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    updateFormData({ dietary_preferences: selectedPreferences });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-center">What are your dietary preferences?</h2>
      <p className="text-center text-afro-gray-mid mb-4">
        Choose at least one preference to continue
      </p>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search preferences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-afro-brown p-2 rounded-full w-full"
        />
      </div>

      {/* Tags display */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-8">
        {filteredPreferences.map((preference, index) => (
          <div key={index} onClick={() => togglePreference(preference.value)}>
            <Tags variant={selectedPreferences.includes(preference.value) ? "select" : "secondary"}>
            <img src={taco}/>{preference.display_name}
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

        {/* Next button - disabled if no preferences are selected */}
        <ContinueButton nextStep={handleNext} agreed={true}>
          Next
        </ContinueButton>
      </div>
    </div>
  );
};

export default Preferences;
