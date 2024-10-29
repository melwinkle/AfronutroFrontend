import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/navigation/Layout';
import Home from './components/home/Home';
import FAQS from './components/utilities/FAQs';
import EducationalContent from './components/blog/EducationalContent';
import EducationalContentSingle from './components/blog/EducationalContentSingle';
import Recipes from './components/nutrition/Recipes';
import RecipesSingle from './components/nutrition/RecipesSingle';
import Error404 from "./components/utilities/Error404";
import PrivacyPolicy from "./components/utilities/PrivacyPolicy";
import TermsConditions from "./components/utilities/TermsConditions";
import DietaryAssessment from "./components/assessment/DietaryAssessment";
import MealPlans from './components/user/MealPlans';
import Favorites from './components/user/Favorites';
import DietaryAssessments from './components/user/DietaryAssessments';
import Profile from './components/user/Profile';
import DashboardLayout from './components/navigation/DashboardLayout';
import MealPlanSingle from './components/user/MealPlanSingle';
import EmailVerification from './components/auth/EmailVerification';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifiedEmail from './components/auth/VerifiedEmail';
import SearchResultsPage from './components/utilities/SearchResults';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="w-screen">
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/faqs" element={<FAQS/>}/>
          <Route path="/blog" element={<EducationalContent/>}/>
          <Route path="/blog/:id" element={<EducationalContentSingle/>}/>
          <Route path="/recipes" element={<Recipes/>}/>
          <Route path="/recipes/:id" element={<RecipesSingle/>}/>
          <Route path="/mealgenerator" element={<DietaryAssessment/>}/>
          <Route path="/mealplan" element={<DashboardLayout><MealPlans/></DashboardLayout>}/>
          <Route path="/mealplan/:id" element={<MealPlanSingle/>}/>
          <Route path="/favorites" element={<DashboardLayout><Favorites/></DashboardLayout>}/>
          <Route path="/assessment" element={<DashboardLayout><DietaryAssessments/></DashboardLayout>}/>
          <Route path="/profile" element={<DashboardLayout><Profile/></DashboardLayout>}/>
          <Route path="/verificationemail" element={<EmailVerification/>}/>
          <Route path="/verify-email/:uid/:token" element={<VerifiedEmail/>}/>
          <Route path="/forgot-password/:uid/:token" element={<ForgotPassword/>}/>
          <Route path="/search" element={<SearchResultsPage/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </Layout>
      </div>
    </Router>
    </Provider>
  );
}

export default App;