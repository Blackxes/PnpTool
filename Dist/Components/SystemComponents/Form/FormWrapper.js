/**
 * @File general form wrapper with react-final-form
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
import * as React from 'react';
import { Form } from 'react-final-form';
import { joinStrings } from '../../../Logic/Source/Miscellaneous/functions';
/**
 * form wrapper for a react final form Form
 */
var FormWrapper = function (_a) {
    var onSubmit = _a.onSubmit, render = _a.render, InnerFormProps = _a.InnerFormProps, _b = _a.resetForm, resetForm = _b === void 0 ? true : _b, _c = _a.resetState, resetState = _c === void 0 ? true : _c, _d = _a.formKey, formKey = _d === void 0 ? '' : _d, rest = __rest(_a, ["onSubmit", "render", "InnerFormProps", "resetForm", "resetState", "formKey"]);
    var classNames = joinStrings([
        'form container',
        rest.className,
        [formKey, 'form-' + formKey]
    ]);
    return (React.createElement(Form, __assign({ onSubmit: onSubmit, render: function (_a) {
            var handleSubmit = _a.handleSubmit, form = _a.form, renderProps = __rest(_a, ["handleSubmit", "form"]);
            return (React.createElement("form", __assign({ className: classNames, onSubmit: function (evt) {
                    handleSubmit(evt);
                    if (resetForm)
                        form.reset();
                    if (resetState) {
                        form.getRegisteredFields().forEach(function (name) {
                            return form.resetFieldState(name);
                        });
                    }
                } }, InnerFormProps), render(__assign({ form: form }, renderProps))));
        } }, rest)));
};
export default FormWrapper;
