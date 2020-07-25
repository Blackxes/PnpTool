/**
 * @File interfaces for application route objects
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { RouteProps } from 'react-router-dom';

export interface RouteConfigurationItemProps extends RouteProps {
    id: string;
    key: string;
    title?: string;
}
