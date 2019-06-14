import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import PageHeader from '../Reusable/PageHeader'
import NavItem from './nav_item';
import { FaUsers } from "react-icons/fa";

const Container = styled.section`
  width:100%;
  margin-bottom:15px;
`

const Wrapper = styled.div`
  display:flex;
  margin-top:10px;
  flex-flow:row wrap;
  justify-content:flex-start;
`

class Fixtures extends Component {
  render() {
    return (
      <Container>
        <PageHeader>Rozgrywki</PageHeader>
        <Wrapper>
          <NavItem name='Liga Hiszpańska' icon={ <FaUsers />} />
          <NavItem name='Liga Mistrzów' icon={ <FaUsers /> }  />
          <NavItem name='Klubowe Mistrzowstwa świata' icon={ <FaUsers /> } />
          <NavItem name='Superpuchar Hiszpanii' icon={ <FaUsers /> } />
          <NavItem name='Superpuchar Europy' icon={ <FaUsers /> }  />
        </Wrapper>
      </Container>
    )
  }
}

export default Fixtures;
