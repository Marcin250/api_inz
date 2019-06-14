import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import createLink from '../../helpers/createLink';
import variableCSS from '../../css/variables';

const Article = styled.article`
  flex:1 1 160px;
  margin:0;
  max-width:100%;
  font-size:.9em;
  transition: all .2s ease-in-out;
  &:hover {
    transform:scale(1.03);
    h3 {
      color:${variableCSS.blue};
    }
  }
  @media only screen and (min-width: 360px) {
    margin:2.5px;
  }
  @media only screen and (min-width: 480px) {
    font-size:1em;
  }
  @media only screen and (min-width: 900px) {
    max-width:260px;
  }
`

const ImageWrapper = styled.figure`
  height:70px;
  display:flex;
  overflow:hidden;
`

const Image = styled.img`
   width:100%;
   align-self:center;
`

const Header = styled.header`
  position:relative;
  padding:8px 0;
`

const Category = styled.span`
  position:absolute;
  top:-15px;
  left:0;
  z-index:9;
  display:inline-block;
  font-size:.65em;
  text-transform:uppercase;
  padding:3px 6px;
  font-family:${variableCSS.categoryFont};
  background:${variableCSS.yellow};
  color:${variableCSS.yellowText};
  margin-bottom:2px;
`

const LinkTo = styled(Link)`
  color:inherit;
`

const Title = styled.h3`
  font-size:.95em;
  margin-top:3px;
  font-weight:lighter;
`

const RelatedListItem = props => {
  const { image, category, title, idarticle, comments_count, user } = props.article,
          link = createLink(props.article);

  return (
    <Article>
      <ImageWrapper>
        <Image src={image} title={title} alt={title} />
      </ImageWrapper>
      <Header>
        <LinkTo to={link}>
          <Category>{category}</Category>
          <Title>{title}</Title>
        </LinkTo>
      </Header>
    </Article>
  )
}

export default RelatedListItem;
