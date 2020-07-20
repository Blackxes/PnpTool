/**
 * @File contains models for the content configuration
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

const ContentItemModel = class {
    constructor() {
        /**
         * unique identifier
         *
         * @var string
         */
        this.id = '';

        /**
         * component which will be rendered when route matches
         *
         * @var React.Component
         */
        this.component = null;

        /**
         * route of this content item
         *
         * @var string
         */
        this.route = '';
    }
};
