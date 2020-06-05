/**
 * @File equation builder logic
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import * as ReactDom from 'react-dom';

import Root from './Components/Root';

import styles from './Assets/root.scss';
import { Provider } from 'react-redux';
import store from './Logic/store';

ReactDom.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);
