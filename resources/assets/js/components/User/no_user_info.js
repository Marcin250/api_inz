import React from 'react';
import styled from 'styled-components';
import { FaUserAltSlash } from "react-icons/fa";

const Wrapper = styled.div`
  text-align:center;
  margin:0 auto;
  color:#d8d8d8;
  svg {
    font-size:6.5em;
  }
  p {
    font-size: 1.15em;
    font-family:'AvenirLTD';
  }
`

const NoUser = props => {
  return (
    <Wrapper>
      <FaUserAltSlash />
      <p>no user data</p>
    </Wrapper>
  )
}

export default NoUser;
