import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import AsideList from './article_aside_list';
import Button from '../Reusable/button';
import SectionHeader from '../Reusable/section_header';

const Wrapper = styled.aside`
  width:27%;
  margin-bottom:50px;
  @media only screen and (max-width: 900px) {
    display:none;
  }
`;

const Centered = styled.div`
  display:flex;
  width:100%;
`;

const Aside = props => (
  <Wrapper>
    <SectionHeader margin='0 0 0 8px'>Ostatnio dodane</SectionHeader>
    <AsideList latest={props.latest} />
    <Centered>
      <Button
        name="Pokaż więcej"
        fullWidth
        blue
        onClick={ () => { props.history.push('/app/news')} }
      />
    </Centered>
  </Wrapper>
);

export default withRouter(Aside);
