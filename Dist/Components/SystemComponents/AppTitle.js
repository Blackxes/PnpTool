/**
 * @File the h1 app title
 * 	considers the current route and possible render options like icons
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { menuItems } from '../../Logic/Menu/Data';
var StyledAppTitleWrap = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    // margin: 0 15px 15px;\n    padding: 15px 250px;\n    display: flex;\n    align-items: center;\n    color: #dfe6e9;\n    background: #2d3436;\n    & > * {\n        margin-right: 15px;\n        &:last-child {\n            margin-right: 0;\n        }\n    }\n"], ["\n    // margin: 0 15px 15px;\n    padding: 15px 250px;\n    display: flex;\n    align-items: center;\n    color: #dfe6e9;\n    background: #2d3436;\n    & > * {\n        margin-right: 15px;\n        &:last-child {\n            margin-right: 0;\n        }\n    }\n"])));
var StyledAppLogo = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-size: 20px;\n"], ["\n    font-size: 20px;\n"])));
var StyledAppTitle = styled.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    margin-bottom: 0;\n"], ["\n    margin-bottom: 0;\n"])));
var AppTitle = function (_a) {
    var title = _a.title;
    var location = useLocation();
    var menuItem = (menuItems === null || menuItems === void 0 ? void 0 : menuItems.length) &&
        menuItems.find(function (item) {
            if (!item.route)
                return false;
            if (item.route.constructor === Array)
                return item.route.some(function (route) { return route == location.pathname; });
            return item.route == location.pathname;
        });
    return (React.createElement(StyledAppTitleWrap, null,
        menuItem && menuItem.icon && menuItem.showInHeader ? (React.createElement(StyledAppLogo, null,
            React.createElement(FontAwesomeIcon, { icon: menuItem.icon }))) : null,
        React.createElement(StyledAppTitle, null, title)));
};
export default AppTitle;
var templateObject_1, templateObject_2, templateObject_3;
