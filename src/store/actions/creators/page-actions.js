import { SET_LOADING, SET_PATH } from '../types';

const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });

const setPath = (path) => ({ type: SET_PATH, path });
export default {
  setLoading,
  setPath,
};
