import React from 'react';
import styled from 'styled-components';
import Routes from './routes';

const Wrapper = styled.div`
    font-size: 20px;
    border: 3px dashed teal;
`;

export default () => {
    return <Wrapper>
        <Routes/>
    </Wrapper>;
}