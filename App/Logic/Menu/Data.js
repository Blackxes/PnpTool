/**
 * @File contains menu data like the main menu
 * 	or submenus of specific contexts
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

import {
    faHome as fasHome,
    faMapSigns as fasMapSigns,
    faUser as fasUser,
    faBoxes as fasBoxes,
    faBook as fasBook,
    faPaw as fasPaw,
    faGem as fasGem,
    faCogs as fasCogs,
    faSeedling as fasSeedling,
    faBorderNone as fasBorderNone
} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons';
import {
    MenuConfigModel,
    MenuGroupModel,
    MenuItemConfigModel,
    MenuItemModel
} from './Models';

/**
 * menu configurations
 */
export const menuConfigurations = {
    main_menu: {
        ...new MenuConfigModel(),
        items: [
            {
                ...new MenuItemConfigModel(),
                key: 'home',
                group: 'general',
                renderTitle: false
            },
            {
                ...new MenuItemConfigModel(),
                key: 'bestiary',
                group: 'general'
            },
            {
                ...new MenuItemConfigModel(),
                key: 'character_sheets',
                group: 'general'
            },
            // {
            //     ...new MenuItemConfigModel(),
            //     key: 'crafting',
            //     group: 'creation'
            // },
            {
                ...new MenuItemConfigModel(),
                key: 'map',
                parent: 'crafting'
            }
        ]
    }
};

/**
 * apps menu groups
 */
export const menuItems = [
    {
        ...new MenuItemModel(),
        title: 'Home',
        key: 'home',
        path: '/',
        icon: fasHome
    },
    {
        ...new MenuItemModel(),
        title: 'Dashboard',
        key: 'dashboard',
        path: '/dashboard',
        icon: fasBorderNone
    },
    {
        ...new MenuItemModel(),
        title: 'Map',
        key: 'map',
        path: '/map',
        icon: fasMapSigns
    },
    {
        ...new MenuItemModel(),
        title: 'Character Sheets',
        key: 'character_sheets',
        path: '/character-sheets',
        icon: fasUser
    },
    {
        ...new MenuItemModel(),
        title: 'Looter',
        key: 'looter',
        path: '/looter',
        icon: fasBoxes
    },
    {
        ...new MenuItemModel(),
        title: 'Lexicon',
        key: 'lexicon',
        path: '/lexicon',
        icon: fasBook
    },
    {
        ...new MenuItemModel(),
        title: 'Flora und Fauna',
        key: 'flora_fauna',
        path: '/flora-fauna',
        icon: fasSeedling
    },
    {
        ...new MenuItemModel(),
        title: 'Mineralien',
        key: 'minerals',
        path: '/minerals',
        icon: fasGem
    },
    {
        ...new MenuItemModel(),
        title: 'Bestiarium',
        key: 'bestiary',
        path: '/bestiary',
        icon: fasPaw
    },
    {
        ...new MenuItemModel(),
        title: 'Crafting',
        key: 'crafting',
        path: '/crafting',
        icon: farLightbulb
    },
    {
        ...new MenuItemModel(),
        title: 'Einstellungen',
        key: 'settings',
        path: '/settings',
        icon: fasCogs
    }
];

/**
 * menu group configurations
 */
export const menuGroupItems = [
    {
        ...new MenuGroupModel(),
        title: 'Allgemein',
        key: 'general'
    },
    {
        ...new MenuGroupModel(),
        title: 'Sammlung',
        key: 'collection'
    },
    {
        ...new MenuGroupModel(),
        title: 'Herstellung',
        key: 'creation'
    },
    {
        ...new MenuGroupModel(),
        title: 'Sonstiges',
        key: 'other'
    }
];
