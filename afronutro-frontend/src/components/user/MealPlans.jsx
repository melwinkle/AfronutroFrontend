import React, { useEffect, useState, useMemo, useRef } from "react";
import MealPlanCard from "../common/MealPlanCard";
import TabPlan from "../common/TabPlan";
import { get_all_meal_plan } from "../../redux/slices/mealplansSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../common/Empty";
import Spinner from "../common/Spinner";
import PaginatedComponent from "../navigation/Pagination";
import CustomButton from "../common/CustomButton";
import { fetchDietaryAssessment } from "../../redux/slices/assessmentSlice";
import MealPlanGenerationFlow from "../modal/MealPlanGenerationFlow";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const MealPlans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meal_plans, loading, error } = useSelector(
    (state) => state.mealplans
  );
  const { assessment } = useSelector((state) => state.assessment);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  // useRef flags to track if the data fetch has already been performed
  const mealPlansFetched = useRef(false);
  const assessmentFetched = useRef(false);

  useEffect(() => {
    // Fetch dietary assessment if not already fetched
    if (!assessment && !assessmentFetched.current) {
      dispatch(fetchDietaryAssessment());
      assessmentFetched.current = true; // Mark as fetched
    }

    // Fetch meal plans if not already fetched
    if (!meal_plans.length && !mealPlansFetched.current) {
      dispatch(get_all_meal_plan());
      mealPlansFetched.current = true; // Mark as fetched
    }
  }, [dispatch, assessment, meal_plans]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const mealplans = useMemo(() => meal_plans || [], [meal_plans]);

  const filteredByTab = useMemo(() => {
    const tabPlanState = ["SV", "DR"]; // Status codes corresponding to "Saved" and "Draft"
    return mealplans.filter(
      (plan) => activeTab === 0 || plan.status === tabPlanState[activeTab - 1]
    );
  }, [mealplans, activeTab]);

  const paginatedPlans = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredByTab.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredByTab, currentPage]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3].map((placeholder) => (
            <div key={placeholder} className="border rounded-lg p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <Empty />;
    }

    if (!paginatedPlans.length) {
      return (
        <div className="col-span-full w-full">
          <Empty />
        </div>
      );
    }

    if (!assessment) {
      return (
        <div className="col-span-full w-full">
          <p>You do not have a dietary assessment. Please generate one</p>
          <CustomButton
            onClick={() => navigate("/assessment")}
            variant="orangeoutline"
          >
            Generate Assessment
          </CustomButton>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedPlans.map((plan) => (
          <MealPlanCard key={plan.meal_plan_id} id={plan.meal_plan_id}>
            {plan.name}
          </MealPlanCard>
        ))}
      </div>
    );
  };

  const tabContent = [
    {
      label: "All",
      content: renderContent,
    },
    {
      label: "Saved",
      content: renderContent,
    },
    {
      label: "Draft",
      content: renderContent,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-2 md:hidden ">
        <h1 className="text-3xl font-bold mb-4">Meal Plans</h1>
      </div>
      <MealPlanGenerationFlow />
      <div className="p-4 w-full">
        <TabPlan
          tabs={tabContent}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {paginatedPlans.length > 0 && (
          <PaginatedComponent
            totalPages={Math.ceil(filteredByTab.length / ITEMS_PER_PAGE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default MealPlans;
