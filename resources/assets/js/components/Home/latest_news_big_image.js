import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import variablesCSS from '../../css/variables';

const Article = styled.article`
  flex: 1 1 255px;
  position:relative;
  height:400px;
  color:#1e1e1e;
  margin:10px;
  overflow:hidden;
  &:before {
    padding:10px;
    position:absolute;
    content:'';
    background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 60%);
    bottom:0;
    left:0;
    width:100%;
    height:50%;
  }
`

const ImageWrapper = styled.figure`
  flex:1;
  display:flex;
  height:inherit;
  overflow:hidden;
  justify-content:center;
`

const Image = styled.img`
  height:inherit;
`

const LinkTo = styled(Link)`
  display:block;
  height:inherit;
`

const ArticleInfo = styled.header`
  letter-spacing:.5px;
  position:absolute;
  bottom:0;
  left:0;
  padding:15px;
  color:#fff;
`

const Title = styled.h3`
  font-size:1.5em;
  line-height:1;
  font-family:'RSBold';
  @media only screen and (min-width: 640px) {
    font-size:1.8em;
  }
`

const Category = styled.span`
  display:block;
  font-size:.85em;
  margin-top:3;
  font-family:'AvenirLTR';
`

const Arrow = styled.span`
  font-size:1.5em;
  display:block;
  font-family: 'Bebas';
`

const LatestNewsItem = props => {
  const {title, image, category, content, create_date, idarticle} = props.article,
        link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return (
    <Article>
      <LinkTo to={link}>
        <ImageWrapper>
          <Image src={image} alt={title} title={title} />
        </ImageWrapper>
        <ArticleInfo>
          <Title>{title}</Title>
          <Category>{category}</Category>
        </ArticleInfo>
      </LinkTo>
    </Article>
  )
}

export default LatestNewsItem;
