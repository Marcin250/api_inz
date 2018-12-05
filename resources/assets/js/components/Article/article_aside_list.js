import React from 'react';
import styled from 'styled-components';
import ArticleItem from './article_aside_list_item';

const List = styled.ul`
  font-size: 1.1em;
  line-height:1.5;
  list-style-type:none;
  margin-top:10px;
  margin-bottom:20px;
`

const AsideList = props => <List>
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
  <ArticleItem />
</List>

export default AsideList;
