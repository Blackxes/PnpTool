/**
 * @File contains menu data like the main menu
 * 	or submenus of specific contexts
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
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
import { faHome as fasHome, faMapSigns as fasMapSigns, faUser as fasUser, faBoxes as fasBoxes, faBook as fasBook, faPaw as fasPaw, faGem as fasGem, faCogs as fasCogs, faSeedling as fasSeedling, faBorderNone as fasBorderNone } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons';
import { MenuConfigModel, MenuGroupModel, MenuItemConfigModel, MenuItemModel } from './Models';
/**
 * menu configurations
 */
export var menuConfigurations = {
    main_menu: __assign(__assign({}, new MenuConfigModel()), { items: [
            __assign(__assign({}, new MenuItemConfigModel()), { key: 'home', group: 'general', renderTitle: false }),
            __assign(__assign({}, new MenuItemConfigModel()), { key: 'bestiary', group: 'general' }),
            __assign(__assign({}, new MenuItemConfigModel()), { key: 'character_sheets', group: 'general' }),
            __assign(__assign({}, new MenuItemConfigModel()), { key: 'map', parent: 'crafting' })
        ] })
};
/**
 * apps menu groups
 */
export var menuItems = [
    __assign(__assign({}, new MenuItemModel()), { title: 'Home', key: 'home', route: '/', icon: fasHome }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Dashboard', key: 'dashboard', route: '/dashboard', icon: fasBorderNone }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Map', key: 'map', route: '/map', icon: fasMapSigns }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Character Sheets', key: 'character_sheets', route: '/character-sheets', icon: fasUser }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Looter', key: 'looter', route: '/looter', icon: fasBoxes }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Lexicon', key: 'lexicon', route: '/lexicon', icon: fasBook }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Flora und Fauna', key: 'flora_fauna', route: '/flora-fauna', icon: fasSeedling }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Mineralien', key: 'minerals', route: '/minerals', icon: fasGem }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Bestiarium', key: 'bestiary', route: '/bestiary', icon: fasPaw }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Crafting', key: 'crafting', route: '/crafting', icon: farLightbulb }),
    __assign(__assign({}, new MenuItemModel()), { title: 'Einstellungen', key: 'settings', route: '/settings', icon: fasCogs })
];
/**
 * menu group configurations
 */
export var menuGroupItems = [
    __assign(__assign({}, new MenuGroupModel()), { title: 'Allgemein', key: 'general' }),
    __assign(__assign({}, new MenuGroupModel()), { title: 'Sammlung', key: 'collection' }),
    __assign(__assign({}, new MenuGroupModel()), { title: 'Herstellung', key: 'creation' }),
    __assign(__assign({}, new MenuGroupModel()), { title: 'Sonstiges', key: 'other' })
];
