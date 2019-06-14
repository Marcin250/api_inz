import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dateConverter from '../../helpers/dateConverter';
import { FaHeart, FaEnvelope } from "react-icons/fa";


const Header = styled.header`
  padding:15px 0;
  font-size:.85em;
  color:#888;
  svg {
    position:relative;
    top:1px;
    margin-right:4px;
  }
`

const Article = styled(Link)`
  cursor:pointer;
  color:inherit;
  display:block;
  line-height:initial;
  border-bottom:1px solid #ededed;
  &:last-child {
    border:none;
  }
  &:hover ${Header} svg {
    color:#00529f;
  }
`

const Highlight = styled.span`
  color:#00529f;
`

const Content = styled.p`
  margin-bottom:20px;
`

const UserActivityItem = props => {
  const { item, user } = props;

  return (
    <Article to='/app'>
    {
      item.idcomment
      ? <Header><FaEnvelope /> {dateConverter.toStageDate(item.create_date)} ― <Highlight>{user[0].name}</Highlight> napisał komentarz w <Highlight>{item.title}</Highlight></Header>
      : <Header><FaHeart /> {dateConverter.toStageDate(item.create_date)} ― <Highlight>{user[0].name}</Highlight> polubił artykuł <Highlight>{item.title}</Highlight></Header>
    }
    {
      item.idcomment
      ? <Content>{item.content}</Content>
      : ''
    }
    </Article>
  )
}

export default UserActivityItem;
