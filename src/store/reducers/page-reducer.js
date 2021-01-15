import { SET_LOADING, SET_PATH } from '../actions/types';

import { getInitialState, setLocalStorage } from '../../utils';


export default function(state = getInitialState(), action) {
  switch(action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_PATH:
      setLocalStorage(Object.entries(action));
      return { ...state, path: action.path };
    default:
      return state;
  }
}
