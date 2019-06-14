import React from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const Wrapper = styled.div`
  background:#fff;
  position:fixed;
  z-index:9999;
  top:0;
  left:0;
  width:100%;
  height:100%;
  flex-flow:column nowrap;
  display:flex;
  align-items:center;
  justify-content:center;
  p {
    margin-top:8px;
    font-size:.9em;
    letter-spacing:.5px;
    color:${variablesCSS.darkGray}
  }
`

const Spinner = styled.div`
  margin-right:8px;
  border: 4px solid ${variablesCSS.gray};
  border-radius: 50%;
  border-top: 4px solid ${variablesCSS.blue};
  width: 100px;
  height: 100px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
  @keyframes lds-ripple {
  0% {
    top: 112px;
    left: 112px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 232px;
    height: 232px;
    opacity: 0;
  }
}

`

const Loader = () => {
  return (
    <Wrapper>
      <Spinner></Spinner>
      <p>Ładowanie strony</p>
    </Wrapper>
  )
}

export default Loader;
