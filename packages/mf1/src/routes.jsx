import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import joinPath from 'join-path';

const DefaultComponent = lazy(() => import('./components/default'));
const EditComponent = lazy(() => import('./components/edit'));
const AddComponent = lazy(() => import('./components/add'));
const Loading = () => 'Loading...';

const Routes = ({match}) => {
    console.log(match);
    const matchUrl = match.url;
    return <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path={joinPath(matchUrl, 'edit')} component={EditComponent} />
                <Route path={joinPath(matchUrl, 'add')} component={AddComponent} />
                <Route path= {match.url} component={DefaultComponent} />
            </Switch>
        </Suspense>
    </BrowserRouter>
}

export default withRouter(Routes);
