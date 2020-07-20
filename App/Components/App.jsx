/**
 * @File main entrance of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import ApplicationHeader from './SystemComponents/Container/ApplicationHeader';
import ApplicationBody from './SystemComponents/Container/ApplicationBody';

import { routesConfiguration } from '../Logic/Routes/Data';

const App = () => {
    const routes = routesConfiguration || [];

    return (
        <React.Fragment>
            <BrowserRouter>
                <ApplicationHeader />
                {routes.map((route) => (
                    <Route {...route}>
                        <ApplicationBody />
                    </Route>
                ))}
            </BrowserRouter>
        </React.Fragment>
    );
};

const toProps = (state) => ({});

const toDispatch = (dispatch) => ({});

export default connect(toProps, toDispatch)(App);
