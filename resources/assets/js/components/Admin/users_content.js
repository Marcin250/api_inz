import React from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import Filters from './admin_filters';
import UsersTable from './users_table';

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

const UsersContent = props => {
  return (
    <Container>
      <Title>Użytkownicy</Title>
      <Wrapper>
        <Filters />
      </Wrapper>
      <Wrapper>
        <UsersTable />
      </Wrapper>
    </Container>
  );
};

export default UsersContent;
