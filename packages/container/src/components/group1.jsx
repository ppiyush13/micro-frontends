import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {FlexBox} from 'react-styled-flex';

window.MICROFRONT_END_BASE_URL_MF1 = 'http://localhost:9001/';
window.MICROFRONT_END_BASE_URL_MF2 = 'http://localhost:19002/';

const Load = async (dep) => {
    const response = await fetch(dep);
    const content = await response.text();

    console.time('parseJs');
    const js = parseJs(content);
    console.timeEnd('parseJs');
    const module = await js.default();
    //debugger
    return module;
    console.log();
    //const App = require('./src/App.jsx');
    //__webpack_require__('LEAVED-chunk');

    /* console.time('evalJs');
    const js1 = evalJs(content);
    console.timeEnd('evalJs'); */

    //return 'Some ';
};

const parseJs = content => new Function('return ' + content).call();
const evalJs = content => eval(content);

//Load('http://localhost:9001/main.js');
const MicroFrontend1 = lazy(() => Load('http://localhost:9001/main.js'));
//const MicroFrontend2 = lazy(() => Load('http://localhost:19002/mf-bundle.js'));
const Loading = () => 'Loading...';

export default () => {
    return <FlexBox column gap={20} padding={20}>
        <div>Group 1</div>
        <MicroFrontend1/>
    </FlexBox>
}