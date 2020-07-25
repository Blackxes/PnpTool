/**
 * @File equation builder logic
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import store from './Logic/store';
import { generateId } from './Logic/Source/Miscellaneous/functions';
import App from './Components/App';
import GlobalStyle from './GlobalStyle';
// const doc = new GoogleSpreadsheet(
//     '1hr1UF0CWXwdk2DpyALGOaZXGjGtny1y8TaWEFnCycF0'
// );
console.group('Random Hash Ids');
for (var i = 0; i < 5; i++)
    console.log(generateId());
console.groupEnd();
render(React.createElement(Provider, { store: store },
    React.createElement(GlobalStyle, null),
    React.createElement(StyleSheetManager, { disableVendorPrefixes: true },
        React.createElement(App, null))), document.getElementById('app'));
