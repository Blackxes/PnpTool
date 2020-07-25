/**
 * @File combines all debugging components
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import DebugStorageManagement from './DebugStorageManagement';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';
import { Button } from '../Form/Buttons';
import { connect } from 'react-redux';
var Debug = function (_a) {
    var panelOpen = _a.panelOpen, togglePanelOpen = _a.togglePanelOpen;
    var classNames = joinStrings([
        'debugging',
        [panelOpen, 'open', 'closed']
    ]);
    return (React.createElement("div", { className: classNames },
        React.createElement(Button, { type: panelOpen ? 'info' : 'error', className: "toggle-appearance", small: true, onClick: togglePanelOpen }, panelOpen ? 'Close Debugging' : 'Open Debugging'),
        panelOpen && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "debug-component flex flex-v" },
                React.createElement("p", { className: "debug-component-title text-center" }, "Storage Management"),
                React.createElement(DebugStorageManagement, null))))));
};
var toProps = function (state) {
    var _a;
    return ({
        panelOpen: (_a = state.Debug) === null || _a === void 0 ? void 0 : _a.panelOpen
    });
};
var toDispatch = function (dispatch) { return ({
    togglePanelOpen: function () { return dispatch({ type: 'toggle-panel-open' }); }
}); };
export default connect(toProps, toDispatch)(Debug);
