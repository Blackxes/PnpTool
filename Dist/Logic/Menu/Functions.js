/**
 * @File contains function to create or manage menus
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
import _ from 'lodash';
import { keyifyString } from '../Source/Miscellaneous/functions';
import { MenuItemModel, MenuGroupModel } from './Models';
import { menuConfigurations, menuItems, menuGroupItems } from './Data';
/**
 * creates a menu item
 *
 * @param string title - the title of the item
 * @param string url - url of the item excluding the basename
 * @param object icon - the @fortawesome/ configuration of an icon
 *
 * @return object - the menu item configuration
 */
export var createMenuItem = function (title, url, icon) {
    if (!title)
        console.warn('Invalid title for MenuItem. Empty MenuItem created.');
    return __assign(__assign({}, new MenuItemModel()), { key: keyifyString(title), title: title,
        url: url,
        icon: icon });
};
/**
 * build an tree object based on the configuration found by the menuKey
 * pattern:
 *	[
 * 		groups: [
 * 			items: [
 * 				{
 * 					title: string,
 * 					key: string,
 * 					route: string,
 * 					itemOrder: int,
 * 					groupOrder: int,
 *					group: string
 * 					children: array
 * 				}
 * 			]
 * 		]
 *	]
 *
 * @param string menuName - identifier from where the menu configurations should be taken
 * @param string parent - parent of the level which should be built
 * 	when null the roots are being built
 *
 * @return array - the menu level
 */
export var buildMenuTree = function (menuKey, parent) {
    if (!_.has(menuConfigurations, menuKey))
        throw new Error("Menu " + menuKey + " not found");
    var menu = menuConfigurations[menuKey];
    if (menu.items.constructor !== Array) {
        throw new Error('MenuItems property has to be an array containing the menu items');
    }
    if (!menu.items.length)
        throw new Error('No menu item defined');
    // when no parent is given build the root
    // else the children
    var usedItems = !parent
        ? menu.items.filter(function (item) { return !item.parent; })
        : menu.items.filter(function (item) { return item.parent == parent; });
    var menuLevel = usedItems.reduce(function (level, current, index, array) {
        var _a;
        if (!current.key) {
            console.warn("No 'key' defined for menu item for menu '" + menuKey + "'. Can't refer to a menu item configuration in the menu items configuration without key");
            return level;
        }
        var menuConfig = menuItems.find(function (item) {
            return item.key == current.key;
        });
        if (!menuConfig) {
            console.warn("Menu key '" + current.key + "' not found in the menu items configuration for menu '" + menuKey + "'.");
            return level;
        }
        // const indexKey = current.group || "_";
        var group = menuGroupItems.find(function (group) { return group.key == current.group; });
        var children = menu.items.filter(function (item) { return item.parent == current.key; });
        level = _.merge(level, (_a = {},
            _a[current.key] = __assign(__assign(__assign({}, menuConfig), current), { order: current.order || 9999, group: group ? group : new MenuGroupModel(), children: !children.length
                    ? []
                    : buildMenuTree(menuKey, current.key) }),
            _a));
        return level;
    }, {});
    // sort by group order followed by the menu item order
    var sorted = _.sortBy(menuLevel, ['group.order', 'order']);
    var grouped = _.groupBy(sorted, 'group.key');
    // move group items into an "items" property and wrap the group into an object
    // to have its own "existance" and not just be a wrapper
    var movedGroup = _.map(grouped, function (items, key) {
        return __assign(__assign({}, menuGroupItems.find(function (group) { return group.key == key; })), { items: items });
    });
    return movedGroup;
};
