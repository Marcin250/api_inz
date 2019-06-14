import React from 'react';
import styled from 'styled-components';
import MiniLoader from './mini_loader';
import variableCSS from '../../css/variables';

const Btn = styled.button`
  border-radius:6px;
  border:none;
  cursor:pointer;
  padding:10px 20px;
  outline:none;
  margin: ${props => props.margin ? props.margin : '0 6px'};
  min-width:${props => props.minWidth ? '105px' : 'initial'};
  width: ${props => props.fullWidth ? '100%' : 'initial'};
  color:${props => props.warning || props.blue ? '#ffffff' : 'rgb(119, 119, 119)'};
  background:${props => props.warning ? `${variableCSS.yellow}` : props.blue ? `${variableCSS.blue}` : 'default'};
`

const Spinner = styled.div`
    text-align: center;
  > div {
    margin:0 1px;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bounce 1.4s infinite ease-in-out both;
    animation: bounce 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @keyframes bounce {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`

const Button = props => {
  const { isFetching } = props;

  return (
      isFetching ?
      (
        <Btn
          warning={props.warning}
          minWidth={props.minWidth}
          fullWidth={props.fullWidth}
          blue={props.blue}
          margin={props.margin}>
          <Spinner>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </Spinner>
        </Btn>
      ) : (
        <Btn
          fullWidth={props.fullWidth}
          type='button'
          onClick={props.onClick}
          blue={props.blue}
          warning={props.warning}
          minWidth={props.minWidth}
          margin={props.margin}
        >{props.name}</Btn>
      )
  )
}

export default Button;
