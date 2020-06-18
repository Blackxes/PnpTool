/**
 * @File equation builder logic
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';
import store from './Logic/store';

import { Provider } from 'react-redux';
import Root from './Components/Root';

import styles from './Assets/app.scss';

if (process.env.NODE_ENV === 'development') {
    import('./Assets/debug.scss');
}

ReactDom.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);

// Fixme: check duplicated 'name' properties in FlatData
