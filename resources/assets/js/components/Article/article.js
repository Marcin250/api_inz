import React from 'react';
import styled from 'styled-components';
import Author from './article_author'
import CommentFeatures from './article_comments_features'
import Content from './article_content';
import CommentSection from './article_comments';
import Related from './article_related';
import ArticleHeader from './article_header';

const ArticleWrapper = styled.article`
  width:73%;
  display:flex;
  flex-flow:column wrap;
  background:white;
  flex: 3;
`

const Section = styled.section`
  display:flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const Wrapper = styled.section`
  flex:6;
  background:white;
  padding:0 25px;
`

const Article = props => {
  const {article, neighbours, comments} = props;
  return (
    <ArticleWrapper>
      <Section>
        <Author article = {article} />
        <Wrapper>
          <ArticleHeader article = {article} />
          <Content article = {article} />
          <Related neighbours = {neighbours} />
        </Wrapper>
      </Section>
      <Section>
        <CommentFeatures />
        <Wrapper>
          <CommentSection comments = {comments}/>
        </Wrapper>
      </Section>
    </ArticleWrapper>
  )
}

export default Article;
