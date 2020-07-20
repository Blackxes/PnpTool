/**
 * @File contains the models in the context of routing
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmx.de
 */

export const RouteModel = class {
    constructor() {
        /**
         * route id to identify it via unique id
         *
         * @var string
         */
        this.id = '';

        /**
         * simple key to identify as human
         * this value is mostly there to reference a route by 'name'
         * and get its instance
         *
         * @var string
         */
        this.key = '';

        /**
         * route pathing
         * either a single route or an array of routes
         * the paths can contain placeholder
         *
         * @see path in <Route />
         *
         * @var string
         */
        this.path = '';

        /**
         * defines whether this route has to match exactly
         * the current url
         *
         * @see exact in <Route />
         *
         * @var bool
         */
        this.exact = true;

        /**
         * component of this route
         *
         * @see component in <Route />
         *
         * @var React.Component
         */
        this.component = null;
    }
};
