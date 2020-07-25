/**
 * @File dice reducer
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { addToState, deleteFromState } from '../Miscellaneous/functions';
var initialState = {
    rangeMin: 0,
    rangeMax: 100,
    currentRollName: 'Unbenannt',
    selectedRoll: null,
    rollHistory: [],
    archivedRolls: []
};
var Dice = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, pl = _a.pl;
    switch (type) {
        case 'set-min-range':
            return __assign(__assign({}, state), { rangeMin: pl || 0 });
        case 'set-max-range':
            return __assign(__assign({}, state), { rangeMax: pl });
        case 'set-current-roll-name':
            return __assign(__assign({}, state), { currentRollName: pl || undefined });
        case 'set-selected-roll':
            return __assign(__assign({}, state), { selectedRoll: pl || undefined });
        case 'add-roll-to-history':
            return addToState(state, 'rollHistory', pl);
        case 'remove-roll-from-history':
            return deleteFromState(state, 'rollHistory', pl);
        case 'archive-roll-history':
            return __assign(__assign({}, state), { archivedRolls: __spreadArrays(state.archivedRolls, state.rollHistory), rollHistory: [] });
    }
    return state;
};
export default Dice;
