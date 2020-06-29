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

import './Assets/app.scss';
import { generateId } from './Logic/Source/Miscellaneous/functions';

if (process.env.NODE_ENV === 'development') {
    import('./Assets/debug.scss');
}

console.group('Random Hash Ids');
console.log(generateId());
console.log(generateId());
console.log(generateId());
console.log(generateId());
console.log(generateId());
console.groupEnd();

ReactDom.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);

// Fixme: check duplicated 'name' properties in FlatData
