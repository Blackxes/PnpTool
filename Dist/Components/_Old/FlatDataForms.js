/**
 * @File forms which purpose is solely to add flat data
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
import { FormWrapper, FormFieldContainer, FormFieldHeader, FormFieldTitle, FormFieldWrapper, FormTitle } from './Form/FormComponents';
import { Field } from 'react-final-form';
import { SubmitButton, ErrorButton } from './Form/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons';
/**
 * attribute bases
 */
/**
 * sheet attribute
 */
export var AttributeSetForm = function (_a) {
    var attributeBases = _a.attributeBases, onSubmit = _a.onSubmit;
    var _b = React.useState([]), selected = _b[0], setSelected = _b[1];
    var selectable = attributeBases.filter(function (attr) { return !selected.find(function (item) { return item == attr.id; }); });
    var selectedLinked = selected.map(function (item) {
        return attributeBases.find(function (base) { return base.id == item; });
    });
    return (React.createElement(FormWrapper, { onSubmit: function (values) { return console.log(values); }, render: function () { return (React.createElement(React.Fragment, null,
            React.createElement(FormTitle, { title: "Attributset" }),
            React.createElement(FormFieldContainer, { horizontal: true },
                React.createElement(FormFieldHeader, null,
                    React.createElement(FormFieldTitle, { title: "Name" })),
                React.createElement(FormFieldWrapper, null,
                    React.createElement(Field, { name: "name" }, function (_a) {
                        var input = _a.input;
                        return (React.createElement("input", __assign({}, input, { placeholder: "Name" })));
                    }))),
            React.createElement(FormFieldContainer, { horizontal: true }, !selectable.length ? (React.createElement("p", { className: "text-sub text-center msg-warning" }, "Alle Attribute ausgew\u00E4hlt")) : (React.createElement(React.Fragment, null,
                React.createElement(FormFieldHeader, null,
                    React.createElement(FormFieldTitle, { title: "Verf\u00FCgbare Attribute" })),
                React.createElement(FormFieldWrapper, null,
                    React.createElement("select", { onChange: function (evt) {
                            return setSelected(__spreadArrays(selected, [
                                evt.target.value
                            ]));
                        } },
                        React.createElement("option", { value: "null" }, "- Ausw\u00E4hlen -"),
                        selectable.map(function (item) { return (React.createElement("option", { key: item.id, value: item.id }, item.name)); })))))),
            React.createElement(FormFieldContainer, { horizontal: true },
                React.createElement(FormFieldHeader, { className: "flex-align-start" },
                    React.createElement(FormFieldTitle, { title: "Ausgew\u00E4hlte Attribute" })),
                React.createElement("div", { className: "selected-attributes-list" }, (!selectedLinked.length && (React.createElement("p", { className: "text-sub text-center msg-error" }, "Keine Attribute ausgew\u00E4hlt"))) || (React.createElement("ul", { className: "flex flex-v" }, selectedLinked.map(function (item) { return (React.createElement("li", { key: item.id, className: "list-item" },
                    React.createElement("div", { className: "flex flex-h flex-align" },
                        React.createElement("p", { className: "list-item remove-from-selected-title" }, item.name),
                        React.createElement(ErrorButton, { className: "list-item flex-end remove-from-selected-trigger", onClick: function () {
                                return setSelected(__spreadArrays(selected.filter(function (selct) {
                                    return selct !=
                                        item.id;
                                })));
                            } },
                            React.createElement(FontAwesomeIcon, { icon: fasTrash }))))); }))))),
            React.createElement(Field, { name: "selected-attributes", component: "input", type: "hidden", defaultValue: selected.join(',') }),
            React.createElement(SubmitButton, null, "Hinzuf\u00FCgen"))); } }));
};
export var CharacterSheetForm = function (_a) {
    var attributeBases = _a.attributeBases;
    var _b = React.useState([]), sheetAttributes = _b[0], setSheetAttributes = _b[1];
    var _c = React.useState([]), usedAttributeBases = _c[0], setUsedAttributeBases = _c[1];
    var baseEntries = Object.entries(attributeBases || {});
    // Todo: Change the way the used and unused bases arrays are build
    //	the way it currently works is in loops the attributeBases object's entries
    //	and therefore preserves the sorting order of that object
    // 	the way it should rather work is it should preserve the sorting order
    // 	of the selection of the use. Selecting A1 -> A3 -> A2 into usedBases array
    // 	should stay in that order and should be displayed in that order when printing usedBases
    var baseEntriesReducer = function (linked, _a) {
        var ind = _a[0], base = _a[1];
        var used = usedAttributeBases.find(function (id) { return base.id == id; });
        linked[used !== undefined ? 'usedBases' : 'unusedBases'].push(base);
        return linked;
    };
    var _d = baseEntries.reduce(baseEntriesReducer, {
        usedBases: [],
        unusedBases: []
    }), usedBases = _d.usedBases, unusedBases = _d.unusedBases;
    console.log(JSON.stringify(usedBases, undefined, 2));
    return (React.createElement(React.Fragment, null,
        React.createElement(FormWrapper, { onSubmit: function (evt) { return console.log(evt); }, render: function (_a) { return (React.createElement(React.Fragment, null,
                React.createElement(FormTitle, { title: "Charactersheet" }),
                React.createElement(FormFieldContainer, { horizontal: true },
                    React.createElement(FormFieldHeader, null,
                        React.createElement(FormFieldTitle, { title: "Name" })),
                    React.createElement(FormFieldWrapper, null,
                        React.createElement(Field, { name: "name" }, function (_a) {
                            var input = _a.input;
                            return (React.createElement(React.Fragment, null,
                                React.createElement("input", __assign({}, input, { placeholder: "Name" }))));
                        }))),
                React.createElement(FormFieldContainer, { horizontal: true },
                    React.createElement("div", { className: "flex flex-v" },
                        React.createElement(FormFieldHeader, null,
                            React.createElement(FormFieldTitle, { title: "Attributbasen" })),
                        React.createElement("div", null, !usedBases.length ? (React.createElement("p", { className: "text-sub msg-info" }, "Es werden keine Attributbasen verwendet")) : (React.createElement("div", { className: "flex flex-h flex-wrap" }, usedBases.map(function (item) { return (React.createElement("p", { className: "text-sub msg-info" }, item.name)); }))))),
                    React.createElement(FormFieldWrapper, { className: "flex-align-start" },
                        React.createElement(Field, { component: "select" }, function () { return (React.createElement("select", { onChange: function (evt) {
                                return setUsedAttributeBases(__spreadArrays(usedAttributeBases, [
                                    evt.target.value
                                ]));
                            } },
                            React.createElement("option", { value: "null" }, "- Ausw\u00E4hlen -"),
                            unusedBases.map(function (item) { return (React.createElement("option", { key: item.id, value: item.id }, item.name)); }))); }))),
                React.createElement(SubmitButton, null, "Hinzuf\u00FCgen"))); } })));
};
