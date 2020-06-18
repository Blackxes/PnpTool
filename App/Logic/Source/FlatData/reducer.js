/**
 * @File data which has no self logic but is plainly stored in arrays
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { addToState, deleteFromState, updateInState } from '../Miscellaneous/functions';
import {
    createAttributeBaseFromSubmission,
    createShallowAttributeBaseFromSubmission,
    getAttributeIdFromSubmission,
    createAttributeSetFromSubmission
} from './functions';

const initialState = {
    attributeBases: [
        // new AttributeBase('Health', 0),
        // new AttributeBase('PDamage', 0),
        // new AttributeBase('MDamage', 0),
        // new AttributeBase('Armor', 0),
        // new AttributeBase('MResistance', 0),
        // new AttributeBase('CritChance', 0),
        // new AttributeBase('CritModifier', 2.0),
        // new AttributeBase('MDamageCritChance', 0),
        // new AttributeBase('MDamageCritModifier', 2.5)
    ],
    attributeSets: [],
    characterSheets: [],
    equationSymbols: [],
    forms: [],
    formSheetOptions: []
};

const FlatData = (state = initialState, { type, pl }) => {
    switch (type) {
        case 'add-attribute-base':
            return addToState(state, 'attributeBases', createAttributeBaseFromSubmission(pl));
        case 'delete-attribute-base':
            console.log(pl, getAttributeIdFromSubmission(pl));
            return deleteFromState(state, 'attributeBases', getAttributeIdFromSubmission(pl));
        case 'update-attribute-base':
            const replacement = createShallowAttributeBaseFromSubmission(pl);
            const attributeId = getAttributeIdFromSubmission(pl);
            return updateInState(state, 'attributeBases', attributeId, replacement);
        case 'add-attribute-set':
            return addToState(state, 'attributeSets', createAttributeSetFromSubmission(pl));
        // return addToState(state, 'attributeSets', pl);
        case 'delete-attribute-set':
            return deleteFromState(state, 'attributeSets', pl);
        case 'update-attribute-set':
            return updateInState(state, 'attributeSets', pl.id, pl.item);
        case 'add-character-sheet':
            return addToState(state, 'characterSheets', pl);
        case 'delete-character-sheet':
            return deleteFromState(state, 'characterSheets', pl);
        case 'update-character-sheet':
            return updateInState(state, 'characterSheets', pl.id, pl.item);
        case 'add-equation-symbol':
            return addToState(state, 'equationSymbols', pl);
        case 'delete-equation-symbol':
            return deleteFromState(state, 'equationSymbols', pl);
        case 'update-equation-symbol':
            return updateInState(state, 'equationSymbols', pl.id, pl.item);
        case 'add-form':
            return addToState(state, 'forms', pl);
        case 'delete-form':
            return deleteFromState(state, 'forms', pl);
        case 'update-form':
            return updateInState(state, 'forms', pl.id, pl.item);
        case 'add-form-sheet-option':
            return addToState(state, 'formSheetOptions', pl);
        case 'delete-form-sheet-option':
            return deleteFromState(state, 'formSheetOptions', pl);
        case 'update-form-sheet-option':
            return updateInState(state, 'formSheetOptions', pl);
    }

    return state;
};

export default FlatData;
