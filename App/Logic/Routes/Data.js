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
        id: generateId(),
        path: ['/character-sheet'],
        component: <p>CharacterSheet</p>
    },
    {
        ...new RouteModel(),
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
        path: ['/lexicon'],
        component: <p>Lexikon</p>
    },
    {
        ...new RouteModel(),
        id: generateId(),
        path: ['/settings'],
        component: <p>Settings</p>
    }
];
