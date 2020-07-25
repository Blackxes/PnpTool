/**
 * @File builds basically the equation components and the possible in-between parts
 * 	the inbetween parts are components like "Add-Component" Button which enables
 * 	the component editing. Or the editing interface for a component
 *
 * 	this component determines which component the current index should be
 * 	and wraps it into a noice container
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
import { CreateEquationUnitButton } from './EquationListItems';
import { generateId } from '../../../Logic/Source/Miscellaneous/functions';
import { EquationContext } from './EquationBuilder';
import EquationItemsRenderConfig from './EquationItemsRenderConfig';
var EquationListBuilder = function (_a) {
    var equationUnits = _a.equationUnits, createUnit = _a.createUnit, editingUnits = _a.editingUnits, _b = _a.permitUnitAddition, permitUnitAddition = _b === void 0 ? true : _b;
    // build items / these items can be one of the following components
    // - EquationUnitListItem - an equation unit item with a valid type
    // - AddEquationUnit - enables the equationUnitConfiguration and initializes a new EquationUnit on that index
    // - EquationEditingInterface - the interface for the user to confgure or change the EquationUnit
    //
    var unitComponentList = [];
    // runs until (when adding actions are enabled) every component is build (*2 +1)
    // +1 because of the last adding action
    var capLock = +permitUnitAddition;
    var loopCap = (equationUnits === null || equationUnits === void 0 ? void 0 : equationUnits.length) * (1 + capLock) + capLock || 0;
    var _loop_1 = function (i) {
        if (permitUnitAddition) {
            unitComponentList.push(React.createElement("li", { key: generateId(), className: "list-item mn" },
                React.createElement(CreateEquationUnitButton, { onCreateUnit: function () { return createUnit(i); } })));
        }
        // when the loop is about to reacth the max by 1 loop run
        // this equation unit does not exists since the loopCap
        // is based on the permission to add more units
        // when disabled this doesnt matter
        if (unitComponentList.length < loopCap) {
            var unit_1 = equationUnits[i];
            if (!unit_1) {
                unitComponentList.push(React.createElement("p", { className: "list-item mtb" }, "Nothing found"));
                return "continue";
            }
            var renderConfig = EquationItemsRenderConfig[unit_1.type];
            if (renderConfig == undefined) {
                unitComponentList.push(React.createElement("p", { className: "list-item mtb" }, 'No renderconfiguration found for type ' + unit_1.type));
                return "continue";
            }
            var UnitViewComponent_1 = editingUnits.includes(unit_1.id) || unit_1.isNew
                ? renderConfig.editing
                : renderConfig.listItem;
            unitComponentList.push(React.createElement("li", { key: generateId(), className: "list-item mtb" },
                React.createElement(EquationContext.Consumer, null, function (props) { return (React.createElement(UnitViewComponent_1, __assign({}, props, { equationUnit: unit_1 }))); })));
        }
    };
    // capLock = boolean;
    // const loopCap = 2 * (1 + capLock) + capLock || 0;
    for (var i = 0; unitComponentList.length < loopCap; i++) {
        _loop_1(i);
    }
    return React.createElement("ul", { className: "flex flex-v flex-align" }, unitComponentList);
};
export default EquationListBuilder;
