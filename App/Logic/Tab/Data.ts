/**
 * @File content tab data
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { generateId } from '../Miscellaneous/Functions';

import { TabProps } from './Interfaces';
import { TComponentA, TComponentB, TComponentC } from './TestComponentData';
import { DashboardKey } from '../GlobalKeys';

export const Tabs: Array<TabProps> = [
    {
        id: generateId(),
        routeKey: DashboardKey,
        items: [TComponentA, TComponentB, TComponentC]
    }
];
