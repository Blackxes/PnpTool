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
    padding: 10px 15px;
    color: transparent;
    &:hover {
        color: inherit;
        background: transparent;
    }
`;

const SideMenu = ({ parentMenuKey }) => {
    const location = useLocation();

    console.log(location);

    return (
        <StyledSideMenu>
            <StyledEasterEgg>Leberwurst</StyledEasterEgg>
            <Menu vertical parentMenuKey={parentMenuKey} menuKey="main_menu" />
        </StyledSideMenu>
    );
};

export default SideMenu;
