import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dateConverter from '../../helpers/dateConverter';
import Share from './article_share';
import variableCSS from '../../css/variables';

const Wrapper = styled.section`
  flex:1;
  margin-top:7px;
  margin-bottom:30px;
  @media only screen and (max-width: 479px) {
    display:none;
  }
`

const Sticky = styled.div`
   position: sticky;
   top:42%;
   text-align: right;
   line-height:1.5;
`

const PublishedBy = styled.span`
  display:block;
  margin-top:10px;
`

const LinkTo = styled(Link)`
  line-height:1.1;
  display:inline-block;
  font-size:.8em;
  padding:6px 10px;
  font-family: ${variableCSS.categoryFont};
  background:${variableCSS.yellow};
  color:${variableCSS.yellowText};
`

const LinkToUser = styled(Link)`
  color:${variableCSS.blue};
  display:inline;
  text-transform: lowercase;
`

const Author = props => {
  const { category, user, create_date } = props.article;

  return (
    <Wrapper>
      <Sticky>
        <LinkTo to={`/app/news/${category}`} title={`Pokaż artykuły z kategorii: ${category}`}>{category}</LinkTo>
        <PublishedBy>dodane przez <LinkToUser to={`/app/user/${user.iduser}`} title={`Profil użytkownika ${user.name}`}>{user.name}</LinkToUser>,<br/>{dateConverter.toStageDate(create_date)}</PublishedBy>
        <Share url={props.url} />
      </Sticky>
    </Wrapper>
  )
}

export default Author;
