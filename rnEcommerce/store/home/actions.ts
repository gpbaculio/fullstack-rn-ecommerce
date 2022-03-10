import {SET_FETCH_KEY} from './constants';
import {SetFetchKeyType} from './types';

export const setFetchKey = (fetchKey: number): SetFetchKeyType => ({
  type: SET_FETCH_KEY,
  payload: {
    fetchKey,
  },
});
