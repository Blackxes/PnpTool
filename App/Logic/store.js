/**
 * @File store creation and configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer.js';
import rootSaga from './rootSaga.js';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// load stored state from the local storage
const appKey = 'pnpt';
// const initialState = JSON.parse(localStorage.getItem(appKey)) || {};
const initialState: InitialState = {};

const store = createStore(rootReducer, initialState, enhancer);

// stores on changes into local storage
// store.subscribe(() => {
//   localStorage.setItem(appKey, JSON.stringify(store.getState()));
// });

sagaMiddleware.run(rootSaga);

export default store;
