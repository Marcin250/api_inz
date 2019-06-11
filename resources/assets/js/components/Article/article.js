import React from 'react';
import styled from 'styled-components';
import Author from './article_author'
import CommentFeatures from './article_comments_features'
import Content from './article_content';
import CommentSection from './article_comments';
import Related from './article_related';
import ArticleHeader from './article_header';
import ArticleShare from './article_share';
import { connect } from 'react-redux';

const ArticleWrapper = styled.article`
  display:flex;
  flex-flow:column wrap;
  background:white;
  flex: 3;
`;

const Section = styled.section`
  display:flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const Wrapper = styled.section`
  flex:6;
  background:white;
  @media (min-width: 480px) {
    padding-left:20px;
    footer {
      display:none;
    }
  }
  @media (min-width: 900px) {
    padding:0 20px;
    margin-top:0;
  }
`

const Article = props => {
  const {article, neighbours, user, url} = props;

  return (
    <ArticleWrapper>
      <Section>
        <Author article = {article} url={url} />
        <Wrapper>
          <ArticleHeader article = {article} />
          <Content article = {article} />
          <ArticleShare />
          <Related neighbours = {neighbours} />
        </Wrapper>
      </Section>
      <Section>
        <CommentSection articleID={article.idarticle} user={user} />
      </Section>
    </ArticleWrapper>
  )
}

function mapStateToPorps(state) {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToPorps)(Article);
