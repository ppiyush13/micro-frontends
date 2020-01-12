import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import * as Styled from 'styled-components';
import * as ReactRouter from 'react-router-dom';
import * as LoadJs from 'loadjs'

ReactDOM.render(<App/>, document.getElementById('root'));

window['react'] = React;
window['StyledComponents'] = Styled;
window['ReactRouter'] = ReactRouter;
window['loadjs'] = LoadJs;