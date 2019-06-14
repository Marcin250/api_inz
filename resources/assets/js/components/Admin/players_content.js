import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from './admin_content_title';
import Filters from './admin_filters';
import PlayerTable from './players_table';
import Button from '../Reusable/button';

const Container = styled.section`
  margin-left:1px;
  margin:20px;
  margin-top:5px;
  align-items:center;
  svg {
    color:#c6c6c6;
    font-size:1.25em;
    font-family: 'SSPL';
  }
`

const Wrapper = styled.section`
  background:#fff;
  padding:15px 20px;
  margin:1px 20px;
`

const PlayerContent = props => {
  return (
    <Container>
      <Title>Zawodnicy</Title>
      <Wrapper>
        <Link to='/admin/players/add'>
          <Button name='Dodaj zawodnika' blue />
        </Link>
      </Wrapper>
      <Wrapper>
        <Filters />
      </Wrapper>
      <Wrapper>
        <PlayerTable />
      </Wrapper>
    </Container>
  );
};

export default PlayerContent;
