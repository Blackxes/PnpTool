/**
 * @File store setup for the local storage usage in different environments
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createStore } from 'redux';
var Environment = process.env.NODE_ENV;
var AppKey = 'Pnpt';
var AppVersion = '1.0.0';
var SetupAction = {
    type: '_' + AppKey + 'SetupAction',
    pl: { version: AppVersion }
};
var storageKeyify = function (key) { return (AppKey + '-' + key).toLowerCase(); };
/**
 * builds the initial state based on local storage and environment
 *
 * @param {function} rootReducer the root reducer from the combineReducers function
 */
export var setupInitialState = function (rootReducer) {
    // depending on what environment mode current app is
    // when in production the Debug property will be deleted
    // every other property stays untouched
    // well.. except the case when they get overwritten by the data in the storage
    var initialState = rootReducer({}, SetupAction);
    if (Environment == 'development') {
        // regardless of the permission debug permission have to be loaded
        var settings = JSON.parse(localStorage.getItem(storageKeyify('debug')));
        initialState.Debug = __assign(__assign(__assign({}, initialState.Debug), settings), { _loadedFromStorage: settings != null });
        // define new debug options when none given
        if (!settings) {
            localStorage.setItem(storageKeyify('debug'), JSON.stringify(initialState.Debug));
        }
        //
        else {
            // Fixme: the _loadedFromStorage property in state is either true
            // or will not be loaded since its in the scope when loading is allowed
            // _loadedFromStorage should be always in the state representing the value
            // whether its loaded from storage or its the initial state from the (reducers)
            // loads data from storage when allowed
            if (settings.loadFromStoragePermission) {
                var reducerKeys = Object.keys(initialState);
                for (var _i = 0, reducerKeys_1 = reducerKeys; _i < reducerKeys_1.length; _i++) {
                    var key = reducerKeys_1[_i];
                    var data = JSON.parse(localStorage.getItem(storageKeyify(key)));
                    initialState[key] = __assign(__assign(__assign({}, initialState[key]), (data || {})), { _loadedFromStorage: data != null });
                }
            }
        }
    }
    //
    else if (Environment == 'production') {
        delete initialState.Debug;
    }
    return initialState;
};
/**
 * creates the store
 */
export var createInitialStore = function (rootReducer, preloadedState, enhancer) {
    var store = createStore(rootReducer, preloadedState, enhancer);
    return store;
};
/**
 * sets up initial listeners for the store
 */
export var setupInitialStoreListeners = function (store) {
    // save debug configuration regardless of save permission
    if (Environment == 'development') {
        store.subscribe(function () {
            var currentState = store.getState();
            localStorage.setItem(storageKeyify('debug'), JSON.stringify(currentState.Debug));
        });
    }
    // since the debug settings might change during the application runtime
    // the current state needs to be checked
    store.subscribe(function () {
        var debugSettings = store.getState().Debug;
        // prettier-ignore
        if (Environment == 'production' || (debugSettings.saveToStoragePermission && debugSettings.loadFromStoragePermission)) {
            var state = store.getState();
            var reducerKeys = Object.keys(state);
            for (var _i = 0, reducerKeys_2 = reducerKeys; _i < reducerKeys_2.length; _i++) {
                var key = reducerKeys_2[_i];
                localStorage.setItem(storageKeyify(key), JSON.stringify(state[key]));
            }
        }
    });
    return store;
};
