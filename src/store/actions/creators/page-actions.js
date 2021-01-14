import { SET_LOADING, SET_PATH } from '../types';

const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  }
}

const setPath = (path) => {
  return {
    type: SET_PATH,
    payload: path,
  }
}

export default {
  setLoading,
  setPath,
}
