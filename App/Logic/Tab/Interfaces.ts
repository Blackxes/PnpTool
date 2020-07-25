/**
 * @File interfaces of tabs
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

export interface TabProps {
    id: string;
    routeKey: string;
    key?: string;
    items: Array<React.Component | React.FunctionComponent>;
}
