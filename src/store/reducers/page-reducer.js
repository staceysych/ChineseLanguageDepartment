import {
  SET_LOADING,
  SET_PATH,
  SET_ALL_NEWS,
  SET_CURRENT_NEWS_PAGE,
  SET_FETCHED_DATA,
  SET_MODAL_OPEN,
  SET_TOKEN,
} from '../actions/types';

import { getInitialState, setLocalStorage } from '../../utils';

export default function (state = getInitialState(), action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_PATH:
      setLocalStorage(Object.entries(action));
      return { ...state, path: action.path };
    case SET_ALL_NEWS:
      return { ...state, allNews: action.allNews };
    case SET_CURRENT_NEWS_PAGE:
      return { ...state, currentNewsPage: action.currentNewsPage };
    case SET_FETCHED_DATA:
      return { ...state, data: action.data };
    case SET_MODAL_OPEN:
      return { ...state, isModalOpen: action.isModalOpen, index: action.index };
    case SET_TOKEN:
      setLocalStorage(Object.entries(action));
      return { ...state, userData: action.userData};
    default:
      return state;
  }
}
