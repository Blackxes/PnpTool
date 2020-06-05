/**
 * @File store creation and configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

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
const appKey = 'Pnpt';
const loadFromStorage = true;
const saveToStorage = true;
const initialState = {};

// get data from local storage when enabled
if (loadFromStorage) {
    const reducerFuncs = rootReducer({}, { type: 'test' });
    const reducerKeys = Object.keys(reducerFuncs);

    reducerKeys.map((key) => {
        const rawData = localStorage.getItem(appKey + key);

        initialState[key] = {
            ...reducerFuncs[key],
            ...(JSON.parse(rawData) || {}),
            _loadedState: rawData !== null
        };
    });
}

console.log(initialState);
// (loadFromStorage && JSON.parse(localStorage.getItem(appKey))) || {};

const store = createStore(rootReducer, initialState, enhancer);

// stores on changes into local storage
if (saveToStorage) {
    store.subscribe(() => {
        localStorage.setItem(appKey, JSON.stringify(store.getState()));
    });
}

sagaMiddleware.run(rootSaga);

export default store;
