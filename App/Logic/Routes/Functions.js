/**
 * @File functions regarding the routes
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { routesConfiguration } from './Data';

export const findRoute = (key, value) =>
    routesConfiguration.find((r) => r[key] == value);
export const getRoute = (id) => findRoute('id', id);
