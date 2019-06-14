import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PageHeader from '../../components/Reusable/PageHeader'
import Footer from '../../components/Reusable/footer';
import { Helmet } from 'react-helmet';

const Main = styled.main`
  max-width: 1300px;
  color:#1e1e1e;
  padding:0 15px;
  margin:40px auto;
`

const Info = styled.p`
  margin-top:16px;
`

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Twoje powiadomienia - portal-wertykalny.herokuapp.com</title>
        </Helmet>
        <Main>
          <PageHeader>Powiadomienia</PageHeader>
          <Info>tutaj pojawią się powiadomienia</Info>
        </Main>
        <Footer />
      </Fragment>
    )
  }
}

export default Notifications;
