import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Group1Component = lazy(() => import('./components/group1'));
const Group2Component = lazy(() => import('./components/group2'));
const Loading = () => 'Loading...';

export default () => {
    return <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route exact path="/" >
                    default route
                </Route>
                <Route path={'/group1'} component={Group1Component}/>
                <Route path={'/group2'} component={Group2Component}/>
            </Switch>
        </Suspense>
    </BrowserRouter>
}