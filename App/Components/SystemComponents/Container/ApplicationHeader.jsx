/**
 * @File main header of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled from 'styled-components';

import AppTitle from '../AppTitle';

const StyledApplicationHeader = styled.header`
    padding-top: 30px;
    border-top: 5px solid #fdcb6e;
`;

// component
const ApplicationHeader = ({ title }) => {
    return (
        <StyledApplicationHeader>
            <AppTitle title="Daaaaaamnn" />
        </StyledApplicationHeader>
    );
};

export default ApplicationHeader;
