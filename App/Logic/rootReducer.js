/**
 * @File combines all reducers in this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import { combineReducers } from 'redux';

import meta from './states/meta/reducer.js';
import tempData from './states/tempdata/reducer.js';

import monster from './states/monster/reducer.js';
import powerRank from './states/powerrank/reducer.js';
import rarity from './states/rarity/reducer.js';

const reducers = {
    meta,
    tempData
};

export default !Object.keys(reducers).length
    ? () => {}
    : combineReducers(reducers);
