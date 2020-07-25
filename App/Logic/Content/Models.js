/**
 * @File contains models for the content configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

/**
 * item model for the content configuration
 */
const ContentItemModel = class {
    constructor() {
        /**
         * unique identifier
         *
         * @var {string}
         */
        this.id = '';

        /**
         * components which will be rendered when route matches
         *
         * @var {React.Component | Array<React.Component>}
         */
        this.component = [];

        /**
         * route of this content item
         *
         * @var {string}
         */
        this.route = '';

        /**
         * specific title for this route
         * when not defined the system tries to get the title from the menu configuration
         *
         * @var {string}
         */
        this.title = '';
    }
};
