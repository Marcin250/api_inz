import React, { Component } from 'react';
import styled from 'styled-components';
import MiniLoader from '../Reusable/mini_loader';
import PageHeader from '../Reusable/PageHeader'
import NavItem from './nav_item';
import { FaUsers, FaTable, FaChartBar } from "react-icons/fa";

const Container = styled.section`
  width:100%;
  margin-bottom:15px;
`

const Wrapper = styled.div`
  margin-top:10px;
  display:flex;
  flex-flow:row wrap;
  justify-content:flex-start;
`

class Club extends Component {
  render() {
    return (
      <Container>
        <PageHeader>Klub</PageHeader>
        <Wrapper>
          <NavItem name='Skład' icon={ <FaUsers />} />
          <NavItem name='Wyniki' icon={ <FaUsers /> }  />
          <NavItem name='Statystyki' icon={ <FaUsers /> } />
          <NavItem name='Tabela ligowa' icon={ <FaUsers /> } />
          <NavItem name='Stadion' icon={ <FaUsers /> }  />
        </Wrapper>
      </Container>
    )
  }
}

export default Club;
