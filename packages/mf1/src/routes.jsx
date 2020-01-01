import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

const DefaultComponent = lazy(() => import('./components/default'));
const EditComponent = lazy(() => import('./components/edit'));
const AddComponent = lazy(() => import('./components/add'));
const Loading = () => 'Loading...';

const Routes = ({match}) => {
    console.log(match);
    return <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path={`${match.url}/edit`} component={EditComponent}/>
                <Route path={`${match.url}/add`} component={AddComponent}/>
                <Route path= {match.url} component={DefaultComponent} />
            </Switch>
        </Suspense>
    </BrowserRouter>
}

export default withRouter(Routes);
