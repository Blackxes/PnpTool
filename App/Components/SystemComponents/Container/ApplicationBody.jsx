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

import SideMenu from '../../AppComponents/SideMenu';
import ContentTabs from '../../AppComponents/ContentTabs';
import FlexContainer from './FlexContainer';

import { getMenuItems } from '../../../Logic/Menu/Functions';

const StyledApplicationBody = styled.main`
    display: flex;
`;

const ApplicationBody = ({ path, component }) => {
    // path information
    const currentMenuItem = getMenuItems().find((item) => {
        return path.some((pitem) => pitem == item.path);
    });

    return (
        <StyledApplicationBody>
            {currentMenuItem != undefined && (
                <SideMenu
                    menuKey="main_menu"
                    parentMenuKey={currentMenuItem?.key}
                />
            )}
            <FlexContainer vertical>
                <ContentTabs path={path} />
                {() => component || null}
            </FlexContainer>
        </StyledApplicationBody>
    );
};

export default ApplicationBody;
