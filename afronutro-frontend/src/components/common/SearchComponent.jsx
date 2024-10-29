import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchRecipes } from '../../redux/slices/recipeSlice';
import CustomButton from './CustomButton';


const SearchComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { searchResults, loading } = useSelector((state) => state.recipes);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(true);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout for debouncing
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchRecipes(query));
      }
    }, 300);

    setSearchTimeout(timeoutId);
  };

  const handleResultClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-afro-brown rounded-full p-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-afro-brown w-full"
            placeholder="Search recipes..."
          />
      
          <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
</svg>

          {searchQuery && (
            <a
              onClick={clearSearch}
              className="absolute right-3 top-2.5 bg-transparent"
            >
             
              <svg class="w-6 h-6 text-gray-400 hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

            </a>
          )}
        </div>
      </form>

      {/* Results Dropdown */}
      {showResults && searchQuery && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <div className="p-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">
                  {searchResults.length} results found
                </span>
              </div>
              {searchResults.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  onClick={() => handleResultClick(recipe.recipe_id)}
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                >
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                    <p className="text-sm text-gray-500">
                      {recipe.nutrition.calories} calories • {recipe.duration} mins
                    </p>
                  </div>
                </div>
              ))}
              <div className="p-3 border-t border-gray-100 hover:bg-gray-50">
                
                <CustomButton onClick={() => {
                    navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
                    setShowResults(false);
                  }} variant="cta">View all results</CustomButton>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;