/**
 * @File basically the same as Menu but lists them as 'Tabs'
 * 	in order to separate content context's
 *
 * 	for example you have "AttributeManagement"
 * 	tabs would be 'Add', 'Listing', 'Users Attributes'
 */

import * as React from 'react';

import { buildMenuTree } from '../../Logic/Menu/Functions';

interface ContentTabsProps {
    menuKey: string;
    parentKey: string;
}

const ContentTabs: React.FC<ContentTabsProps> = (props) => {
    const menuItems =
        props.menuKey && buildMenuTree(props.menuKey, props.parentKey);

    return <pre>{JSON.stringify(menuItems, undefined, 2)}</pre>;
};

export default ContentTabs;
