import React from 'react';
import styled from 'styled-components';
import {
  MdDashboard,
  MdReceipt,
  MdPeople,
  MdComment,
  MdKeyboardArrowRight,
  MdPoll,
  MdPerson,
  MdHome,
  MdLiveTv
} from 'react-icons/md';

import { Link } from 'react-router-dom';
import variablesCSS from '../../css/variables';

const Nav = styled.nav`
  padding-top:5px;
  background:white;
  letter-spacing:.35px;
  max-width:200px;
  min-width:200px;
  height: calc(100% - 50px);
  box-shadow: 1px 1px 4px #e5e5e5;
`

const NavList = styled.ul`
  list-style-type: none;
  margin-top:15px;
`

const LinkTo = styled(Link)`
  color:inherit;
  display:block;
  &:hover {
    background:${variablesCSS.gray};
  }
`

const Item = styled.li`
  padding:10px;
  font-family: 'SSPB';
  font-size:.8em;
  display:flex;
  align-items:center;
  justify-content:space-between;
  text-transform: uppercase;
  &:last-child {
    font-size:1em;
    font-family: 'SSPL';
    text-transform: capitalize;
  }
  svg {
    position:relative;
    top:1px;
  }
`

const Text = styled.span`
  margin-left:10px;
`

const AlignMid = styled.div`
  display:flex;
  align-items: center;
`


const AdminNavigation = () => {
  return (
    <Nav>
      <NavList>
        <Item>Główne</Item>
        <LinkTo to="/admin/dashboard">
          <Item>
            <AlignMid>
              <MdDashboard />
              <Text>Dashboard</Text>
            </AlignMid>
          </Item>
        </LinkTo>
        <LinkTo to="/admin/articles">
          <Item>
            <AlignMid>
              <MdReceipt />
              <Text>Artykuły</Text>
            </AlignMid>
          </Item>
        </LinkTo>
        <LinkTo to="/admin/users">
          <Item>
            <AlignMid>
              <MdPeople />
              <Text>Użytkownicy</Text>
            </AlignMid>
          </Item>
        </LinkTo>
      </NavList>
      <NavList>
      <Item>Dodatkowe</Item>
      <LinkTo to="/admin/polls">
        <Item>
          <AlignMid>
            <MdPoll />
            <Text>Ankiety</Text>
          </AlignMid>
        </Item>
      </LinkTo>
      <LinkTo to="/admin/players">
        <Item>
          <AlignMid>
            <MdPerson />
            <Text>Piłkarze</Text>
          </AlignMid>
          <MdKeyboardArrowRight />
        </Item>
      </LinkTo>
      <LinkTo to="/admin/live">
        <Item>
          <AlignMid>
            <MdLiveTv />
            <Text>Centrum Meczowe</Text>
          </AlignMid>
        </Item>
      </LinkTo>
      </NavList>
      <NavList>
        <Item>Wróć do aplikacji</Item>
        <LinkTo to="/app">
          <Item>
            <AlignMid>
              <MdHome />
              <Text>Strona główna</Text>
            </AlignMid>
          </Item>
        </LinkTo>
      </NavList>
    </Nav>
  )
}

export default AdminNavigation;
