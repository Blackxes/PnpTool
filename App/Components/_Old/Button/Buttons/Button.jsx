/**
 * @File base button component - can be used a regular button
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 5px 10px;
    background: #ccc;
    border-radius: 2px;

    width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
`;

/**
 * button component
 */
export const Button = ({ fullWidth, small, ...rest }) => {
    return <StyledButton type="button" fullWidth small {...rest} />;
};
