import {
    CLEAR_CART,
    SEARCH_PETS,
  } from './actions';
  
  // The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
  export const reducer = (state, action) => {
    switch (action.type) {
        // Update pets state to include all pets from api
      case SEARCH_PETS:
        return {
          ...state,
          pets: [...state.pets, ...action.payload],
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: [],
        };
  
      // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
      // This saves us from a crash.
      default:
        return state;
    }
  };
  