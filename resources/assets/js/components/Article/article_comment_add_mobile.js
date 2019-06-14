import React, { Component } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundUp } from "react-icons/io";


const Container = styled.div`
  position:fixed;
  z-index:998;
  width:100%;
  bottom:51px;
  left:0;
  padding:8px;
  background:#f9f9f9;
  border-top:1px solid #ededed;
  border-bottom:1px solid #ededed;
  display:flex;
  align-items:center;
  @media only screen and (min-width: 640px) {
    display:none;
  }
  svg {
    color:#00529f;
    font-size:2.2em;
    flex:.1;
    min-width:40px;
  }
`

const AddButton = styled.button`
  border:1px solid #d8d8d8;
  outline:none;
  padding:10px;
  background:#fff;
  border-radius:6px;
  flex:1;
  text-align:left;
  color:#d8d8d8;
`


const AddCommentButtonMobile = props => {
  const { openCommentModal } = props;

  return (
    <Container onClick={openCommentModal}>
      <AddButton>Skrobnij coś..</AddButton>
      <IoIosArrowRoundUp />
    </Container>
  )
}

export default AddCommentButtonMobile;
