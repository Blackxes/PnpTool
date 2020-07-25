/**
 * @File controls the permission to use the local storage
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Button } from '../Form/Buttons';
import { connect } from 'react-redux';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';
var InlineText = function (_a) {
    var text = _a.text, rest = __rest(_a, ["text"]);
    return React.createElement("span", __assign({}, rest), text);
};
var ErrorInlineText = function (props) {
    var classNames = joinStrings(['msg-error', props.className]);
    return React.createElement(InlineText, __assign({ className: classNames }, props));
};
var OkInlineText = function (props) {
    var classNames = joinStrings(['msg-ok', props.className]);
    return React.createElement(InlineText, __assign({ className: classNames }, props));
};
var DebugStorageManagement = function (_a) {
    var loadPermission = _a.loadPermission, savePermission = _a.savePermission, onToggleLoadPermission = _a.onToggleLoadPermission, onToggleSavePermission = _a.onToggleSavePermission;
    return (React.createElement("div", { className: "storage-permissions flex flex-v" },
        React.createElement(Button, { onClick: onToggleLoadPermission, className: "list-item flex flex-h flex-align", small: true },
            React.createElement("p", null, "LoadFromStorage:"),
            loadPermission ? (React.createElement(OkInlineText, { text: "Enabled" })) : (React.createElement(ErrorInlineText, { text: "Disabled" }))),
        React.createElement(Button, { onClick: onToggleSavePermission, className: "list-item  flex flex-h flex-align", disabled: !loadPermission, small: true },
            React.createElement("p", null, "SaveToStorage:"),
            savePermission && loadPermission ? (React.createElement(OkInlineText, { text: "Enabled" })) : (React.createElement(ErrorInlineText, { text: "Disabled" })))));
};
var toProps = function (state) { return ({
    loadPermission: state.Debug.loadFromStoragePermission,
    savePermission: state.Debug.saveToStoragePermission
}); };
var toDispatch = function (dispatch) { return ({
    onToggleLoadPermission: function () { return dispatch({ type: 'toggle-load-from-storage-permission' }); },
    onToggleSavePermission: function () { return dispatch({ type: 'toggle-save-to-storage-permission' }); }
}); };
export default connect(toProps, toDispatch)(DebugStorageManagement);
