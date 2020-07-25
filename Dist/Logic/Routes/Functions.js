/**
 * @File functions regarding the routes
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import { routesConfiguration } from './Data';
export var findRoute = function (key, value) {
    return routesConfiguration.find(function (r) { return r[key] == value; });
};
export var getRoute = function (id) { return findRoute('id', id); };
