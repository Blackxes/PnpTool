/**
 * @File initial view when creating a new equation unit
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
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
import { Selection } from '../../../Form/FormComponents';
import { generateId } from '../../../../Logic/Source/Miscellaneous/functions';
// none is not listed since its the default from where you select an actual type
var EquationItemTypes = ['attribute', 'symbol', 'constant', 'equation'];
var EquationListItemNone = function (_a) {
    var equationUnit = _a.equationUnit, removeUnit = _a.removeUnit, updateUnit = _a.updateUnit, props = __rest(_a, ["equationUnit", "removeUnit", "updateUnit"]);
    var config = equationUnit.config;
    var _b = React.useState(''), type = _b[0], setType = _b[1];
    var eqTypesOptionsConfigs = EquationItemTypes.map(function (item) { return ({
        id: generateId(),
        label: item,
        value: item
    }); });
    return (React.createElement("div", { className: "container-box flex flex-v" },
        React.createElement("div", { className: "list-item mb flex flex-h flex-align flex-fill" },
            React.createElement("p", { className: "list-item text-center" }, "Bitte einen Typen ausw\u00E4hlen"),
            React.createElement(Selection, { className: "list-item item-max", type: "info", items: eqTypesOptionsConfigs, defaultValue: type, onChange: function (evt) { return setType(evt.target.value); } })),
        React.createElement("div", { className: "list-item flex flex-h end" },
            React.createElement("button", { type: "button", className: "list-item btn btn-error", onClick: function () { return removeUnit(config.equationUnitId); } }, "Abbrechen"),
            React.createElement("button", { type: "button", className: "list-item btn btn-ok", onClick: function () {
                    return updateUnit(equationUnit.id, {
                        type: type
                    });
                } }, "Weiter"))));
};
export default EquationListItemNone;
