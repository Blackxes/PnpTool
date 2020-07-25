/**
 * @File contains the data of routes
 * 	like the actual routes array of this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import * as React from 'react';

import { generateId } from '../Source/Miscellaneous/functions';
import { RouteConfigurationItemProps } from './Interfaces';
import Dashboard from '../../Components/AppComponents/Dashboard';
import Randomizer from '../../Components/AppComponents/Randomizer';

/**
 * routes of this app
 */
export const routesConfiguration: Array<RouteConfigurationItemProps> = [
    {
        id: generateId(),
        key: 'dashboard',
        path: ['/', 'dashboard'],
        exact: true,
        component: Dashboard
    },
    {
        id: generateId(),
        key: 'Randomizer',
        path: ['randomizer'],
        component: Randomizer
    }
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'map',
    //     path: ['/map'],
    //     component: <p>Map</p>
    // },
    // {
    //     ...new RouteModel(),
    //     key: 'character_sheet',
    //     id: generateId(),
    //     path: ['/character-sheet'],
    //     component: <p>CharacterSheet</p>
    // },
    // {
    //     ...new RouteModel(),
    //     key: 'looter',
    //     id: generateId(),
    //     path: ['/looter'],
    //     component: <p>Looter</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'lexicon',
    //     path: ['/lexicon'],
    //     component: <p>Lexikon</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'lexicon/lexicon',
    //     path: ['/lexicon/bestiary'],
    //     component: <p>Lexikon</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'lexicon/minerals',
    //     path: ['/lexicon/minerals'],
    //     component: <p>Lexikon</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'lexicon/flora_fauna',
    //     path: ['/lexicon/flora-fauna'],
    //     component: <p>Lexikon</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'lexicon/crafting',
    //     path: ['/lexicon/crafting'],
    //     component: <p>Lexikon</p>
    // },
    // {
    //     ...new RouteModel(),
    //     id: generateId(),
    //     key: 'settings',
    //     path: ['/settings'],
    //     component: <p>Settings</p>
    // }
];
