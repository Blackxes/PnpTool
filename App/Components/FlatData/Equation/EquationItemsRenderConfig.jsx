/**
 * @File configuration for the different equation item views depending on the context
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import {
    EquationListItemEditAttribute,
    EquationListItemAttribute,
    EquationListItemNone
} from './EquationListItems';

const EquationItemsRenderConfig = {
    none: {
        editing: (props) => <EquationListItemNone {...props} />,
        listItem: (props) => <EquationListItemNone {...props} />
    },
    attribute: {
        editing: (props) => <EquationListItemEditAttribute {...props} />,
        listItem: (props) => <EquationListItemAttribute {...props} />
    },
    symbol: {
        editing: () => <p>Editing Symbol</p>,
        listItem: () => <p>ListItemView Symbol</p>
    },
    constant: {
        editing: () => <p>Editing Constant</p>,
        listItem: () => <p>ListItemView Constanst</p>
    },
    equation: {
        editing: () => <p>Editing Equation</p>,
        listItem: () => <p>ListItemView Equation</p>
    }
};
export default EquationItemsRenderConfig;
