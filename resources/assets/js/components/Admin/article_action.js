import React, { Fragment } from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const Button = styled.button`
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  cursor:pointer;
  background:${variablesCSS.gray};
  outline:none;
  border-radius:${variablesCSS.radius};
  padding:8px 8px;
  margin:2px 6px 2px 0;
  border:none;
  svg {
    color:#fff !important;
  }
  &:hover {
    background:${variablesCSS.blue}
  }
`

const Text = styled.span`
  display:block;
  color:#fff;
`

const ActionButton = props => {
  return (
    <Button onClick={props.onClick} title={props.title} >
      <Fragment>
        { props.icon }
        <Text>{ props.name }</Text>
      </Fragment>
    </Button>
  )
}

export default ActionButton;
