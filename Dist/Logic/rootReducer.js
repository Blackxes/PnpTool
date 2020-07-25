/**
 * @File combines all reducers in this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */
import { combineReducers } from 'redux';
import Debug from './Source/Debug/reducer';
import Dice from './Source/Dice/reducer';
import FlatData from './Source/FlatData/reducer';
var reducers = {
    Dice: Dice,
    FlatData: FlatData
};
if (process.env.NODE_ENV == 'development') {
    reducers.Debug = Debug;
}
export default !Object.keys(reducers).length ? function () { } : combineReducers(reducers);
