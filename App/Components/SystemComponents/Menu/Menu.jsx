/**
 * @File menu container for building a menu tree based on a configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buildMenuTree } from '../../../Logic/Menu/Functions';

// menu container
export const StyledMenuContainer = styled.div`
    display: flex;
    ${(props) =>
        props.vertical &&
        css`
            flex-direction: row;
        `}
`;

// menu title
export const StyledMenuTitle = styled.p`
    margin-bottom: 5px;
    padding: 5px 10px;
    background: transparent;
    font-size: 1.125rem;
`;

// menu group component
// Idea: group title above the items wrap
export const StyledMenuGroup = styled.div`
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
`;

// menu items wrap component
export const StyledMenuItems = styled.ul`
    display: inline-flex;
    ${(props) =>
        props.vertical &&
        css`
            flex-direction: row;
        `}
`;

// menu item component
export const StyledMenuItem = styled.li`
    & > * {
        padding: 10px 15px;
        display: flex;
        text-decoration: none;
    }
    &:hover {
        background: #b2bec3;
    }
`;

// menu container component
const Menu = ({ title, menuKey, parentKey, menuItems, vertical }) => {
    // menu items have higher priority
    const usedItems = menuItems?.length
        ? menuItems
        : buildMenuTree(menuKey, parentKey) || [];

    return (
        <StyledMenuContainer vertical>
            {title && <StyledMenuTitle>{title}</StyledMenuTitle>}
            {usedItems.map((group) => (
                <StyledMenuGroup key={group.key}>
                    <StyledMenuItems vertical>
                        {group.items.map((menuItem) => (
                            <StyledMenuItem key={menuItem.key}>
                                <NavLink
                                    to={menuItem.route}
                                    exact={menuItem.exact}
                                >
                                    {menuItem.renderPrefixArrow ? null : (
                                        <FontAwesomeIcon
                                            className="menu-title-prefix"
                                            icon={faAngleDoubleRight}
                                        />
                                    )}
                                    {menuItem.icon ? (
                                        <FontAwesomeIcon
                                            fixedWidth
                                            icon={menuItem.icon}
                                        />
                                    ) : null}
                                    {!menuItem.renderTitle ? null : (
                                        <p>{menuItem.title}</p>
                                    )}
                                </NavLink>
                            </StyledMenuItem>
                        ))}
                    </StyledMenuItems>
                </StyledMenuGroup>
            ))}
        </StyledMenuContainer>
    );
};

export default Menu;
