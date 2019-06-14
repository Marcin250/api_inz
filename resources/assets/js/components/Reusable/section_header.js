import React from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const Header = styled.h3`
  display:inline-block;
  font-family:'RSBold';
  position:relative;
  z-index:1;
  margin: ${props => props.margin || 0};
  font-size:1.5em;
  @media only screen and (min-width: 480px) {
    font-size:1.8em;
  }
  &:after {
    content:'';
    position:absolute;
    z-index:-1;
    right:-10px;
    bottom:3px;
    background:${variablesCSS.yellow};
    height:20px;
    width:60px;
  }
`;

const SectionHeader = props => <Header margin={props.margin}>{props.children}</Header>
export default SectionHeader;
