import React from 'react';
import styled from 'styled-components';
import { selectedPollAnswer } from '../../actions/';
import { connect } from 'react-redux';

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom:10px;
  }
`

const Input = styled.input`
  display:none;
  &:checked ~ label:after {
    content:"";
    z-index:1;
    position:absolute;
    color:white;
    font-size:.9em;
    top:6px;
    left:6px;
    width:6px;
    height:6px;
    border-radius:50%;
    background:#00529f;
  }
  &:checked ~ label:before {
    border:3px solid #00529f;
  }
`

const Label = styled.label`
  display:block;
  cursor:pointer;
  position:relative;
  padding-left:25px;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:12px;
    height:12px;
    border-radius:50%;
    border:3px solid #e1e1e1;
  }
`

const PollListQuestion = props => {
  const { answer, idsurveyset } = props.data;

  return (
    <ListItem onClick={ () => props.selectedPollAnswer(idsurveyset) }>
      <Input type='radio' id={ idsurveyset } name='ans' />
      <Label htmlFor={ idsurveyset }>{ answer }</Label>
    </ListItem>
  )
}

export default connect(null, {selectedPollAnswer})(PollListQuestion);
