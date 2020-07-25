/**
 * @File configuration for the different equation item views depending on the context
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
import { EquationListItemEditAttribute, EquationListItemAttribute, EquationListItemNone } from './EquationListItems';
var EquationItemsRenderConfig = {
    none: {
        editing: function (props) { return React.createElement(EquationListItemNone, __assign({}, props)); },
        listItem: function (props) { return React.createElement(EquationListItemNone, __assign({}, props)); }
    },
    attribute: {
        editing: function (props) { return React.createElement(EquationListItemEditAttribute, __assign({}, props)); },
        listItem: function (props) { return React.createElement(EquationListItemAttribute, __assign({}, props)); }
    },
    symbol: {
        editing: function () { return React.createElement("p", null, "Editing Symbol"); },
        listItem: function () { return React.createElement("p", null, "ListItemView Symbol"); }
    },
    constant: {
        editing: function () { return React.createElement("p", null, "Editing Constant"); },
        listItem: function () { return React.createElement("p", null, "ListItemView Constanst"); }
    },
    equation: {
        editing: function () { return React.createElement("p", null, "Editing Equation"); },
        listItem: function () { return React.createElement("p", null, "ListItemView Equation"); }
    }
};
export default EquationItemsRenderConfig;
