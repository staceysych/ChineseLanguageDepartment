import { SET_LOADING, SET_PATH, SET_ALL_NEWS, SET_CURRENT_NEWS_PAGE } from '../actions/types';

import { getInitialState, setLocalStorage } from '../../utils';


export default function(state = getInitialState(), action) {
  switch(action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_PATH:
      setLocalStorage(Object.entries(action));
      return { ...state, path: action.path };
    case SET_ALL_NEWS:
      return { ...state, allNews: action.allNews };
    case SET_CURRENT_NEWS_PAGE:
      return { ...state, currentNewsPage: action.currentNewsPage };
    default:
      return state;
  }
}
