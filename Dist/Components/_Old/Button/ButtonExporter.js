/**
 * @File contains button designs
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
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
import React from 'react';
import { NavLink } from 'react-router-dom';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';
/**
 * builds an ok button
 * uses the <Button /> Component in this file
 */
export var OkButton = function (_a) {
    var small = _a.small, className = _a.className, rest = __rest(_a, ["small", "className"]);
    return Button(__assign({ type: 'ok', small: small, className: className }, rest));
};
/**
 * builds a error button
 * uses the <Button /> Component in this file
 */
export var ErrorButton = function (_a) {
    var small = _a.small, className = _a.className, rest = __rest(_a, ["small", "className"]);
    return Button(__assign({ type: 'error', small: small, className: className }, rest));
};
/**
 * builds an warning button
 * uses the <Button /> Component in this file
 */
export var WarningButton = function (_a) {
    var small = _a.small, className = _a.className, rest = __rest(_a, ["small", "className"]);
    return Button(__assign({ type: 'warning', small: small, className: className }, rest));
};
/**
 * builds an info button
 * uses the <Button /> Component in this file
 */
export var InfoButton = function (_a) {
    var small = _a.small, className = _a.className, rest = __rest(_a, ["small", "className"]);
    return Button(__assign({ type: 'info', small: small, className: className }, rest));
};
/**
 * builds a submit button
 * uses the <Button /> Component in this file
 */
export var SubmitButton = function (_a) {
    var small = _a.small, type = _a.type, rest = __rest(_a, ["small", "type"]);
    return Button(__assign({ type: 'submit', small: small }, rest));
};
/**
 * creates an a tag link in button style
 */
export var Link = function (_a) {
    var to = _a.to, label = _a.label, small = _a.small, className = _a.className, rest = __rest(_a, ["to", "label", "small", "className"]);
    var classNames = joinStrings([
        'btn',
        [rest.type, 'btn-' + rest.type],
        [small, 'btn-small'],
        className
    ]);
    return (React.createElement(NavLink, __assign({ to: to, className: classNames }, rest), label));
};
/**
 * builds an ok link
 * uses the <Link /> component in this file
 */
export var OkLink = function (_a) {
    var to = _a.to, label = _a.label, small = _a.small, className = _a.className, rest = __rest(_a, ["to", "label", "small", "className"]);
    return Link(__assign(__assign({ to: to, label: label, small: small, className: className }, rest), { type: 'ok' }));
};
/**
 * builds an error link
 * uses the <Link /> component in this file
 */
export var ErrorLink = function (_a) {
    var to = _a.to, label = _a.label, small = _a.small, className = _a.className, rest = __rest(_a, ["to", "label", "small", "className"]);
    return Link(__assign(__assign({ to: to,
        label: label,
        small: small,
        className: className }, rest), { type: 'error' }));
};
/**
 * builds an warning link
 * uses the <Link /> component in this file
 */
export var WarningLink = function (_a) {
    var to = _a.to, label = _a.label, small = _a.small, className = _a.className, rest = __rest(_a, ["to", "label", "small", "className"]);
    return Link(__assign(__assign({ to: to,
        label: label,
        small: small,
        className: className }, rest), { type: 'warning' }));
};
/**
 * builds an info link
 * uses the <Link /> component in this file
 */
export var InfoLink = function (_a) {
    var to = _a.to, label = _a.label, small = _a.small, className = _a.className, rest = __rest(_a, ["to", "label", "small", "className"]);
    return Link(__assign(__assign({ to: to,
        label: label,
        small: small,
        className: className }, rest), { type: 'info' }));
};
