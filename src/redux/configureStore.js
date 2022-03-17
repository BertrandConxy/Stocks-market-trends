import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import stocksDataReducer from './stocks/stock';

const reducer = combineReducers({ stocksDataReducer });
const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
