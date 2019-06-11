import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
  display:flex;
  height:inherit;
  justify-content:center;
  flex:1 1 380px;
  max-height:${props => props.small ? '100px' : '150px'};
  max-width:100%;
  overflow:hidden;
  @media (min-width: 640px) {
    max-height:100%;
    max-width:50%;
    height:inherit;
  }
`

const Article = styled.article`
  flex: 1 1 470px;
  height:${props => props.small ? '200px' : '315px'};
  color:#1e1e1e;
  margin:10px;
  overflow:hidden;
  @media (min-width: 480px) {
    height:400px;
  }
`

const Image = styled.img`
  height:inherit;
  align-self:flex-start;
`

const LinkTo = styled(Link)`
  height:inherit;
  display:flex;
  justify-content:space-between;
  flex-flow:column nowrap;
  @media (min-width: 640px) {
    flex-flow:row wrap;
  }
`

const Container = styled.div`
  display:flex;
  max-width:fit-content;
  flex:1 1 38%;
  flex-flow: row wrap;
  align-content:space-between;
  padding:15px;
  @media (min-width: 640px) {
    max-width:50%;
  }
`

const ArticleInfo = styled.header`
  letter-spacing:.5px;
  color:#1e1e1e;
  width:100%;
`

const Title = styled.h3`
  line-height:1;
  font-size:1.5em;
  font-family:'RSBold';
  @media only screen and (min-width: 640px) {
    font-size:1.8em;
  }
`

const Category = styled.span`
  display:block;
  margin-top:3px;
  font-size:.85em;
  font-family:'AvenirLTR'
`

const Description = styled.span`
  display:none;
  margin-top:12px;
  @media (min-width: 480px) {
    display:block;
  }
`

const ReadMore = styled.div`
  display:flex;
  color:#1e1e1e;
  align-self:flex-end;
  align-items:center;
  width:100%;
  flex-flow:row nowrap;
  justify-content:space-between;
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
        <Container>
          <ArticleInfo>
            <Title>{title}</Title>
            <Category>{category}</Category>
            <Description>{content}</Description>
          </ArticleInfo>
          <ReadMore>
            <p>czytaj więcej</p>
            <Arrow>&rarr;</Arrow>
          </ReadMore>
        </Container>
      </LinkTo>
    </Article>
  )
}

export default LatestNewsItem;
