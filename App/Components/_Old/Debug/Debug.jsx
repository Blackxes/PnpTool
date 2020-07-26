/**
 * @File combines all debugging components
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import DebugStorageManagement from './DebugStorageManagement';
import { joinStrings } from '../../Logic/Miscellaneous/Functions';
import { Button } from '../Form/Buttons';
import { connect } from 'react-redux';

const Debug = ({ panelOpen, togglePanelOpen }) => {
    const classNames = joinStrings([
        'debugging',
        [panelOpen, 'open', 'closed']
    ]);

    return (
        <div className={classNames}>
            <Button
                type={panelOpen ? 'info' : 'error'}
                className="toggle-appearance"
                small
                onClick={togglePanelOpen}
            >
                {panelOpen ? 'Close Debugging' : 'Open Debugging'}
            </Button>
            {panelOpen && (
                <React.Fragment>
                    <div className="debug-component flex flex-v">
                        <p className="debug-component-title text-center">
                            Storage Management
                        </p>
                        <DebugStorageManagement />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

const toProps = (state) => ({
    panelOpen: state.Debug?.panelOpen
});

const toDispatch = (dispatch) => ({
    togglePanelOpen: () => dispatch({ type: 'toggle-panel-open' })
});

export default connect(toProps, toDispatch)(Debug);
