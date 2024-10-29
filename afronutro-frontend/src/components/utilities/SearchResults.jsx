import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes, fetchRecipeRating } from '../../redux/slices/recipeSlice';
import { calculateAverageRating } from '../../utils/helper';
import RecipeCard from '../common/RecipeCard';
import Spinner from '../common/Spinner';
import Empty from '../common/Empty';
import PaginatedComponent from '../navigation/Pagination';
import BackButton from '../common/BackButton';

const ITEMS_PER_PAGE = 12;

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [currentPage, setCurrentPage] = useState(1);

  const { searchResults, loading, error, ratings } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchRecipes(searchQuery));
      setCurrentPage(1); // Reset to first page when search query changes
    }
  }, [dispatch, searchQuery]);

  // Fetch ratings for search results
  useEffect(() => {
    searchResults.forEach((recipe) => {
      dispatch(fetchRecipeRating(recipe.recipe_id));
    });
  }, [dispatch, searchResults]);

  // Calculate paginated results
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
        <BackButton/>
      </div>
    );
  }

  return (
    <div className="w-full p-4 mb-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
         
          <BackButton/>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-600 mt-2">
            Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'}
          </p>
        </div>

        {/* Results Section */}
        {searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedResults.map((recipe) => {
                const recipeRatings = ratings[recipe.recipe_id]?.ratings || [];
                const { averageRating, totalRatings } = calculateAverageRating(recipeRatings);

                return (
                  <RecipeCard
                    key={recipe.recipe_id}
                    title={recipe.name}
                    img={recipe.image}
                    id={recipe.recipe_id}
                    calories={recipe.nutrition.calories}
                    time={25} // Adjust if you have actual time data
                    rating={averageRating}
                    totalRatings={totalRatings}
                  >
                    {recipe.recipe_info}
                  </RecipeCard>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <PaginatedComponent
                totalPages={Math.ceil(searchResults.length / ITEMS_PER_PAGE)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <Empty message={`No recipes found for "${searchQuery}"`} />
            <p className="mt-4 text-gray-600">
              Try adjusting your search terms or browse our recipe categories below
            </p>
            {/* You can add suggested categories or popular recipes here */}
          </div>
        )}

        {/* Optional: Add related categories or popular recipes section when no results */}
        {searchResults.length === 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Add your category cards here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;