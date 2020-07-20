/**
 * @File container component for dividing content
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled, { css } from 'styled-components';

import {
    ContainerMarginBottom,
    ContainerPadding,
    BackgroundColorDefault
} from '../Variables';

const StyledContainer = styled.div`
    margin-bottom: ${ContainerMarginBottom};
    padding: ${ContainerPadding};

    ${(props) =>
        props.box &&
        css`
            border: 1px solid ${BackgroundColorDefault};
        `}
`;

const Container = ({ ...props }) => {
    return <StyledContainer {...props} />;
};

export default Container;
