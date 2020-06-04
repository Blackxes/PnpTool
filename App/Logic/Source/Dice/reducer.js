/**
 * @File dice reducer
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { addToState, removeFromState } from '../Miscellaneous/functions';

const initialState = {
    rangeMin: 0,
    rangeMax: 100,
    currentRollName: 'Unbenannt',
    selectedRoll: null,
    rollHistory: [],
    archivedRolls: []
};

const Dice = (state = initialState, { type, pl }) => {
    switch (type) {
        case 'set-min-range':
            return { ...state, rangeMin: pl.value };
        case 'set-max-range':
            return { ...state, rangeMax: pl.value };
        case 'set-current-roll-name':
            return { ...state, currentRollName: pl.value };
        case 'set-selected-roll':
            return { ...state, selectedRoll: pl.value };
        case 'add-roll-to-history':
            return addToState(state, 'rollHistory', pl);
        case 'remove-roll-from-history':
            return removeFromState(state, 'rollHistory', pl);
        case 'archive-roll-history':
            return {
                ...state,
                archivedRolls: [...state.archivedRolls, ...state.rollHistory],
                rollHistory: []
            };
    }
    return state;
};

export default Dice;
