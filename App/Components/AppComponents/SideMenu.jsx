/**
 * @File side menu component of this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Menu, { StyledMenuItem } from '../SystemComponents/Menu/Menu';

export const StyledSideMenu = styled.div``;

export const StyledEasterEgg = styled(StyledMenuItem)`
	padding: 
    color: transparent;
`;

const SideMenu = () => {
    const location = useLocation();

    const currentMenuKey = location.pathname;

    console.log(location);

    return (
        <StyledSideMenu>
            <StyledEasterEgg>Easteregg.. Juhuuu</StyledEasterEgg>
            <Menu parentKey vertical menuKey="main_menu" />
        </StyledSideMenu>
    );
};

export default SideMenu;
