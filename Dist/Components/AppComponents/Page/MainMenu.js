/**
 * @File apps main menu
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import Menu from '../SystemComponents/Menu/Menu';
// component
var MainMenu = function () {
    return React.createElement(Menu, { menuKey: "main_menu" });
};
export default MainMenu;
