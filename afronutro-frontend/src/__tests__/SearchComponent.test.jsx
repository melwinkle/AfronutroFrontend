import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SearchComponent from '../components/common/SearchComponent';
import { searchRecipes } from '../redux/slices/recipeSlice';
// At the top of your test file
import '@testing-library/jest-dom';

// Mock the react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the redux slice action
jest.mock('../redux/slices/recipeSlice', () => ({
  searchRecipes: jest.fn(),
}));

describe('SearchComponent', () => {
  let store;

  beforeEach(() => {
    // Create a mock store with initial state
    store = configureStore({
      reducer: {
        recipes: (state = { searchResults: [], loading: false }, action) => {
          // Minimal reducer to handle test cases
          switch (action.type) {
            case 'recipes/searchRecipes/pending':
              return { ...state, loading: true };
            case 'recipes/searchRecipes/fulfilled':
              return { ...state, searchResults: action.payload, loading: false };
            default:
              return state;
          }
        }
      }
    });

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const renderComponent = (preloadedState = {}) => {
    // If a preloaded state is provided, recreate the store with it
    if (Object.keys(preloadedState).length > 0) {
      store = configureStore({
        reducer: {
          recipes: (state = { searchResults: [], loading: false }, action) => {
            switch (action.type) {
              case 'recipes/searchRecipes/pending':
                return { ...state, loading: true };
              case 'recipes/searchRecipes/fulfilled':
                return { ...state, searchResults: action.payload, loading: false };
              default:
                return state;
          }
        }
        },
        preloadedState: { recipes: preloadedState }
      });
    }

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchComponent />
        </MemoryRouter>
      </Provider>
    );
  };

  test('renders search input', () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search recipes...');
    expect(searchInput).toBeInTheDocument();
  });

  test('triggers search on input change', async () => {
    // Mock the searchRecipes action to dispatch
    searchRecipes.mockReturnValue({ type: 'recipes/searchRecipes/pending' });

    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search recipes...');
    
    // Simulate typing
    fireEvent.change(searchInput, { target: { value: 'pasta' } });

    // Wait for the debounce to trigger
    await waitFor(() => {
      expect(searchRecipes).toHaveBeenCalledWith('pasta');
    }, { timeout: 500 });
  });

  test('displays search results when available', async () => {
    // Prepare mock search results
    const mockResults = [
      {
        recipe_id: '1',
        name: 'Pasta Carbonara',
        image: 'pasta-image.jpg',
        nutrition: { calories: 450 },
        duration: 30
      },
      {
        recipe_id: '2',
        name: 'Veggie Pasta',
        image: 'veggie-pasta.jpg',
        nutrition: { calories: 350 },
        duration: 25
      }
    ];
  
    // Mock the searchRecipes action to return mock results
    searchRecipes.mockReturnValue({
      type: 'recipes/searchRecipes/fulfilled',
      payload: mockResults
    });
  
    renderComponent({
      searchResults: mockResults,
      loading: false
    });
  
    const searchInput = screen.getByPlaceholderText('Search recipes...');
    
    // Simulate typing to trigger results
    fireEvent.change(searchInput, { target: { value: 'pasta' } });
  
    // Debug step to see the entire rendered component
    await waitFor(() => {
      screen.debug();
    }, { timeout: 2000 });
  
    // More flexible checks
    await waitFor(() => {
      // Check for results count
      const resultsCountElement = screen.getByText(/\d+ results found/i);
      expect(resultsCountElement).toBeInTheDocument();
  
      // Check for recipe names using a more flexible approach
      const recipeNameElements = screen.getAllByText((content, element) => {
        return element.textContent.toLowerCase().includes('pasta');
      });
      
      expect(recipeNameElements.length).toBeGreaterThan(0);
  
      // Additional specific checks
      expect(screen.getByText('Pasta Carbonara')).toBeInTheDocument();
      expect(screen.getByText('450 calories • 30 mins')).toBeInTheDocument();
    }, { 
      timeout: 2000 
    });
  });

  

  test('shows no results message', async () => {
    // Mock the searchRecipes action to return an empty array
    searchRecipes.mockReturnValue({ 
      type: 'recipes/searchRecipes/fulfilled', 
      payload: [] 
    });
  
    renderComponent({
      searchResults: [],
      loading: false
    });
  
    const searchInput = screen.getByPlaceholderText('Search recipes...');
    
    // Simulate typing to trigger search
    fireEvent.change(searchInput, { target: { value: 'impossible dish' } });
  
    // Wait for the no results message to appear
    await waitFor(() => {
      const noResultsElements = screen.getAllByText((content, element) => {
        return element.textContent.includes('No results found for "impossible dish"');
      });
      
      expect(noResultsElements.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  
});