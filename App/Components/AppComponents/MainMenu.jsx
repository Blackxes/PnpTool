/**
 * @File apps main menu
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';

import { BuildMenuTree } from '../../Logic/Menu/Functions';

import Menu from '../SystemComponents/Menu/Menu';

// component
const MainMenu = () => {
    return <Menu menuKey="main_menu" />;
};

export default MainMenu;
