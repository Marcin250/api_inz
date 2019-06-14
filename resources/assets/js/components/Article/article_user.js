import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.figure`
  justify-content:center;
  min-width:42px;
  min-height:42px;
  max-width:42px;
  max-height:42px;
  margin-right:10px;
  overflow:hidden;
  align-self:flex-start;
  border-radius:100%;
`

const Image = styled.img`
  height:42px;
`

const User = props => {
  const {image, name} = props.user;

  return (
    <ImageContainer>
      <Image src={image} title={`avatar uzytkownika ${name}`} alt={`avatar uzytkownika ${name}`} />
    </ImageContainer>
  )
}

export default User;
