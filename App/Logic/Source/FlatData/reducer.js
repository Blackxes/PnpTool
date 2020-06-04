/**
 * @File data which has no self logic but is plainly stored in arrays
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import {
    addToState,
    removeFromState,
    updateInState
} from '../Miscellaneous/functions';

const initialState = {
    attributesBases: [],
    attributeSets: [],
    characterSheets: [],
    equationSymbols: [],
    forms: [],
    formSheetOptions: []
};

const FlatData = (state = initialState, { type, pl }) => {
    switch (type) {
        case 'add-attribute-base':
            return addToState(state, 'attributeBases', pl);
        case 'remove-attribute-base':
            return removeFromState(state, 'attributeBases', pl);
        case 'update-attribute-base':
            return updateInState(state, 'attributeBases', pl.id, pl.item);
        case 'add-attribute-set':
            return addToState(state, 'attributeSets', pl);
        case 'remove-attribute-set':
            return removeFromState(state, 'attributeSets', pl);
        case 'update-attribute-set':
            return updateInState(state, 'attributeSets', pl.id, pl.item);
        case 'add-character-sheet':
            return addToState(state, 'characterSheets', pl);
        case 'remove-character-sheet':
            return removeFromState(state, 'characterSheets', pl);
        case 'update-character-sheet':
            return updateInState(state, 'characterSheets', pl.id, pl.item);
        case 'add-equation-symbol':
            return addToState(state, 'equationSymbols', pl);
        case 'remove-equation-symbol':
            return removeFromState(state, 'equationSymbols', pl);
        case 'update-equation-symbol':
            return updateInState(state, 'equationSymbols', pl.id, pl.item);
        case 'add-form':
            return addToState(state, 'forms', pl);
        case 'remove-form':
            return removeFromState(state, 'forms', pl);
        case 'update-form':
            return updateInState(state, 'forms', pl.id, pl.item);
        case 'add-form-sheet-option':
            return addToState(state, 'formSheetOptions', pl);
        case 'remove-form-sheet-option':
            return removeFromState(state, 'formSheetOptions', pl);
        case 'update-form-sheet-option':
            return updateInState(state, 'formSheetOptions', pl);
    }
};

export default FlatData;
