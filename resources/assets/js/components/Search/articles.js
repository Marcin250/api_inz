import React, { Component } from 'react';
import styled from 'styled-components';
import PageHeader from '../Reusable/PageHeader';
import ArticlesList from './articles_list';
import MiniLoader from '../Reusable/mini_loader';

const Container = styled.section`
  width:100%;
  flex:1 1 580px;
  order:2;
  @media (min-width: 820px) {
    order:1;
    width:73%;
  }
`

const Information = styled.p`
  padding:10px 0;
`

class Articles extends Component {
  render() {
    const { articles, keyword, status } = this.props;

    return (
      <Container>
        <PageHeader>Wyniki wyszukiwania</PageHeader>
        {
          !status ?
          articles.length ?
          (
            <ArticlesList articles={ articles } keyword={ keyword } />
          ) : (
              <Information>Brak wyników</Information>
          ) : (
            <MiniLoader margin={20} />
          )
        }
      </Container>
    )
  }
}

export default Articles;
