/**
 * @File contains the data of routes
 * 	like the actual routes array of this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import { RouteModel } from './Models';
import { generateId } from '../Source/Miscellaneous/functions';

/**
 * routes of this app
 */
export const routesConfiguration = [
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'dashboard',
        path: ['/', 'dashboard'],
        exact: true,
        component: <p>Dashboard</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'map',
        path: ['/map'],
        component: <p>Map</p>
    },
    {
        ...new RouteModel(),
        key: 'character_sheet',
        id: generateId(),
        path: ['/character-sheet'],
        component: <p>CharacterSheet</p>
    },
    {
        ...new RouteModel(),
        key: 'looter',
        id: generateId(),
        path: ['/looter'],
        component: <p>Looter</p>
    },
    {
        /**
         * subpages of this route
         * - Bestiary
         * - Minerals
         * - FloraAndFauna
         * - Creations / Crafting recipes
         */
        ...new RouteModel(),
        id: generateId(),
        key: 'lexicon',
        path: ['/lexicon'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'lexicon/lexicon',
        path: ['/lexicon/bestiary'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'lexicon/minerals',
        path: ['/lexicon/minerals'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'lexicon/flora_fauna',
        path: ['/lexicon/flora-fauna'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'lexicon/crafting',
        path: ['/lexicon/crafting'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        key: 'settings',
        path: ['/settings'],
        component: <p>Settings</p>
    }
];
