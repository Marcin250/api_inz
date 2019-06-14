import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.figure`
  overflow:hidden;
  height:250px;
  display:flex;
  background:#1e1e1e;
  justify-content:center;
  flex-flow:row wrap;
  @media (min-width: 480px) {
    max-height: 500px;
    height:auto;
    font-size:2.6em;
  }
`

const Image = styled.img`
  max-width:1300px;
  height:275px;
  @media (min-width: 480px) {
    width:100%;
    height:100%;
  }
`

const ArticleImage = props => {
  const { image, title } = props.article;
  return (
      <ImageWrapper>
        <Image src={image} title={title} alt={title}  />
      </ImageWrapper>
  )
}

export default ArticleImage;
