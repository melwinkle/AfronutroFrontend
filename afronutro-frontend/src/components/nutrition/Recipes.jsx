import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  fetchRecipeRating,
  searchRecipes,
  fetchAllRatings
} from "../../redux/slices/recipeSlice.js";
import { calculateAverageRating, formatRating } from "../../utils/helper.js";
import FilterSection from "../common/FilterSection.jsx";
import TabSortSection from "../common/TabSortSection.jsx";
import RecipeCard from "../common/RecipeCard.jsx";
import PaginatedComponent from "../navigation/Pagination.jsx";
import Empty from "../common/Empty.jsx";
import Spinner from "../common/Spinner.jsx";
import { useSearchParams } from "react-router-dom";


const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipesList, filteredRecipes, loading, error, ratings,searchResults,reciperatings } = useSelector(
    (state) => state.recipes
  );

  const [activeFilter, setActiveFilter] = useState("last_added");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false); // Track if filters are applied
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchrecipesRef=useRef(false);


  useEffect(() => {
    // Only fetch initial recipes if no filters are applied
    if (!isFiltered&& !searchQuery&&!fetchrecipesRef.current) {
      dispatch(fetchRecipes());
      fetchrecipesRef.current=true;
    }
  }, [dispatch, isFiltered,searchQuery]);

  // Fetch ratings for all recipes when the list changes
 // Fetch ratings for relevant recipes
 useEffect(() => {
  const recipesToFetchRatings = searchQuery 
    ? searchResults 
    : isFiltered 
      ? filteredRecipes 
      : recipesList;

  // Gather all recipe IDs to fetch ratings in one call
  const recipeIds = recipesToFetchRatings.map(recipe => recipe.recipe_id);

  if (recipeIds.length > 0) {
    // Dispatch the action to fetch ratings for all recipe IDs in one request
    dispatch(fetchAllRatings(recipeIds));
  }
}, [dispatch, isFiltered, recipesList, filteredRecipes, searchResults, searchQuery]);



   // Handle search with debouncing
   const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set a new timeout
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchRecipes(query));
        setIsFiltered(true);
      } else {
        dispatch(fetchRecipes());
        setIsFiltered(false);
      }
      setCurrentPage(1);
    }, SEARCH_DEBOUNCE_MS);

    setSearchTimeout(timeoutId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filters = [
    { label: "Last Added", value: "last_added" },
    { label: "Recommended", value: "recommended" },
    { label: "Calories(Low to High)", value: "calories_low" },
    { label: "Calories(High to Low)", value: "calories_high" },
  ];

 // Determine which recipes to use based on search and filter state
 const recipesToUse = useMemo(() => {
  if (searchQuery) {
    return searchResults;
  }
  return isFiltered ? filteredRecipes : recipesList;
}, [searchQuery, searchResults, isFiltered, filteredRecipes, recipesList]);

  const filteredByTab = useMemo(() => {
    const tabMealTypes = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];
    return recipesToUse.filter(
      (recipe) =>
        activeTab === 0 ||
        recipe.meal_type.includes(tabMealTypes[activeTab].toLowerCase())
    );
  }, [recipesToUse, activeTab]);

  const sortedRecipes = useMemo(() => {
    let sorted = [...filteredByTab];
    switch (activeFilter) {
      case "last_added":
        return sorted.reverse();
      case "recommended":
        // Sort by average rating
        return sorted.sort((a, b) => {
          const aRating = reciperatings[a.recipe_id]
            ? calculateAverageRating(reciperatings[a.recipe_id].ratings).averageRating
            : 0;
          const bRating = reciperatings[b.recipe_id]
            ? calculateAverageRating(reciperatings[b.recipe_id].ratings).averageRating
            : 0;
          return bRating - aRating;
        });
      case "calories_low":
        return sorted.sort(
          (a, b) => a.nutrition.calories - b.nutrition.calories
        );
      case "calories_high":
        return sorted.sort(
          (a, b) => b.nutrition.calories - a.nutrition.calories
        );
      default:
        return sorted;
    }
  }, [filteredByTab, activeFilter, ratings]);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedRecipes, currentPage]);

  // Handler for when filters are applied
  const handleFiltersApplied = (isFiltering) => {
    setIsFiltered(isFiltering);
    setCurrentPage(1); // Reset to first page when filters change
    setSearchQuery('');
  };

  // Render recipes, spinner, or error
  const renderRecipes = () => {
    if (loading) {
      return <Spinner />; // Render a spinner during loading
    }

    if (error) {
      return <Empty  />; // Display an error message
    }

    if (searchQuery && searchResults.length === 0) {
      return <Empty  />;
    }


    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedRecipes.length > 0 ? (
          paginatedRecipes.map((recipe) => {
            const recipeRatings = ratings[recipe.recipe_id]?.ratings || [];
            const { averageRating, totalRatings } =
              calculateAverageRating(recipeRatings);

            return (
              <RecipeCard
                key={recipe.recipe_id}
                title={recipe.name}
                img={recipe.image}
                id={recipe.recipe_id}
                calories={recipe.nutrition.calories}
                time={25}
                rating={averageRating}
                totalRatings={totalRatings}
              >
                {recipe.recipe_info}
              </RecipeCard>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 w-full border">
                <Empty />
            </div>
      
        )}
      </div>
    );
  };

  const tabs = [
    { label: "All", content: renderRecipes },
    { label: "Breakfast", content: renderRecipes },
    { label: "Lunch", content: renderRecipes },
    { label: "Dinner", content: renderRecipes },
    { label: "Snack", content: renderRecipes },
  ];

  return (
    <div className="w-full p-4 mb-4">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-afro-green text-white py-2 px-4 rounded"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div
          className={`md:w-1/5 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <FilterSection
            onFiltersApplied={handleFiltersApplied}
            onClearFilters={() => {
              handleFiltersApplied(false);
              setSearchQuery('');
              dispatch(fetchRecipes());
            }}
          />
        </div>

        <div className="flex-grow">
          <TabSortSection
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={(index) => {
              setActiveTab(index);
              setCurrentPage(1);
            }}
            filters={filters}
            activeFilter={activeFilter}
            setActiveFilter={(filter) => {
              setActiveFilter(filter);
              setCurrentPage(1);
            }}
            onSearch={handleSearch}
            searchQuery={searchQuery}
          />

          <div className="mt-3">
            <h4 className="font-light mb-4 text-lg text-afro-gray-mid">
              Showing results{" "}
              <span className="font-bold text-afro-dark">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>
              -
              <span className="font-bold text-afro-dark">
                {Math.min(currentPage * ITEMS_PER_PAGE, sortedRecipes.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-afro-dark">
                {sortedRecipes.length}
              </span>{" "}
              results
            </h4>
          </div>

          <div className="mt-4">{tabs[activeTab].content()}</div>

          <PaginatedComponent
            totalPages={Math.ceil(sortedRecipes.length / ITEMS_PER_PAGE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Recipes;
