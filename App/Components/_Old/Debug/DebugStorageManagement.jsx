/**
 * @File controls the permission to use the local storage
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { Button } from '../Form/Buttons';
import { connect } from 'react-redux';
import { joinStrings } from '../../Logic/Source/Miscellaneous/functions';

const InlineText = ({ text, ...rest }) => {
    return <span {...rest}>{text}</span>;
};

const ErrorInlineText = (props) => {
    const classNames = joinStrings(['msg-error', props.className]);
    return <InlineText className={classNames} {...props} />;
};

const OkInlineText = (props) => {
    const classNames = joinStrings(['msg-ok', props.className]);
    return <InlineText className={classNames} {...props} />;
};

const DebugStorageManagement = ({
    loadPermission,
    savePermission,
    onToggleLoadPermission,
    onToggleSavePermission
}) => {
    return (
        <div className="storage-permissions flex flex-v">
            <Button
                onClick={onToggleLoadPermission}
                className="list-item flex flex-h flex-align"
                small
            >
                <p>LoadFromStorage:</p>
                {loadPermission ? (
                    <OkInlineText text="Enabled" />
                ) : (
                    <ErrorInlineText text="Disabled" />
                )}
            </Button>
            <Button
                onClick={onToggleSavePermission}
                className="list-item  flex flex-h flex-align"
                disabled={!loadPermission}
                small
            >
                <p>SaveToStorage:</p>
                {savePermission && loadPermission ? (
                    <OkInlineText text="Enabled" />
                ) : (
                    <ErrorInlineText text="Disabled" />
                )}
            </Button>
        </div>
    );
};

const toProps = (state) => ({
    loadPermission: state.Debug.loadFromStoragePermission,
    savePermission: state.Debug.saveToStoragePermission
});

const toDispatch = (dispatch) => ({
    onToggleLoadPermission: () => dispatch({ type: 'toggle-load-from-storage-permission' }),
    onToggleSavePermission: () => dispatch({ type: 'toggle-save-to-storage-permission' })
});

export default connect(toProps, toDispatch)(DebugStorageManagement);
