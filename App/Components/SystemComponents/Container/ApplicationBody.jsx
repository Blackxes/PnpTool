/**
 * @File the area where the main content of the app lies
 * 	this includes everything!
 *
 * 	there is another Component called ApplicationContent
 * 	this component takes care of content only
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled from 'styled-components';

import MainMenu from '../../AppComponents/MainMenu';
import SideMenu from '../../AppComponents/SideMenu';

const StyledApplicationBody = styled.main`
    display: flex;
`;

const ApplicationBody = () => {
    return (
        <StyledApplicationBody>
            <SideMenu />
            <MainMenu menuKey="main_menu" />
        </StyledApplicationBody>
    );
};

export default ApplicationBody;
