/**
 * @File generic form for the attribute sets
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { Field } from 'react-final-form';
import { FormWrapper, FormTitle, FormFieldContainer, FormFieldHeader, FormFieldTitle, FormFieldDescription, FormFieldWrapper } from '../Form/FormComponents';
import { SubmitButton } from '../Form/Buttons';
var initialProps = {
    onSubmit: function () { },
    submitLabel: 'Hinzufügen',
    entry: null,
    bases: []
};
var getLinkedBaseUsageStateObject = function (bases, usedBases) {
    var usageStateReducer = function (linked, base) {
        var used = usedBases.find(function (id) { return base.id == id; });
        linked[used !== undefined ? 'linkedUsedBases' : 'linkedUnusedBases'].push(base);
        return linked;
    };
    var filtered = bases.reduce(usageStateReducer, {
        linkedUsedBases: [],
        linkedUnusedBases: []
    });
    return filtered;
};
var AttributeSetForm = function (props) {
    var _a = __assign(__assign({}, initialProps), props), onSubmit = _a.onSubmit, submitLabel = _a.submitLabel, entry = _a.entry, bases = _a.bases;
    var _b = React.useState([]), selectedBases = _b[0], setSelectedBases = _b[1];
    // Todo: Change the way the used and unused bases arrays are build
    //	the way it currently works is in loops the attributeBases object's entries
    //	and therefore preserves the sorting order of that object
    // 	the way it should rather work is it should preserve the sorting order
    // 	of the selection of the use. Selecting A1 -> A3 -> A2 into usedBases array
    // 	should stay in that order and should be displayed in that order when printing usedBases
    var _c = getLinkedBaseUsageStateObject(bases, selectedBases), linkedUsedBases = _c.linkedUsedBases, linkedUnusedBases = _c.linkedUnusedBases;
    // Todo: implement initial form state
    // const initialFormState =
    // Fixme: reset selected bases when form submitted
    return (React.createElement(React.Fragment, null,
        React.createElement("p", { className: "text-title msg-error" }, "Editieren momentan nicht m\u00F6glich. Vorsicht beim abspeichern des Satzes!"),
        React.createElement(FormWrapper, { onSubmit: onSubmit, render: function () { return (React.createElement(React.Fragment, null,
                React.createElement(FormTitle, { title: "Attribut Satz" }),
                React.createElement(FormFieldContainer, { horizontal: true },
                    React.createElement(FormFieldHeader, null,
                        React.createElement(FormFieldTitle, { title: "Name" })),
                    React.createElement(FormFieldWrapper, null,
                        React.createElement(Field, { name: "name", component: "input" }, function (_a) {
                            var input = _a.input;
                            return (React.createElement("input", __assign({}, input, { placeholder: "Name", required: true })));
                        }))),
                React.createElement(FormFieldContainer, { horizontal: true },
                    React.createElement(FormFieldHeader, null,
                        React.createElement(FormFieldTitle, { title: "Verf\u00FCgbare Attribute" }),
                        React.createElement(FormFieldDescription, null,
                            React.createElement("p", null, "Attributbasen die noch zur Auswahl stehen, um in dieses Set hinzuzuf\u00FCgen."))),
                    React.createElement(FormFieldWrapper, null,
                        React.createElement("select", { onChange: function (evt) {
                                return setSelectedBases(__spreadArrays(selectedBases, [evt.target.value]));
                            } },
                            React.createElement("option", { value: "null" }, "- Ausw\u00E4hlen -"),
                            linkedUnusedBases.map(function (item) { return (React.createElement("option", { key: item.id, value: item.id }, item.name)); })))),
                React.createElement(FormFieldContainer, null,
                    React.createElement(FormFieldHeader, null,
                        React.createElement(FormFieldTitle, null, "Selektierte Basen"),
                        React.createElement(FormFieldDescription, null, !linkedUsedBases.length ? (React.createElement("p", { className: "msg-error" }, "Keine Basen ausgew\u00E4hlt")) : (React.createElement("div", { className: "flex flex-h flex-wrap" }, linkedUsedBases.map(function (item) { return (React.createElement("div", { key: item.id, onClick: function () {
                                return setSelectedBases(selectedBases.filter(function (id) { return id != item.id; }));
                            } },
                            React.createElement("p", { className: "list-item msg-error" },
                                item.name,
                                "/",
                                item.defaultValue))); })))),
                        selectedBases.length ? (React.createElement(FormFieldDescription, { className: "text-sub" }, "Zum entfernen auf das Attribut klicken in der Liste")) : null)),
                React.createElement(Field, { name: "bases", component: "input", type: "hidden", defaultValue: selectedBases.join(',') }),
                React.createElement(SubmitButton, null, submitLabel))); } })));
};
export default AttributeSetForm;
