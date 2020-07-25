/**
 * @File
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
import { joinStrings } from '../../../Logic/Source/Miscellaneous/functions';
export var FormFieldDescription = function (_a) {
    var description = _a.description, rest = __rest(_a, ["description"]);
    var classNames = joinStrings(['form-field-description', rest.className]);
    var children = rest.children;
    var restProps = !Object.keys(rest).length ? [] : rest;
    delete rest.className;
    delete rest.children;
    return (React.createElement("div", __assign({ className: classNames }, restProps), children != undefined ? children : description));
};
/**
 * error messages within the form field header
 */
export var FormFieldDescriptionErrorMessage = function (_a) {
    var formStateMeta = _a.formStateMeta, _b = _a.type, type = _b === void 0 ? 'error' : _b;
    if (!formStateMeta || formStateMeta.constructor !== Object)
        return null;
    var classNames = joinStrings([[type, 'msg-' + type, 'msg-error']]);
    var Component = meta.touched && meta.error ? (React.createElement(FormFieldDescription, null,
        React.createElement("p", { className: classNames }, formStateMeta.error))) : null;
    return Component;
};
