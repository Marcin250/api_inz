import React from 'react';
import styled from 'styled-components';
import SingleComment from './article_comments_list_item';

const List = styled.ul`
  list-style-type: none;
  line-height:1.5;
  font-size:14px;
  @media only screen and (min-width: 480px) {
    font-size:1em;
  }
`

const Comments = props => {
  const {comments, user, articleID, error} = props;

  return (
    <List>
      {comments.map((item, key) => {
        return <SingleComment comment = {item} key={item.idcomment} user={user} articleID={articleID} error={error} />
      })}
    </List>
  )
}

export default Comments;
