import React, { useState, useEffect, useRef } from "react";
import { Button, TextInput, Badge, Checkbox } from "flowbite-react";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  fetchFilteredRecipes,
} from "../../redux/slices/recipeSlice";
import { fetchCuisineType,fetchTagsType } from "../../redux/slices/dataSlice";


const FilterSection = ({ onFiltersApplied, onClearFilters }) => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsLoading, ingredientsError } = useSelector(
    (state) => state.recipes
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const fetchingredientsRef=useRef(false);

  const [caloriesRange, setCaloriesRange] = useState([0, 1000]);
  const [cuisineInput, setCuisineInput] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dietary, setDietary] = useState({
    vegan: "False",
    vegetarian: "False",
    gluten_free: "False",
    pescatarian: "False",
    halal: "False",
  });
  

  // Fetch ingredients on component mount
  useEffect(() => {
    if ( !fetchingredientsRef.current) {
      dispatch(fetchIngredients());
      fetchingredientsRef.current = true;
      }
  }, [dispatch]);
  // Mock data for cuisines and ingredients
  // State for fetched cuisines and tags
  const{cuisines,tags}=useSelector((state)=>state.data)

  const [loadingCuisines, setLoadingCuisines] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);

  // get apis for that
  // const cuisines = [
  //   "italian",
  //   "chinese",
  //   "mexican",
  //   "indian",
  //   "japanese",
  //   "french",
  //   "thai",
  //   "greek",
  //   "ghanaian",
  // ];
  // const tags = [
  //   "high-fiber",
  //   "low-carb",
  //   "high-protein",
  //   "keto",
  //   "low-fat",
  //   "sugar-free",
  // ];
  // const ingredients = ['Tomato', 'Chicken', 'Rice', 'Beans', 'Onion', 'Garlic', 'Beef', 'Pork', 'Fish', 'Carrot'];


  // Fetch cuisines and tags on component mount
  useEffect(() => {
    const loadCuisinesAndTags = async () => {
      try {
        dispatch(fetchCuisineType());
        dispatch(fetchTagsType());
      } catch (error) {
        console.error("Error fetching cuisines or tags:", error);
      } finally {
        setLoadingCuisines(false);
        setLoadingTags(false);
      }
    };

    loadCuisinesAndTags();
  }, []);


  const handleDietaryChange = (key) => {
    setDietary(prev => ({
      ...prev,
      [key]: prev[key] === "True" ? "False" : "True" // Toggle between "True" and "False"
    }));
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const addItem = (item, selectedItems, setSelectedItems, setInput) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setInput("");
  };

  const removeItem = (item, selectedItems, setSelectedItems) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const filterItems = (items, input, key = "value") =>
    items.filter((item) => item[key]?.toLowerCase().includes(input?.toLowerCase()));
  
  // Modify filteredCuisines to use displayName for filtering
  const filteredCuisines = filterItems(cuisines, cuisineInput, "value");
  const filteredIngredients = ingredientsLoading
    ? []
    : filterItems(
        ingredients.map((ing) => ing.name),
        ingredientInput
      );
  const filteredTags = filterItems(tags, tagInput);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCuisines.length)
      params.append("cuisine", selectedCuisines.join(","));
    if (selectedTags.length) params.append("tags", selectedTags.join(","));
    if (selectedIngredients.length)
      params.append("ingredients", selectedIngredients.join(","));

    Object.entries(dietary).forEach(([key, value]) => {
      if (value === "True") {
        params.append(key, value);
      }
    });

    const hasActiveFilters = params.toString().length > 0;

    dispatch(fetchFilteredRecipes(params.toString()));
    onFiltersApplied(hasActiveFilters);
  };

 
  

  const handleClearFilters = () => {
    setCaloriesRange([0, 1000]);
    setSelectedCuisines([]);
    setSelectedIngredients([]);
    setSelectedTags([]);
    setDietary({
      vegan: false,
      vegetarian: false,
      gluten_free: false,
      pescatarian: false,
      halal: false,
    });
    onClearFilters();
  };

  const handleRangeChange = (index, value) => {
    const newRange = [...caloriesRange];
    newRange[index] = Number(value);
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    setCaloriesRange(newRange);
  };

  useEffect(() => {
    const minRange = document.getElementById("minRange");
    const maxRange = document.getElementById("maxRange");
  
    const updateRangeColors = () => {
      if (minRange && maxRange) { // Check if the elements exist
        const percent1 = (caloriesRange[0] / 2000) * 100;
        const percent2 = (caloriesRange[1] / 2000) * 100;
        minRange.style.background = `linear-gradient(to right, #e5e7eb ${percent1}%, #005236 ${percent1}%, #005236 ${percent2}%, #e5e7eb ${percent2}%)`;
        maxRange.style.background = `linear-gradient(to right, #e5e7eb ${percent1}%, #005236 ${percent1}%, #005236 ${percent2}%, #e5e7eb ${percent2}%)`;
      }
    };
  
    updateRangeColors();
  }, [caloriesRange]);
  

 


  if (!isAuthenticated) {
    return (
      <div className="p-4 border rounded-lg shadow-sm flex flex-col items-center justify-center text-center mb-4 h-80">
        <p className="text-lg font-semibold mb-4 text-afro-green">Please register or log in to use the filters</p>
        <span className="text-white text-4xl">🔒</span>

      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button color="light" onClick={handleClearFilters}>
          Clear
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Calories</h3>
        <div className="relative pt-1">
          <input
            id="minRange"
            type="range"
            min="0"
            max="2000"
            value={caloriesRange[0]}
            onChange={(e) => handleRangeChange(0, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer absolute"
          />
          <input
            id="maxRange"
            type="range"
            min="0"
            max="2000"
            value={caloriesRange[1]}
            onChange={(e) => handleRangeChange(1, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer absolute"
          />
        </div>
        <div className="flex justify-between mt-4">
          <TextInput
            type="number"
            value={caloriesRange[0]}
            onChange={(e) => handleRangeChange(0, e.target.value)}
            className="w-20"
          />
          <TextInput
            type="number"
            value={caloriesRange[1]}
            onChange={(e) => handleRangeChange(1, e.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Cuisines</h3>
        <div className="relative">
          <TextInput
            type="text"
            value={cuisineInput}
            onChange={handleInputChange(setCuisineInput)}
            placeholder="Type to search cuisines"
            className="w-full"
          />
          {cuisineInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {loadingCuisines ? (
            <p>Loading cuisines...</p>
          ) : cuisineInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {filteredCuisines.map((cuisine) => (
                <div
                  key={cuisine.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    addItem(
                      cuisine.value,
                      selectedCuisines,
                      setSelectedCuisines,
                      setCuisineInput
                    )
                  }
                >
                  {cuisine.display_name}
                </div>
              ))}
            </div>
          )}
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedCuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              color="info"
              className="mr-2 bg-afro-green/20 text-afro-green"
            >
              {cuisine}
              <button
                onClick={() =>
                  removeItem(cuisine, selectedCuisines, setSelectedCuisines)
                }
                className="ml-2 text-xs font-bold bg-transparent"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions Section */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Dietary Restrictions</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(dietary).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <Checkbox
                id={key}
                checked={value === "True"}
                onChange={() => handleDietaryChange(key)}
              />
              <label htmlFor={key} className="ml-2 text-sm capitalize">
                {key.replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Tags</h3>
        <div className="relative">
          <TextInput
            type="text"
            value={tagInput}
            onChange={handleInputChange(setTagInput)}
            placeholder="Type to search tags"
            className="w-full"
          />
          {loadingTags ? (
            <p>Loading tags...</p>
          ) : tagInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {filteredTags.map((tag) => (
                <div
                  key={tag.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    addItem(tag.value, selectedTags, setSelectedTags, setTagInput)
                  }
                >
                  {tag.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="mr-2 bg-afro-green/20 text-afro-green"
            >
              {tag}
              <button
                onClick={() => removeItem(tag, selectedTags, setSelectedTags)}
                className="ml-2 text-xs font-bold bg-transparent"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Ingredients Section with Loading State */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Ingredients</h3>
        <div className="relative">
          <TextInput
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            placeholder={
              ingredientsLoading
                ? "Loading ingredients..."
                : "Type to search ingredients"
            }
            disabled={ingredientsLoading}
            className="w-full"
          />
          {ingredientInput && !ingredientsLoading && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {filteredIngredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    addItem(
                      ingredient.toLowerCase(),
                      selectedIngredients,
                      setSelectedIngredients,
                      setIngredientInput
                    )
                  }
                >
                  {ingredient}
                </div>
              ))}
            </div>
          )}
        </div>
        {ingredientsError && (
          <p className="text-red-500 text-sm mt-1">Error loading ingredients</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <Badge
              key={ingredient}
              variant="secondary"
              className="mr-2 bg-afro-green/20 text-afro-green"
            >
              {ingredient}
              <button
                onClick={() =>
                  removeItem(
                    ingredient,
                    selectedIngredients,
                    setSelectedIngredients
                  )
                }
                className="ml-2 text-xs font-bold bg-transparent"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <CustomButton
        variant="secondary"
        onClick={handleApplyFilters}
        agreed={ingredientsLoading}
      >
        Apply Filters
      </CustomButton>
    </div>
  );
};

export default FilterSection;
