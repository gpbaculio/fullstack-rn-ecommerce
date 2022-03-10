import {SET_FETCH_KEY} from './constants';

export type HomeStateType = {
  fetchKey: number;
};

export type SetFetchKeyType = {
  type: typeof SET_FETCH_KEY;
  payload: {
    fetchKey: number;
  };
};

export type HomeActionTypes = SetFetchKeyType;
