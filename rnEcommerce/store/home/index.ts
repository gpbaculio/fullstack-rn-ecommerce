import {useDispatch, useSelector} from 'react-redux';

import {AppReducerType} from '../index';

export {default as reducer} from './reducer';

import * as actions from './actions';

export const useHome = () => {
  const dispatch = useDispatch();
  const state = useSelector(({home}: AppReducerType) => home);
  return {
    state,
    actions,
    dispatch,
  };
};
