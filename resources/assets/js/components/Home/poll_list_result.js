import React from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom:10px;
  }
`

const Bar = styled.div`
  position:relative;
  background:${variablesCSS.gray};
  border-radius:6px;
  min-height:22px;
  overflow:hidden;
  color:#fff;
  &:before {
    content:'';
    position:absolute;
    left:0;
    width: ${props => props.width};
    height:100%;
    background:#00529f;
    z-index:9;
  }
`

const Amount = styled.span`
  display:block;
  z-index:999;
  position:absolute;
  left:10px;
  top:49.8%;
  transform:translateY(-50%);
  font-size:.85em;
  color:${props => props.default || '#ffffff'};
`

const Question = styled.span`
  display:block;
  margin-bottom:3px;
  font-size:.9em;
`

const PollListResult = props => {
  const { amount } = props;
  const { answers_count, answer } = props.data;
  const barPercent = (answers_count * 100) / amount;

  return (
    <ListItem>
      <Question>{answer}</Question>
      <Bar width={`${barPercent}%`} title={`${answers_count} odpowiedzi`}>
        {
          answers_count !== 0
          ? <Amount>{barPercent.toFixed(1)}%</Amount>
          : <Amount default='#1e1e1e'>{answers_count}</Amount>
        }
      </Bar>
    </ListItem>
  )
}

export default PollListResult
