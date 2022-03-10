import {HomeActionTypes, HomeStateType, SetFetchKeyType} from './types';
import {SET_FETCH_KEY} from './constants';

const initialState: HomeStateType = {
  fetchKey: 0,
};

const reducer = (
  state = initialState,
  action: HomeActionTypes,
): HomeStateType => {
  switch (action.type) {
    case SET_FETCH_KEY:
      return {
        ...state,
        fetchKey: action.payload.fetchKey,
      };
    default:
      return state;
  }
};

export default reducer;
