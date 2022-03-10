import {createStore, combineReducers} from 'redux';

import * as home from './home';

const reducer = combineReducers({
  home: home.reducer,
});

export type AppReducerType = ReturnType<typeof reducer>;

export const initializeStore = () => createStore(reducer);
