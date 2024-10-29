import React, { useEffect, useRef, useState } from "react";
import citrus from "../../assets/images/citrus.png";
import { useParams, useNavigate } from "react-router-dom";
import NutritionCircle from "../common/NutritionCircle";
import BackButton from "../common/BackButton";
import MealType from "../common/MealType";
import PlanCard from "../common/PlanCard";
import AddNew from "../common/AddNew";
import { useDispatch, useSelector } from "react-redux";
import {
  get_meal_plan,
  save_meal_plan,
  delete_meal_plan,
  customize_meal_plan
} from "../../redux/slices/mealplansSlice";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import {
  getLabelByValue,
  getGoalLabelByValue,
  calculateTotalNutrients,
  organizeMealsByType,
} from "../../utils/helper";
import CustomButton from "../common/CustomButton";
import { Spinner, Modal, ModalHeader, ModalBody } from "flowbite-react";
import AddRecipeModal from "../modal/AddRecipeModal";

const MealPlanSingle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedmeal_plan, loading, error } = useSelector(
    (state) => state.mealplans
  );
  // const {recipesList}=useSelector((state)=>state.recipes);

  // State for modals
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const idRef = useRef(id); // Store the ID in a ref
  const isFetchingRef = useRef(false); // Ref to track fetching status
  const fetchrecipesRef=useRef(false);

  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [mealType, setMealType] = useState("");

  useEffect(() => {
    // Update the ref whenever id changes
    idRef.current = id;
  }, [id]);

  // useEffect(()=>{
  //   // fetchrecipesref
  //   if(!fetchrecipesRef.current){
  //     dispatch(fetchRecipes());
  //     fetchrecipesRef.current=true;
  //   }
  //   },[dispatch]);
    

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (idRef.current && !isFetchingRef.current) { // Check if fetching is already in progress
        isFetchingRef.current = true; // Set fetching to true

        try {
          await dispatch(get_meal_plan(idRef.current)).unwrap();
        } catch (err) {
          console.error("Failed to fetch meal plan:", err);
        } finally {
          isFetchingRef.current = false; // Reset fetching status
        }
      }
    };

    fetchMealPlan();
  }, [dispatch]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setShowSaveDialog(true);
      await dispatch(save_meal_plan(id)).unwrap();
      setSaving(false);
      setShowSaveDialog(false);
      // Optionally refresh the meal plan
      await dispatch(get_meal_plan(id)).unwrap();
    } catch (err) {
      console.error("Failed to save meal plan:", err);
      setSaving(false);
      setShowSaveDialog(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await dispatch(delete_meal_plan(id)).unwrap();

      setDeleting(false);
      setShowDeleteDialog(false);

      // Navigate back to meal plans list
      navigate("/mealplan");
    } catch (err) {
      console.error("Failed to delete meal plan:", err);
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleAddNew = (type) => {
    setMealType(type);
    setShowAddRecipeModal(true);
  };


  const handleAddRecipes = async (meals_structure) => {
    console.log(meals_structure)
    try {
      await dispatch(customize_meal_plan({ id, data: {meals_structure: meals_structure } })).unwrap();
      // // Show success message (e.g., Toast or Alert)
      // // Optionally refresh the meal plan after adding
      await dispatch(get_meal_plan(id)).unwrap();
    } catch (err) {
      console.error("Failed to add recipes:", err);
      // Handle error (e.g., show an error message)
    }
  };
  

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  // Handle case where meal plan hasn't been loaded yet
  if (!selectedmeal_plan) {
    return null;
  }

  //   if loading  show the spinner
  // else if error show the error message
  const totals = calculateTotalNutrients(
    selectedmeal_plan?.nutritional_composition
  );
  const meals_structure = organizeMealsByType(
    selectedmeal_plan?.meals_structure,
    selectedmeal_plan?.meals
  );

  // console.log(meals_structure)

  return (
    <div className="space-y-2 flex-grow pb-8">
      <div className="bg-[url('assets/images/citrus.png')] bg-cover bg-center h-96 flex flex-col items-start justify-end bg-opacity-45 p-4 bg-afro-gray-dark space-y-2">
        <h1 className="font-bold text-3xl md:text-5xl text-white">
          {selectedmeal_plan?.name}
        </h1>
        <div className="flex space-x-4 w-1/12">
          {/* save */}
          {
            selectedmeal_plan?.status=="DR"?
            <a
            className="rounded-full bg-white p-2"
            onClick={handleSave}
            disabled={saving}
          >
            <svg
              class="w-6 h-6 text-afro-brown dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
              />
            </svg>
          </a>: <a className="rounded-full bg-white p-2"><svg class="w-6 h-6 text-afro-brown dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
</svg></a>

          }
          
          {/* delete */}

          <a
            className="rounded-full bg-white p-2"
            onClick={() => setShowDeleteDialog(true)}
            disabled={deleting}
          >
            <svg
              class="w-6 h-6 text-afro-brown dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-4">
        <BackButton />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:space-x-8 mb-4 flex-grow mx-4 mt-4">
        <div className="md:w-3/5 space-y-1">
          <div className="p-4 bg-afro-brown/20 rounded text-afro-gray-mid ">
            <p>Summary</p>
            <p className="text-justify p-2 italic font-light">
              {selectedmeal_plan?.description}
            </p>

            <p>
              Tags:
              {selectedmeal_plan?.tags.health_goals
                ?.map((val) => getGoalLabelByValue(val))
                .join(",")}
              ,
              {selectedmeal_plan?.tags.dietary_preferences
                ?.map((val) => getLabelByValue(val))
                .join(",")}
            </p>
          </div>
        </div>
        <div className="md:w-2/5 mt-8 md:mt-0">
          <div>
            <h2 className="text-lg font-bold text-afro-brown ">
              Nutritional Summary
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-2 mt-4">
              <NutritionCircle title="Kcal" borderColor="afro-purple">
                {totals.calories}
              </NutritionCircle>
              <NutritionCircle title="Fat" borderColor="afro-purple-mid">
                {totals.fat}g
              </NutritionCircle>
              <NutritionCircle title="Carbs" borderColor="afro-orange">
                {totals.carbs}g
              </NutritionCircle>
              <NutritionCircle title="Protein" borderColor="afro-mint">
                {totals.protein}g
              </NutritionCircle>
              <NutritionCircle title="Fiber" borderColor="afro-teal">
                {totals.fiber != null ? totals.fiber : 0}g
              </NutritionCircle>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-4 pt-4 mt-4">
        <h2 className="font-bold text-2xl">Meals</h2>
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex  space-x-2 ">
            <MealType color="breakfast">Breakfast</MealType>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 space-y-10 md:space-y-0 ">
              {meals_structure.breakfast.map((meal, index) => (
                <PlanCard
                  description={meal.recipe_info}
                  calories={meal.nutrition.calories}
                  id={meal.recipe_id}
                >
                  {meal.name}
                </PlanCard>
              ))}
              <AddNew onAdd={() => handleAddNew("breakfast")} />
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap pt-8">
            <MealType color="lunch">Lunch</MealType>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 space-y-10 md:space-y-0 ">
              {meals_structure.lunch.map((meal, index) => (
                <PlanCard
                  description={meal.recipe_info}
                  calories={meal.nutrition.calories}
                  id={meal.recipe_id}
                >
                  {meal.name}
                </PlanCard>
              ))}

              <AddNew onAdd={() => handleAddNew("lunch")}/>
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap pt-8">
            <MealType color="dinner">Dinner</MealType>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 space-y-10 md:space-y-0 ">
              {meals_structure.dinner.map((meal, index) => (
                <PlanCard
                  description={meal.recipe_info}
                  calories={meal.nutrition.calories}
                  id={meal.recipe_id}
                >
                  {meal.name}
                </PlanCard>
              ))}

              <AddNew onAdd={() => handleAddNew("dinner")} />
            </div>
          </div>
          <div className="flex space-x-2 flex-wrap pt-8">
            <MealType color="snack">Snack</MealType>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 space-y-10 md:space-y-0 ">
              {meals_structure.snack.map((meal, index) => (
                <PlanCard
                  description={meal.recipe_info}
                  calories={meal.nutrition.calories}
                  id={meal.recipe_id}
                >
                  {meal.name}
                </PlanCard>
              ))}

              <AddNew onAdd={() => handleAddNew("snack")}/>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showSaveDialog} onClose={setShowSaveDialog}>
        <ModalHeader>
          <h2 className="text-lg font-bold">Saving Meal Plean</h2>
        </ModalHeader>
        <ModalBody>
          <Spinner size="xl" color="purple" />
          <p className="text-lg">Please wait while we save your meal plan...</p>
        </ModalBody>
      </Modal>

      <Modal show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <ModalHeader>
          <h2 className="text-lg font-bold">Delete Meal Plan</h2>
        </ModalHeader>
        <ModalBody>
          <p className="text-lg">
            Are you sure you want to delete this meal plan?
          </p>
          <div className="flex space-x-2 pt-4">
            <CustomButton onClick={handleDelete} variant="orangeoutline">
              {deleting ? (
                <div className="flex items-center space-x-2">
                  <Spinner />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete"
              )}{" "}
            </CustomButton>
            <CustomButton
              onClick={() => setShowDeleteDialog(false)}
              variant="secondary"
            >
              Cancel
            </CustomButton>
          </div>
        </ModalBody>
      </Modal>

      <AddRecipeModal
        showModal={showAddRecipeModal}
        onClose={() => setShowAddRecipeModal(false)}
        mealType={mealType}
        onAdd={handleAddRecipes}
        tags={selectedmeal_plan?.tags}
        meals={selectedmeal_plan.meals_structure}
      />
    </div>
  );
};
export default MealPlanSingle; //export default keyword is used to export the component
