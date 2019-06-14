import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Admin/admin_header';
import { Helmet } from 'react-helmet';
import Title from '../../../components/Admin/admin_pageTitle';
import Navigation from '../../../components/Admin/admin_navigation';
import PollContent from '../../../components/Admin/poll_content';

class AdminPanel extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Ankiety - Panel Administracyjny</title>
        </Helmet>
        <Title title='Ankiety' />
        <PollContent />
      </Fragment>
    )
  }
}

export default AdminPanel;
