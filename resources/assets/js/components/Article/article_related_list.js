import React from 'react';
import RelatedListItem from './article_related_list_item';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  margin: 15px 2.5px;
`

const RelatedList = props => {
  const {neighbours} = props;

  return (
    <Wrapper>
      {neighbours.map((item, key) => {
        return <RelatedListItem article={item} key={key} />
      })}
    </Wrapper>
  )
}

export default RelatedList;
