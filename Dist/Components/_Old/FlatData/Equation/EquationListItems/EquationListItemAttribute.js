/**
 * @File equation unit list item of type attribute
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt as fasSyncAlt, faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons';
import { joinStrings } from '../../../../Logic/Source/Miscellaneous/functions';
import { EquationContext } from '../EquationBuilder';
var EquationListItemAttribute = function (_a) {
    var equationUnit = _a.equationUnit, startEditing = _a.startEditing;
    var attribute = equationUnit.linked, config = equationUnit.config;
    var informationClassNames = joinStrings([
        'list-item item-max container-box flex flex-h flex-fill text-center flex-align',
        [attribute.isFallback, 'error']
    ]);
    var attributeNameClassNames = joinStrings([
        'list-item',
        [attribute.isFallback, 'msg-error']
    ]);
    return (React.createElement(EquationContext.Consumer, null, function (_a) {
        var removeUnit = _a.removeUnit, startEditing = _a.startEditing;
        return (React.createElement("div", { className: "flex flex-h flex-nospace" },
            React.createElement("div", { className: "list-item btn btn-info", onClick: function () { return startEditing(config.equationUnitId); } },
                React.createElement(FontAwesomeIcon, { icon: fasSyncAlt })),
            React.createElement("div", { className: informationClassNames },
                React.createElement("p", { className: attributeNameClassNames }, attribute.name),
                React.createElement("p", { className: "list-item flex flex-h flex-align flex-justify" },
                    React.createElement(React.Fragment, null, (!attribute.isFallback && (React.createElement("span", { className: "list-item msg-error" }, attribute.value))) || (React.createElement("span", { className: "list-item msg-info" },
                        "Standardwert:",
                        ' ',
                        attribute.defaultValue))))),
            React.createElement("div", { className: "btn btn-error", onClick: function () { return removeUnit(config.equationUnitId); } },
                React.createElement(FontAwesomeIcon, { icon: fasTimes }))));
    }));
};
export default EquationListItemAttribute;
