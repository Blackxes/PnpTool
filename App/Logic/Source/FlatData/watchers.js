/**
 * @File sagas of this app
 * 	possibly mostly form submission catches where the data is converted into an object
 * 	which then is passed to an reducer updating the state
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { takeLatest, put, select } from 'redux-saga/effects';
import {
    createCharacterSheetAttribute,
    createCharacterSheet
} from './functions';

const CreateSheetFromSubmission = 'create-character-sheet-form-submission';

/**
 * creates a character sheet object and passes it to an reducer when built
 */
export function* OnCharacterSheetCreateSubmission() {
    yield takeLatest(CreateSheetFromSubmission, function* (action) {
        const { type, pl } = action;
        const bases = yield select((state) => state.FlatData.attributeBases);

        // split passed ids and build the character sheet attributes
        const ids = pl.attribute_ids.split(',');
        const attributes = [];

        for (const id of ids) {
            const value = pl['attribute_' + id + '_value'];
            const sheetAttribute = createCharacterSheetAttribute(id, value);

            attributes.push(sheetAttribute);
        }

        const sheet = createCharacterSheet(pl.name, attributes);

        yield put({ type: 'add-character-sheet', pl: sheet });
    });
}
