/**
 * @File display the headline of the equation builder
 * 	or the selection when no sheet is selected
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes as fasTimes } from '@fortawesome/free-solid-svg-icons';
import { Selection } from '../../Form/FormComponents';
/**
 * when no sheet is selected this component will be returned by the header
 */
var SheetSelection = function (_a) {
    var sheetEntities = _a.sheetEntities, onChange = _a.onChange;
    // mapped sheets / id, name
    var mappedSelectItems = sheetEntities.map(function (item) { return ({
        id: item.name,
        label: item.name,
        value: item.id
    }); });
    React.createElement(Selection, { selectionKey: "character-sheet", type: "info", items: mappedSelectItems });
};
var EquationBuilderHeadline = function (_a) {
    var selectedSheet = _a.selectedSheet, sheetEntities = _a.sheetEntities, onSelectSheet = _a.onSelectSheet, onDeselectSheet = _a.onDeselectSheet;
    if (selectedSheet) {
        React.createElement(SheetSelection, { sheetEntities: sheetEntities, onChange: onSelectSheet });
    }
    var linkedSheet = selectedSheet &&
        sheetEntities.find(function (sitem) { return sitem.id == selectedSheet; });
    if (selectedSheet) {
        // on selected sheet
        return (React.createElement("div", { className: "container container-box flex flex-h flex-align" },
            React.createElement("div", { className: "list-item btn btn-info", onClick: onDeselectSheet },
                React.createElement(FontAwesomeIcon, { icon: fasTimes })),
            React.createElement("h1", { className: "list-item flex flex-h flex-align" },
                React.createElement("span", { className: "list-item" }, "Charactersheet"),
                React.createElement("span", { className: "list-item text-sub" }, "///"),
                React.createElement("span", { className: "list-item msg-info" }, linkedSheet.name))));
    }
    var sheetSelectOptions = sheetEntities.map(function (sitem) { return ({
        id: sitem.id,
        label: sitem.name,
        value: sitem.id
    }); });
    // on sheet selectection
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container container-box flex flex-h flex-align" },
            React.createElement("h1", { className: "list-item flex flex-h flex-align" },
                React.createElement("span", { className: "list-item" }, "Charactersheet"),
                React.createElement("span", { className: "list-item text-sub" }, "///")),
            React.createElement(Selection, { className: "list-item item-max", type: "error", items: sheetSelectOptions, defaultValue: selectedSheet, onChange: onSelectSheet })),
        React.createElement("p", { className: "container-box info" }, "Ohne einen ausgew\u00E4hlten Charaktersheet kann keine Formel editiert oder erstellt werden.")));
};
export default EquationBuilderHeadline;
