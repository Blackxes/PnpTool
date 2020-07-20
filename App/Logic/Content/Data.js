/**
 * @File contains the configuration what components are rendered on which route in this app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { findRoute } from '../Routes/Functions';

const Content = [
    {
        ...new ContentItemModel(),
        id: 'Aels8VkRHbFAykU2',
        route: findRoute('key', 'dashboard')?.route,
        component: <p>Content of Mainpage</p>
    }
];
