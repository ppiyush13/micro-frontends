import React from 'react';
import styled from 'styled-components';
import Routes from './routes';

const Wrapper = styled.div`
    border: 1px solid black;
`;

export default () => {
    return <Wrapper>
        <Routes/>
    </Wrapper>;
}