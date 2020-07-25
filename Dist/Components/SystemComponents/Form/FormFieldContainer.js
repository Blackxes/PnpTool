/**
 * @File form field wrapper
 *
 * 	a form field is a component usually made of a label and its input field
 * 	generally you can say, a form field is a context within a form
 * 	wrapping a value definition (input field) and its explanations (labels, descriptions)
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
var FormFieldContainer = function (_a) {
    var fieldKey = _a.fieldKey, horizontal = _a.horizontal, rest = __rest(_a, ["fieldKey", "horizontal"]);
    var classNames = joinStrings([
        'form-field',
        [fieldKey, 'form-field-' + fieldKey],
        'flex',
        [horizontal, 'flex-h flex-align', 'flex-v'],
        rest.className
    ]);
    var restProps = !Object.keys(rest).length ? [] : rest;
    return (React.createElement("div", __assign({ className: classNames }, restProps), rest.children));
};
export default FormFieldContainer;
