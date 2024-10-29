import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipeRating, fetchRecipeRating } from "../../redux/slices/recipeSlice";

const ReviewSection = ({ recipeId }) => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.recipes.ratings[recipeId] || []);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const sortedRatings = [...ratings].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
const topRatings = sortedRatings.slice(0, 4);


  // Check if the user has already reviewed the recipe
  const userReview = ratings.find((review) => review.user === user.id);

  const handleRatingSubmit = async () => {
    if (!isAuthenticated) {
      // Handle unauthenticated user
      return;
    }

    dispatch(
      postRecipeRating({
        id: recipeId,
        data: {
          rating: userRating,
          comment: comment,
        },
      })
    );

    // Reset form
    setUserRating(0);
    setComment("");

    // Refresh ratings
    dispatch(fetchRecipeRating(recipeId));
  };

  useEffect(() => {
    if (userReview) {
      setUserRating(userReview.rating);
      setComment(userReview.comment);
    } else {
      setUserRating(0);
      setComment("");
    }
  }, [userReview]);

  return (
    <div className="flex flex-col space-y-2">
      {!userReview && isAuthenticated && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="font-bold mb-2">Add Your Review</h3>
          <div className="flex mb-2">
            {/* Render all stars in one row for user rating */}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setUserRating(star)} // Set user rating on click
                className="focus:outline-none bg-transparent"
              >
                <svg
                  className={`w-6 h-6 ${
                    star <= userRating ? "text-afro-green" : "text-afro-gray-mid"
                  } dark:text-white`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= userRating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth={star <= userRating ? "0" : "1"}
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Share your thoughts..."
          />
          <button
            onClick={handleRatingSubmit}
            className="bg-afro-green text-white px-4 py-2 rounded"
            disabled={userRating === 0} // Disable button if no rating
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Display existing reviews */}
      <h1 className="text-xl font-bold">Reviews</h1>
      <div className="mt-12 md:space-y-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {topRatings.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${
                    star <= review.rating ? "text-afro-green" : "text-afro-gray-mid"
                  } dark:text-white`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= review.rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth={star <= review.rating ? "0" : "1"}
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-afro-gray-dark">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
