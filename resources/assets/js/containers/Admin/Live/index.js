import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import { Helmet } from 'react-helmet';
import Title from '../../../components/Admin/admin_pageTitle';
import Navigation from '../../../components/Admin/admin_navigation';

class AdminLive extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Centrum meczowe - Panel Administracyjny</title>
        </Helmet>
        <Title title='Centrum meczowe' />
      </Fragment>
    )
  }
}

export default AdminLive;
