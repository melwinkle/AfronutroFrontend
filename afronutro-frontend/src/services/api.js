// api/auth.js
import api from './axiosConfig';

export const register = (userData) => {
  return api.post('register/', JSON.stringify(userData));
};

export const login = (email, password) => {
  return api.post('login/', JSON.stringify({ email, password }));
};

export const logout = () => {
  return api.post('logout/', JSON.stringify({}));
};

// request change
export const password_reset = (email) => {
  return api.post('password-reset/', JSON.stringify({email}));
};

// reset confirmation get
export const reset_confirmation = (uid,token) => {
  return api.get(`forgot-password/${uid}/${token}/`);
  };

// forgot password post
export const password_confirmation = (uid,token,newpassword) => {
  return api.post(`forgot-password/${uid}/${token}/`, JSON.stringify({
    uid:uid,
    token:token,
    new_password:newpassword
  }));
 
  };

// change password 30 days 
export const change_password = (current_password,new_password) => {
  return api.post('change-password/', JSON.stringify({current_password,new_password}));
  };




// resend verification email
export const resend_verification = (email) => {
  return api.post('resend-verification-email/', JSON.stringify({ email }));
  };


// verifiy email 
export const verify_email = (uid,token) => {
  return api.get(`verify-email/${uid}/${token}/`);
  };


// get prpfile
export const get_profile = () => {
  return api.get('profile/');
}
// update profile
export const update_profile = (username,gender,height,weight) => {
  return api.put('profile/', JSON.stringify({username,gender,height,weight}));
  }

  export const updateactive = (userData) => {
    return api.put('profile/', JSON.stringify(userData));
  };



// get educational-content/
export const get_educational_content = () => {
  return api.get('educational-content/');
  }

// get specific educational-content/id/
export const get_educational_content_id = (id) => {
  return api.get(`educational-content/${id}/`);
  }

// get educational-content-filter/?type=text
export const get_educational_content_filter = (type) => {
  return api.get(`educational-content-filter/?type=${type}`);
  }


// get recipes/
export const get_recipes = () => {
  return api.get('recipes/recipes/');
  }

  // get specific recipe/id/
  export const get_recipe_id = (id) => {
    return api.get(`recipes/recipes/${id}/`);
    }

// filter recipes-filter/ multiple params
export const get_recipes_filter = (params) => {
  return api.get(`recipes/recipes-filter/?${params}`);
  }

  // recipes-search/?query=Stew
  export const get_recipes_search = (query) => {
    return api.get(`recipes/recipes-search/?query=${query}`);
    }
  
  // recipes-filter/?meal_type=lunch
  export const get_recipes_filter_meal_type = (meal_type) => {
    return api.get(`recipes/recipes-filter/?meal_type=${meal_type}`);
    }
  

  // get /nutrition/V0Ivzw6Y/
  export const get_recipe_nutrition = (id) => {
    return api.get(`recipes/nutrition/${id}/`);
  }


  // get ingredients/
  export const get_ingredients = () => {
    return api.get('recipes/ingredients/');
    }

// post rating/recipe id/ with data rating and comment 
export const post_rating = (id, data) => {
  return api.post(`recipes/rating/${id}/`, data);
}

// get rating/recipe id
export const get_rating = (id) => {
  return api.get(`recipes/rating/${id}/`);
  }


  // get all ratings ratings/
  export const get_ratings = (recipeIds) => {
    return axios.get('recipes/ratings/', {
      params: {
        recipe_ids: recipeIds, // Just pass the array without [] in the key
      },
    });
    }

// add favorites/recipei id
export const add_favorite = (id) => {
  return api.post(`recipes/favorites/${id}/`);
}

// remove favorites/recipei id
export const remove_favorite = (id) => {
  return api.delete(`recipes/favorites/${id}/`);
  }

  // get favorites/
  export const get_favorites = () => {
    return api.get('recipes/favorites/');
    }
  

  // post dietary-assessment/
  export const post_dietary_assessment = (data) => {
    return api.post('dietary-assessment/', data);
    }

  // get dietary assessment
  export const get_dietary_assessment = () => {
    return api.get('dietary-assessment-view/');
  }

  // delete
  export const delete_dietary_assessment = () => {
    return api.delete('dietary-assessment/');
    }

    // update dietary assessment
    export const update_dietary_assessment = (data) => {
      return api.put('dietary-assessment/', data);
      }

  // recaluclte dietary-assessment-recalculate
  export const recalculate_dietary_assessment = () => {
    return api.post('dietary-assessment-recalculate/');
    }

  // MEAL PLANS

// generate meal plans meals/meal-plans/generate/
export const generate_meal_plans = () => {
  return api.post('meals/meal-plans/generate/');
  }

  // get specific meal plans meals/meal-plans/RyDeLmT7/
  export const get_meal_plans = (id) => {
    return api.get(`meals/meal-plans/${id}/`);
    }
  
  // get all meal plans meals/meal-plans/
  export const get_all_meal_plans = () => {
    return api.get('meals/meal-plans/');
    }
  
    // save meal plans meals/meal-plans/JXXn0Pis/save/
    export const save_meal_plans = (id) => {
      return api.post(`meals/meal-plans/${id}/save/`);
      }
// get nutritional summary meals/meal-plans/JXXn0Pis/nutritional-summary/
export const get_nutrition_summary =(id)=>{
  return api.get(`meals/meal-plans/${id}/nutritional-summary/`);
}


// delete meal-plans/QAmJtvxy/
export const delete_meal_plans = (id) => {
  return api.delete(`meals/meal-plans/${id}/`);
}


// customize meal-plans/M1vyEsRI/customize/
export const customize_meal_plans = (id,data) => {
  return api.put(`meals/meal-plans/${id}/customize/`,JSON.stringify(data));
  }


  // get activity level, health goal, dietary preference, tag type, dish type, cusine type, meal type

  export const get_tags_type = () => {
    return api.get('recipes/tags/');
  }
  
  export const get_activity_level = () => {
    return api.get('activity-level/');
  }
  
  export const get_health_goal = () => {
    return api.get('health-goal/');
  }
  
  export const get_dietary_preference = () => {
    return api.get('dietary-preference/');
  }
  
  export const get_meal_type = () => {
    return api.get('recipes/meal-type/');
  }
  
  export const get_dish_type = () => {
    return api.get('recipes/dish-type/');
  }
  
  export const get_cuisine_type = () => {
    return api.get('recipes/cuisine-type/');
  }
  
  