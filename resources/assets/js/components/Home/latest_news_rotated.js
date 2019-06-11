import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Article = styled.article`
  flex: 1 1 430px;
  height: 315px;
  color:#1e1e1e;
  margin:10px;
  overflow:hidden;
  @media (min-width: 480px) {
    height:400px;
  }
`

const ImageWrapper = styled.figure`
  flex:1;
  display:flex;
  height:inherit;
  max-height:150px;
  justify-content:center;
  overflow:hidden;
`

const Image = styled.img`
  height:inherit;
`

const LinkTo = styled(Link)`
  height:inherit;
  display:flex;
  justify-content:space-between;
  flex-flow:column nowrap;
`

const Container = styled.div`
  display:flex;
  flex:1;
  flex-flow: row wrap;
  align-content:space-between;
  padding:15px;
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

const Arrow = styled.span`
  font-size:1.5em;
  display:block;
  font-family: 'Bebas';
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

const LatestNewsRotated = props => {
  const {title, image, category, content, create_date, idarticle} = props.article,
        link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return (
    <Article>
      <LinkTo to={link}>
        <ImageWrapper>
          <Image src={image} alt={title}  title={title} />
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

export default LatestNewsRotated;
