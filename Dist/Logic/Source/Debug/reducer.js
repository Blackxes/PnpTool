/**
 * @File reducer for debugging properties
 * 	these settings are not in the production build
 *
 * 	this reducer is as well only included in the development mode of the application
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
import { DefaultDebugSettings } from './data';
var initialState = new DefaultDebugSettings();
var Debug = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, pl = _a.pl;
    switch (type) {
        case 'toggle-panel-open':
            return __assign(__assign({}, state), { panelOpen: !state.panelOpen });
        case 'toggle-load-from-storage-permission':
            return __assign(__assign({}, state), { loadFromStoragePermission: !state.loadFromStoragePermission, saveToStoragePermission: !state.loadFromStoragePermission
                    ? false
                    : state.saveToStoragePermission });
        case 'toggle-save-to-storage-permission':
            return __assign(__assign({}, state), { saveToStoragePermission: !state.saveToStoragePermission });
    }
    return state;
};
export default Debug;
