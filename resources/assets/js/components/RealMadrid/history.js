import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import PageHeader from '../Reusable/PageHeader'
import NavItem from './nav_item';
import { FaUsers } from "react-icons/fa";

const Container = styled.section`
  width:100%;
`

const Wrapper = styled.div`
  margin-top:10px;
  display:flex;
  flex-flow:row wrap;
  justify-content:flex-start;
`

class History extends Component {
  render() {
    return (
      <Container>
        <PageHeader>Historia</PageHeader>
        <Wrapper>
          <NavItem name='Klub' icon={ <FaUsers />} />
          <NavItem name='Legendy' icon={ <FaUsers /> }  />
          <NavItem name='Prezesi' icon={ <FaUsers /> } />
          <NavItem name='Trofea' icon={ <FaUsers /> } />
          <NavItem name='Hymn' icon={ <FaUsers /> } />
          <NavItem name='Santiago Bernabeu' icon={ <FaUsers /> }  />
        </Wrapper>
      </Container>
    )
  }
}

export default History;
