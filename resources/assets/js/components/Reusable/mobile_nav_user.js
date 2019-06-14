import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaInfoCircle, FaLongArrowAltLeft, FaRegNewspaper, FaHome, FaShieldAlt, FaRegCalendarAlt, FaRegPlayCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';
import { FiLogOut } from "react-icons/fi";
import { FiMessageSquare } from 'react-icons/fi';
import { MdContactMail, MdDashboard } from "react-icons/md";

const SubMobileNav = styled.nav`
  border-top:2px solid #ededed;
  position:fixed;
  z-index:9999;
  bottom:0;
  left:0;
  width:100%
  background:#fff;
  right:-42px;
  transition: all .5s;
  transition-timing-function: cubic-bezier(1,.11,.5,.85);
  @media (min-width: 640px) {
    display:none;
  }
`

const NavList = styled.ul`
  border-left:1px solid #ededed;
  height:inherit;
  display:flex;
  flex-flow: row wrap;
  list-style-type: none;
  justify-content:space-around;
  background:#f9f9f9;
`

const NavLink = styled(Link)`
  padding-top:12px;
  padding-bottom:8px;
  color:#00529f;
  svg {
    margin:0 8px;
    font-size:1.5em;
  }
`
const ApiRouteLink = styled.a`
  padding-top:12px;
  padding-bottom:8px;
  color:#00529f;
  svg {
    margin:0 8px;
    font-size:1.5em;
  }
`

const UserMobileNav = props => {
  const { user } = props;

  return (
    !user.length
    ? ''
    : (
      <SubMobileNav>
        <NavList>
          <li>
            <NavLink to={`/app/user/${user[0].iduser}`} title='Mój profil'>
              <FaUserCircle />
            </NavLink>
          </li>
          <li>
            <NavLink to='/app/user/messages' title='Moje wiadomości'>
              <FiMessageSquare />
            </NavLink>
          </li>
          <li>
            <NavLink to='/app/user/notifications' title='Moje powiadomienia'>
              <FaInfoCircle />
            </NavLink>
          </li>
          {
            user[0].tier > 1 ?
            (
              <li>
                <NavLink to='/admin/dashboard' title='Panel administracyjny'>
                  <MdDashboard />
                </NavLink>
              </li>
            ) : (
              ''
            )
          }
          <li>
            <ApiRouteLink href='/api/auth/google/logout' title='Wyloguj się'>
              <FiLogOut />
            </ApiRouteLink>
          </li>
        </NavList>
      </SubMobileNav>
    )
  )
}

export default UserMobileNav;
