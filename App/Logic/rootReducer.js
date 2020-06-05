/**
 * @File combines all reducers in this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import { combineReducers } from 'redux';

import Dice from './Source/Dice/reducer';
import FlatData from './Source/FlatData/reducer';

const reducers = {
    Dice,
    FlatData
};

export default !Object.keys(reducers).length
    ? () => {}
    : combineReducers(reducers);
