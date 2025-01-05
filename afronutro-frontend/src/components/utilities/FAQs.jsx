import React from "react";
import FAQAccordion from "../common/FAQAccordion";

const FAQS = () => {
    return (
        <div className="mx-4 mt-8 space-y-4">
            <h1 className="font-bold text-5xl">FAQ</h1>
            <div className="flex flex-col space-y-2 pb-2">
                <FAQAccordion header="What is Afronutro?">
                    Afronutro is a platform designed to help users create and manage meal plans, browse recipes, and view nutritional information.
                </FAQAccordion>
                <FAQAccordion header="How do I create a meal plan?">
                    To create a meal plan, navigate to the Meal Plans section, click on 'Create New Plan', and follow the prompts to add meals for breakfast, lunch, dinner, and snacks.
                </FAQAccordion>
                <FAQAccordion header="Can I search for specific recipes?">
                    Yes, you can search for recipes using the search bar in the Recipes section. You can filter results by dietary preferences such as vegetarian, vegan, gluten-free, and more.
                </FAQAccordion>
                <FAQAccordion header="How do I view nutritional information for a recipe?">
                    Click on any recipe to view its detailed nutritional information, including calories, fat, protein, and carbs.
                </FAQAccordion>
                <FAQAccordion header="How do I generate a dietary assessment?">
                    Go to the Dietary Assessment section, and click on 'Generate Assessment'. The system will analyze your meal plans and provide information on food groups, allergens, and nutrient deficiencies.
                </FAQAccordion>
                <FAQAccordion header="How do I edit my profile information?">
                    Navigate to the User Profile section, where you can update your name, email, and password.
                </FAQAccordion>
            </div>
        </div>
    );
};

export default FAQS;