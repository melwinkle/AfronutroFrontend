import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate_meal_plan } from "../../redux/slices/mealplansSlice";

const LoaderPlan = ({ nextStep, prevStep, onMealPlanGenerated }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.mealplans);
  const [progress, setProgress] = useState(0);
  const hasGeneratedRef = useRef(false);

  // Single useEffect for meal plan generation with ref check
  useEffect(() => {
    // Only generate if we haven't already
    if (hasGeneratedRef.current) return;
    
    let isMounted = true;
    hasGeneratedRef.current = true;

    const generatePlan = async () => {
      try {
        console.log('Generating meal plan...'); // Debug log
        const result = await dispatch(generate_meal_plan()).unwrap();
        if (isMounted) {
          console.log('Meal plan generated successfully'); // Debug log
          onMealPlanGenerated(result);
        }
      } catch (err) {
        console.error('Failed to generate meal plan:', err);
        if (isMounted) {
          hasGeneratedRef.current = false; // Reset on error to allow retry
        }
      }
    };

    generatePlan();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array since we're using ref

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Handle navigation based on progress and status
  useEffect(() => {
    if (progress === 100) {
      if (!isAuthenticated || status === 'succeeded') {
        nextStep();
      } else if (status === 'failed') {
        prevStep();
      }
    }
  }, [progress, status, nextStep, prevStep, isAuthenticated]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h2 className="text-2xl font-bold mb-2">Generating your meal plan...</h2>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#bc4f07"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.05s" }}
        />
      </svg>
      <div className="absolute text-xl font-medium text-afro-brown">{progress}%</div>
      <p className="mt-4">Please wait while we process your information...</p>
      {error && status === 'failed' && progress === 100 && (
        <p className="text-red-500">
          An error occurred. Returning to assessment page...
        </p>
      )}
    </div>
  );
};

export default LoaderPlan;