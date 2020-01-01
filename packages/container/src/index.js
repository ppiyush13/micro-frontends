import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import * as Styled from 'styled-components';
import * as ReactRouter from 'react-router-dom';

ReactDOM.render(<App/>, document.getElementById('root'));

window['react'] = React;
window['StyledComponents'] = Styled;
window['ReactRouter'] = ReactRouter;