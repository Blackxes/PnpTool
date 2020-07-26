/**
 * @File functions regarding the routes
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import { routesConfiguration } from './Data';
import { RouteGenerationConfigurationItem } from './Interfaces';

export const findRoute = (key, value) =>
    routesConfiguration.find((r) => r[key] == value);
export const getRoute = (id) => findRoute('id', id);

/**
 * generates the routes array based on the given configs
 */
type configItem = Array<RouteGenerationConfigurationItem>;
export const generateRoutes = (config: configItem) => {
    console.log(config);
};

export const createRouteGenerationConfigf;
