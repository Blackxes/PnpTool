/**
 * @File main entrance of the app
 *
 * @Author Alexander Bassov
 * @Email blackxes.dev@gmail.com
 */

import * as React from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import ApplicationHeader from './SystemComponents/Container/ApplicationHeader';
// import ApplicationBody from './SystemComponents/Container/ApplicationBody';

// import { routesConfiguration } from '../Logic/Routes/Data';
// import { generateRoutes } from '../Logic/Routes/Functions';
import { generateMenuRouteConfiguration } from '../Logic/Menu/Functions';

const App = () => {
    const menuRoutes = generateMenuRouteConfiguration('main_menu', 'dashboard');

    return <p>Apfel</p>;

    // return (
    //     <React.Fragment>
    //         <BrowserRouter>
    //             <ApplicationHeader />
    //             <Switch>
    //                 {routes.map((route) => (
    //                     <Route {...route}>
    //                         <ApplicationBody {...route} />
    //                     </Route>
    //                 ))}
    //             </Switch>
    //         </BrowserRouter>
    //     </React.Fragment>
    // );
};

// const toProps = (state) => ({});

// const toDispatch = (dispatch) => ({});

// export default connect(toProps, toDispatch)(App);
export default App;
