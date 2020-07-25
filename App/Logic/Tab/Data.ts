/**
 * @File content tab data
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { generateId } from '../Miscellaneous/Functions';

import { TabProps } from './Interfaces';
import { TComponentA, TComponentB, TComponentC } from './TestComponentData';

export const Tabs: Array<TabProps> = [
    {
        id: generateId(),
        routeKey: 'dashboard',
        items: [TComponentA, TComponentB, TComponentC]
    }
];
