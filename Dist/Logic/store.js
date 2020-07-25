/**
 * @File store creation and configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */
import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { setupInitialState, createInitialStore, setupInitialStoreListeners } from './initialState';
var environment = process.env.NODE_ENV;
var sagaMiddleware = createSagaMiddleware();
var middlewares = [sagaMiddleware];
var composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;
var enhancer = composeEnhancers(applyMiddleware.apply(void 0, middlewares));
// setup state
var initialState = setupInitialState(rootReducer);
var initialStore = createInitialStore(rootReducer, initialState, enhancer);
var store = setupInitialStoreListeners(initialStore);
sagaMiddleware.run(rootSaga);
export default store;
