/**
 * @File main header of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled from 'styled-components';

import AppTitle from '../AppTitle';
import MainMenu from '../../AppComponents/MainMenu';

const StyledApplicationHeader = styled.header`
    padding-top: 30px;
    border-top: 5px solid #fdcb6e;
`;

interface ApplicationHeaderProps {
    title?: string;
}

// component
const ApplicationHeader: React.FC<ApplicationHeaderProps> = (props) => {
    const { title } = props;

    return (
        <StyledApplicationHeader>
            <AppTitle title="Daaaaaamnn" />
            <MainMenu />
        </StyledApplicationHeader>
    );
};

export default ApplicationHeader;
