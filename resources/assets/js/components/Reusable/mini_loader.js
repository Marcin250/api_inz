import React from 'react';
import variablesCSS from '../../css/variables';
import styled from 'styled-components';

const Spinner = styled.div`
  display:block;
  margin-right:8px;
  border: 4px solid ${variablesCSS.gray};
  border-radius: 50%;
  border-top: 4px solid ${variablesCSS.blue};
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Wrapper = styled.div`
  margin-top: ${props => props.margin ? `${props.margin}px` : '0'};
  display:flex;
  flex:1 1 100%;
  flex-flow:column nowrap;
  align-items:center;
  justify-content:center;
  p {
    margin-top:8px;
    font-size:.9em;
    letter-spacing:.5px;
    color:${variablesCSS.darkGray}
  }
`

const MiniLoader = props => {
  return (
    <Wrapper margin={props.margin}>
      <Spinner />
      <p>Wczytywanie</p>
    </Wrapper>
  )
}

export default MiniLoader;
