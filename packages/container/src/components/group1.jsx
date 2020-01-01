import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

window.MICROFRONT_END_BASE_URL_MF1 = 'http://localhost:19001/';
window.MICROFRONT_END_BASE_URL_MF2 = 'http://localhost:19002/';

const Load = async (dep) => {
    const response = await fetch(dep);
    const content = await response.text();

    console.time('parseJs');
    const js = parseJs(content);
    console.timeEnd('parseJs');

    /* console.time('evalJs');
    const js1 = evalJs(content);
    console.timeEnd('evalJs'); */

    return js;
};

const parseJs = content => new Function('return ' + content).call();
const evalJs = content => eval(content);

const MicroFrontend1 = lazy(() => Load('http://localhost:19001/mf-bundle.js'));
const MicroFrontend2 = lazy(() => Load('http://localhost:19002/mf-bundle.js'));
const Loading = () => 'Loading...';

export default () => {
    return <div>
        Group 1
        <MicroFrontend1/>
        <MicroFrontend2/>
    </div>
}