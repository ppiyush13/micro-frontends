import React from 'react';
import styled from 'styled-components';
import Routes from './routes';

const Wrapper = styled.div`
    padding: 10px;
    border: 3px dashed firebrick;
`;

export default () => {
    return <Wrapper>
        <div>Micro-frontend 2</div>
        <Routes/>
    </Wrapper>;
}