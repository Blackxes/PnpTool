/**
 * @File reducer for debugging properties
 * 	these settings are not in the production build
 *
 * 	this reducer is as well only included in the development mode of the application
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { DefaultDebugSettings } from './data';

const initialState = new DefaultDebugSettings();

const Debug = (state = initialState, { type, pl }) => {
    switch (type) {
        case 'toggle-panel-open':
            return { ...state, panelOpen: !state.panelOpen };
        case 'toggle-load-from-storage-permission':
            return {
                ...state,
                loadFromStoragePermission: !state.loadFromStoragePermission,
                saveToStoragePermission: !state.loadFromStoragePermission
                    ? false
                    : state.saveToStoragePermission
            };
        case 'toggle-save-to-storage-permission':
            return {
                ...state,
                saveToStoragePermission: !state.saveToStoragePermission
            };
    }
    return state;
};

export default Debug;
