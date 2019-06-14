import React from 'react';
import styled from 'styled-components';
import ArticleItem from './article_aside_list_item';

const List = styled.ul`
  line-height:1.4;
  list-style-type:none;
  margin-top:10px;
  margin-bottom:20px;
`

const AsideList = props => {
  return (
    <List>
      { props.latest.map((item, key) => {
        return <ArticleItem item={item} key={key} />
      })}
    </List>
  )
}

export default AsideList;
