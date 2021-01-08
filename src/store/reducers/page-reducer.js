import { SET_LOADING } from '../actions/types';

const initialState = {
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
