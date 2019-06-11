import React from 'react';
import styled from 'styled-components';
import createLink from '../../helpers/createLink';
import { Link } from 'react-router-dom';
import variablesCSS from '../../css/variables';

const ListItem = styled.li`
  display:flex;
  flex-flow:row nowrap;
  justify-content:flex-start;
  cursor:pointer;
  padding:12px 10px;
  transition: all .4s;
  &:not(:last-child) {
    border-bottom:1px solid ${variablesCSS.gray};
  }
  &:hover {
    background: ${variablesCSS.gray};
    time {
      color:${variablesCSS.blue};
    }
  }
`

const Title = styled.h3`
  font-size:1.05em;
  letter-spacing: .35px;
  align-self:flex-start;
  font-weight:lighter;
`

const Added = styled.time`
  font-size:.85em;
  color:#c8c8c8;
  transition: all .4s;
`

const LinkTo = styled(Link)`
  color:inherit;
  position:relative;
`

const AsideItem = props => {
  const { title, category, idarticle, create_date } = props.item,
          link = createLink(props.item);

  return (
    <ListItem>
      <article>
        <LinkTo to={link}>
          <Title>{title}</Title>
          <Added dateTime={new Date(create_date)}>{new Date(create_date).toLocaleString()}</Added>
        </LinkTo>
      </article>
    </ListItem>
  )
}

export default AsideItem;
