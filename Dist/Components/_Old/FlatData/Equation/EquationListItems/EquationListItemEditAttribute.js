/**
 * @File editing interface for an equation unit
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons';
import { Selection } from '../../../Form/FormComponents';
var EquationListItemEditAttribute = function (_a) {
    var equationUnit = _a.equationUnit, attributeBases = _a.attributeBases, stopEditing = _a.stopEditing, updateUnit = _a.updateUnit;
    var attribute = equationUnit.linked, config = equationUnit.config;
    var baseOptions = attributeBases.map(function (item) { return ({
        id: item.id,
        label: item.name,
        value: item.id
    }); });
    var _b = React.useState(equationUnit.config.contextId), tempSelectedBase = _b[0], setTempSelectedBase = _b[1];
    var selectType = equationUnit.config.contextId != tempSelectedBase ? 'warning' : 'info';
    return (React.createElement("div", { className: "container-box" },
        React.createElement("div", { className: "container flex flex-h" },
            React.createElement("p", { className: "list-item" },
                "Attribut ",
                (attribute === null || attribute === void 0 ? void 0 : attribute.name) || 'Unbenannt',
                " bearbeiten"),
            React.createElement("div", { className: "list-item btn btn-error flex-end", onClick: function () { return stopEditing(equationUnit.id); } },
                React.createElement(FontAwesomeIcon, { icon: fasTimes }))),
        React.createElement(Selection, { className: "", type: selectType, items: baseOptions, nothingSelectedLabel: false, defaultValue: tempSelectedBase || equationUnit.config.contextId, onChange: function (evt) { return setTempSelectedBase(evt.target.value); } }),
        React.createElement("button", { type: "button", className: "btn btn-ok", onClick: function () {
                updateUnit(equationUnit.id, {
                    config: __assign(__assign({}, equationUnit.config), { contextId: tempSelectedBase }),
                    isNew: false
                });
                stopEditing(equationUnit.id);
            } }, "Speichern"))
    // <p>Editing {config.equationUnitId}</p>
    // <EquationContext.Consumer>
    // 	{({ saveEditing, stopEditing }) => {
    // 		<div className="flex flex-v">
    //     <p>Editing</p>
    //     <div className="btn btn-ok" onClick={() => onStopEditing}>
    //         Save
    //     </div>
    //     <div
    //         className="btn btn-error"
    //         onClick={() => onCancelEditing(config.equationUnitId)}
    //     >
    //         Discard
    //     </div>
    // </div>
    // 	}}
    // </EquationContext.Consumer>
    );
};
export default EquationListItemEditAttribute;
