/**
 * @File side menu component of this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Menu, { StyledMenuItem } from '../SystemComponents/Menu/Menu';
export var StyledSideMenu = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
export var StyledEasterEgg = styled(StyledMenuItem)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding: 10px 15px;\n    color: transparent;\n    &:hover {\n        color: inherit;\n        background: transparent;\n    }\n"], ["\n    padding: 10px 15px;\n    color: transparent;\n    &:hover {\n        color: inherit;\n        background: transparent;\n    }\n"])));
var SideMenu = function (_a) {
    var parentMenuKey = _a.parentMenuKey;
    var location = useLocation();
    console.log(location);
    return (React.createElement(StyledSideMenu, null,
        React.createElement(StyledEasterEgg, null, "Leberwurst"),
        React.createElement(Menu, { parentMenuKey: true, vertical: true, menuKey: "main_menu" })));
};
export default SideMenu;
var templateObject_1, templateObject_2;
