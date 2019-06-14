import React from 'react';
import styled from 'styled-components';
import TagsList from './tags_list';
import MiniLoader from '../Reusable/mini_loader';
import PageHeader from '../Reusable/PageHeader';

const Container = styled.section`
  width:100%;
  order:1;
  @media (min-width: 820px) {
    order:2;
    width:27%;
    padding-left:20px;
  }
`

const Information = styled.p`
  padding:10px 0;
`

const Tags = props => {
  const { articles, status } = props;

  return (
    <Container>
      <PageHeader>Tagi</PageHeader>
      {
        !status ?
        articles.length ?
        (
          <TagsList articles={ articles } />
        ) : (
            <Information>Brak wyników</Information>
        ) : (
          <MiniLoader margin={20} />
        )
      }
    </Container>
  )
}

export default Tags;
