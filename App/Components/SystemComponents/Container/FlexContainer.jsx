/**
 * @File listing component which uses css flex to list components.. yeah..
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled, { css } from 'styled-components';

const StyledFlexContainer = styled.div`
    display: flex;
    ${(props) =>
        props.vertical &&
        css`
            flex-direction: column;
        `}
`;

const FlexContainer = (props) => {
    return <StyledFlexContainer {...props} />;
};

export default FlexContainer;
