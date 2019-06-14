import React from 'react';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';
import PollListResult from '../Home/poll_list_result';
import { FaQuestionCircle } from "react-icons/fa";

const Container = styled.section`
  display:flex;
  justify-content:flex-start;
  flex-flow: row wrap;
`

const List = styled.ul`
  margin:25px 20px;
  list-style-type: none;
`

const Column = styled.div`
  background:#fff;
  margin:20px;
  align-self: flex-start;
  &:last-child {
    width:100%;
  }
`

const Topic = styled.span`
  display:block;
`

const SubTopic = styled.span`
  font-size:.7em;
  letter-spacing:.35px;
  font-family:${variablesCSS.categoryFont};
  text-transform: uppercase;
`

const Header = styled.div`
  margin-bottom:1px;
  padding:15px 20px;
  background:${variablesCSS.gray};
`

const PollData = props => {
  const { poll } = props;
  const sumAnswerCount =
    poll.answers
    .map(({answers_count}) => answers_count)
    .reduce((prevValue, currentValue) => prevValue + currentValue);

  return (
    <Container>
      <Column>
        <Header>
          <SubTopic>Aktualna ankieta</SubTopic>
          <Topic>{poll.topic}</Topic>
        </Header>
        <List>
        {
          poll.answers.map(
            item => {
              return <PollListResult
                key={ item.idsurveyset }
                data={ item }
                amount={ sumAnswerCount }
              />
            }
          )
        }
        </List>
      </Column>
      <Column>
        <Header>
          <SubTopic>Statystki</SubTopic>
          <Topic>Podstawowe informacje o ankiecie</Topic>
        </Header>
        <List>
          <li>Dodano: 02.06.2019</li>
          <li>Oddanych głosów: {sumAnswerCount}</li>
        </List>
      </Column>
      <Column>
        <Header>
          <SubTopic>Wszystkie ankiety</SubTopic>
          <Topic>Lista pozostałych ankiet</Topic>
        </Header>
        <List>
          brak danych
        </List>
      </Column>
    </Container>
  )
}

export default PollData;
