import React from 'react';
import styled from 'styled-components';
import Title from './admin_content_title';
import ArticleFilters from './article_filters';
import ArticleTable from './article_table';
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

const ArticleContent = props => {
  return (
    <Container>
      <Title>Twoje artykuły</Title>
      <Wrapper>
        <Button name='Dodaj artykuł'/>
      </Wrapper>
      <Wrapper>
        <ArticleFilters />
      </Wrapper>
      <Wrapper>
        <ArticleTable />
      </Wrapper>
    </Container>
  );
};

export default ArticleContent;