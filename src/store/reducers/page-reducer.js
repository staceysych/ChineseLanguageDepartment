import { SET_LOADING, SET_PATH } from '../actions/types';

const initialState = {
  path: 'exam'
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_PATH:
      return { ...state, path: action.payload };
    default:
      return state;
  }
}
