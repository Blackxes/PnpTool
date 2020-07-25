/**
 * @File attribute bases form
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
import * as React from 'react';
import { Field } from 'react-final-form';
import { FormWrapper, FormTitle, FormFieldContainer, FormFieldHeader, FormFieldTitle, FormFieldDescription, FormFieldWrapper } from '../Form/FormComponents';
import { SubmitButton } from '../Form/Buttons';
var initialProps = {
    onSubmit: function () { },
    submitLabel: 'Hinzufügen',
    entry: null
};
var AttributeBaseForm = function (props) {
    var _a = __assign(__assign({}, initialProps), props), onSubmit = _a.onSubmit, submitLabel = _a.submitLabel;
    var wusa = 20;
    var bla = 20;
    return (React.createElement(FormWrapper, { onSubmit: onSubmit, render: function () { return (React.createElement(React.Fragment, null,
            React.createElement(FormTitle, { title: "Attributbasis" }),
            React.createElement(FormFieldContainer, { horizontal: true },
                React.createElement(FormFieldHeader, null,
                    React.createElement(FormFieldTitle, { title: "Name" })),
                React.createElement(FormFieldWrapper, null,
                    React.createElement(Field, { name: "name", component: "input", wusa: "wahnsin" }))),
            React.createElement(FormFieldContainer, { horizontal: true },
                React.createElement(FormFieldHeader, null,
                    React.createElement(FormFieldTitle, { title: "Standardwert" }),
                    React.createElement(FormFieldDescription, null,
                        React.createElement("p", null, "Dieser Wert wird verwendet wenn dem Character Sheet Attribut kein Wert gegeben wurde."))),
                React.createElement(FormFieldWrapper, null,
                    React.createElement(Field, { name: "defaultValue", component: "input" }))),
            React.createElement(SubmitButton, null, submitLabel))); } }));
};
export default AttributeBaseForm;
