import React,{useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../../redux/slices/recipeSlice";

const Favorites = ({ id }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.recipes);
  const fetchFavoriteRef = useRef(false);


  useEffect(() => {
    if (isAuthenticated&&!fetchFavoriteRef.current) {
      dispatch(fetchFavorites());
      fetchFavoriteRef.current = true;
    }
  }, [dispatch, isAuthenticated]);

  // Check if current recipe is in favorites
  const isFavorited = favorites.some((fav) => fav.recipe === id);

  const handleFavoriteSubmit = async () => {
    if (!isAuthenticated) {
      // You can integrate your modal component here
      alert("Please register or log in to add favorites");
      return;
    }

    if (isFavorited) {
      // Find the favorite entry to remove
      const favoriteToRemove = favorites.find((fav) => fav.recipe === id);
      if (favoriteToRemove) {
        dispatch(removeFromFavorites(id));
      }
    } else {
      dispatch(addToFavorites( id ));
    }
  };

  return (
    <div className="flex space-x-4 w-1/12">
      {/* favprite icon if the user selcts then it hsoule chaneg to the filled , i */}
      <button
        onClick={handleFavoriteSubmit}
        className="rounded-full bg-white p-2"
      >
        {isFavorited ? (
          <svg
            class="w-6 h-6 text-afro-brown dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-afro-brown dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
        )}
      </button>
      <a href="#" className="rounded-full bg-white p-2">
        <svg
          className="w-6 h-6 text-afro-brown dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z" />
        </svg>
      </a>
    </div>
  );
};
export default Favorites;
