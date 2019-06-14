import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import { Helmet } from 'react-helmet';
import Title from '../../../components/Admin/admin_pageTitle';
import Navigation from '../../../components/Admin/admin_navigation';
import PlayerContent from '../../../components/Admin/players_content';

class AdminPlayers extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Zawodnicy - Panel Administracyjny</title>
        </Helmet>
        <Title title='Zawodnicy' />
        <PlayerContent />
      </Fragment>
    )
  }
}

export default AdminPlayers;
