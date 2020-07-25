/**
 * @File menu container for building a menu tree based on a configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buildMenuTree } from '../../../Logic/Menu/Functions';
// menu container
export var StyledMenuContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    ", "\n"], ["\n    display: flex;\n    ",
    "\n"])), function (props) {
    return props.vertical && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            flex-direction: row;\n        "], ["\n            flex-direction: row;\n        "])));
});
// menu title
export var StyledMenuTitle = styled.p(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-bottom: 5px;\n    padding: 5px 10px;\n    background: transparent;\n    font-size: 1.125rem;\n"], ["\n    margin-bottom: 5px;\n    padding: 5px 10px;\n    background: transparent;\n    font-size: 1.125rem;\n"])));
// menu group component
// Idea: group title above the items wrap
export var StyledMenuGroup = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    margin-right: 10px;\n    &:last-child {\n        margin-right: 0;\n    }\n"], ["\n    margin-right: 10px;\n    &:last-child {\n        margin-right: 0;\n    }\n"])));
// menu items wrap component
export var StyledMenuItems = styled.ul(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    display: inline-flex;\n    ", "\n"], ["\n    display: inline-flex;\n    ",
    "\n"])), function (props) {
    return props.vertical && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            flex-direction: column;\n        "], ["\n            flex-direction: column;\n        "])));
});
// menu item component
export var StyledMenuItem = styled.li(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    &:hover {\n        background: #b2bec3;\n    }\n"], ["\n    &:hover {\n        background: #b2bec3;\n    }\n"])));
export var StyledNavLink = styled(NavLink)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    padding: 10px 15px;\n    display: flex;\n    text-decoration: none;\n    & > * {\n        margin-right: 10px;\n        &:last-child {\n            margin-right: 0;\n        }\n    }\n"], ["\n    padding: 10px 15px;\n    display: flex;\n    text-decoration: none;\n    & > * {\n        margin-right: 10px;\n        &:last-child {\n            margin-right: 0;\n        }\n    }\n"])));
// menu container component
var Menu = function (_a) {
    var title = _a.title, menuKey = _a.menuKey, parentKey = _a.parentKey, menuItems = _a.menuItems, vertical = _a.vertical;
    // menu items have higher priority
    var usedItems = (menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) ? menuItems
        : buildMenuTree(menuKey, parentKey) || [];
    return (React.createElement(StyledMenuContainer, { vertical: vertical },
        title && React.createElement(StyledMenuTitle, null, title),
        usedItems.map(function (group) { return (React.createElement(StyledMenuGroup, { key: group.key },
            React.createElement(StyledMenuItems, { vertical: vertical }, group.items.map(function (menuItem) { return (React.createElement(StyledMenuItem, { key: menuItem.key },
                React.createElement(StyledNavLink, { to: menuItem.route, exact: menuItem.exact },
                    menuItem.renderPrefixArrow ? null : (React.createElement(FontAwesomeIcon, { className: "menu-title-prefix", icon: faAngleDoubleRight })),
                    menuItem.icon ? (React.createElement(FontAwesomeIcon, { fixedWidth: true, icon: menuItem.icon })) : null,
                    !menuItem.renderTitle ? null : (React.createElement("p", null, menuItem.title))))); })))); })));
};
export default Menu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
