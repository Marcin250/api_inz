import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import variableCSS from '../../css/variables';

const ImageWrapper = styled.figure`
  display:none;
  overflow:hidden;
  border-radius:6px;
  height:inherit;
  justify-content:center;
  flex:1 1 380px;
  max-height:80px
  max-width:100px
  overflow:hidden;
  @media (min-width: 480px) {
    display:flex;
  }
`

const Article = styled.article`
  flex: 1 1 100%;
  height: auto;
  color:${variableCSS.black};
  padding:20px 0;
  overflow:hidden;
  &:not(:last-child) {
    border-bottom:1px solid ${variableCSS.gray};
  }
  @media (min-width: 480px) {
    margin:5px 0;
    padding:0;
    height: 80px;
    border:none;
    &:not(:last-child) {
      border: none;
    }
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
  flex-flow:row wrap;
`

const Container = styled.div`
  display:flex;
  max-width:fit-content;
  flex:1 1 38%;
  flex-flow: row wrap;
  align-content:space-between;
  padding:15px;
`

const ArticleInfo = styled.header`
  letter-spacing:.5px;
  flex:2;
  line-height:1;
  color:${variableCSS.black};
  width:100%;
  @media (min-width: 480px) {
    border-left:2px solid ${variableCSS.black};
    margin-left:5px;
    padding:5px 0 5px 8px;
  }
`

const Title = styled.h3`
  font-size:1.2em;
  line-height:1.2;
  font-weight:lighter;
`

const Category = styled.span`
  display:block;
  margin-top:5px;
  font-size:.8em;
  color:${variableCSS.black};
  font-family:'AvenirLTB'
`

const Description = styled.span`
  display:none;
  margin-top:12px;
  @media (min-width: 480px) {
    display:block;
  }
`

const Stats = styled.div`
  display:none;
  align-items:center;
  justify-content:space-between;
  flex-flow:row nowrap;
  flex:1.5;
  @media (min-width: 640px) {
    display:flex;
  }
`

const StatsInfo = styled.div`
  display:flex;
  color:#1e1e1e;
  margin:0 5px;
  flex-flow:column wrap;
  justify-content:flex-end;
`

const Type = styled.span`
  flex:1;
  font-size:.9em;
`

const Count = styled.span`
  flex:1;
  font-size:1.05em;
  color:#ee324e;
  text-align:center;
`

const ArticleList = props => {
  const {title, image, category, content, create_date, idarticle, comments_count, views, likes_count} = props.article,
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
        <Stats>
          <StatsInfo>
            <Type>Polubienia</Type>
            <Count>{ likes_count }</Count>
          </StatsInfo>
          <StatsInfo>
            <Type>Komentarze</Type>
            <Count>{ comments_count }</Count>
          </StatsInfo>
          <StatsInfo>
            <Type>Wyświetlenia</Type>
            <Count>{ views }</Count>
          </StatsInfo>
        </Stats>
      </LinkTo>
    </Article>
  )
}

export default ArticleList;
