import React from 'react';
import styled from 'styled-components';
import Routes from './routes';

const Wrapper = styled.div`
    padding: 10px;
    border: 3px dashed forestgreen;
`;

export default () => {
    return <Wrapper>
        <div>Micro-frontend 1</div>
        <Routes/>
    </Wrapper>;
}